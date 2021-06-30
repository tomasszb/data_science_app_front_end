import store from '../store/index'
import {mapGetters, mapState} from "vuex";
import Vue from "vue";
const R = require('ramda');



function comparePosition( a, b ) {
  if ( a.relative_position < b.relative_position ){
    return -1;
  }
  if ( a.relative_position > b.relative_position ){
    return 1;
  }
  return 0;
}


export function getEmptyDataObject(type) {
  let object = {
    'id': "_" + (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase(),
    'type': type,
    'group': Number(type.toString().slice(0,-2)),
    'name': 'noname',
    'owner_id': 1,
    'parameters': {}
  };
  return object
}

export function getResultObjectID(tags) {
  return tags.join('_');
}


export function getProjectBranch(projectObjects, parentIDs, parentName, groupID) {
  let objectList = null;

  if (parentIDs == null) {
    objectList = []
  } else {
    objectList = {};
    for(let parentID of parentIDs) {
      objectList[parentID] = []
    }

  }
  let sorted_objects = Object.values(projectObjects).sort(comparePosition);
  for (let po of sorted_objects) {
    let id = po.id.toString();
    if (projectObjects.hasOwnProperty(id)) {
      if (projectObjects[id]['group'] === groupID) {
        if (parentIDs == null) {
          objectList.push(id);
        } else {
          let child = JSON.parse(JSON.stringify(projectObjects[id]));
          if (parentName in child['parameters']) {
            let parent_id = child['parameters'][parentName].toString();
            if (parentIDs.includes(parent_id)) {
              objectList[parent_id].push(id);
            }
          }
        }
      }
    }
  }
  return objectList
}

export function get_active_object(activeNew, activeOld, allList) {
  if(allList.length === 0) {
    return null
  }
  else if(allList.includes(activeNew)) {
    return activeNew;
  }
  else if(activeOld ==null && allList.length>0) {
    return allList[0];
  }
  else if(!allList.includes(activeOld) && allList.length>0) {
    return allList[0];
  }
  else {
    return activeOld
  }
}


export function getUpstreamNodes(nodeID, upstreamNodes) {
  let objects = store.getters['proj/projectObjects'];
  let node = objects[nodeID];
  let srcNodeID = node.getPath('parameters.source_data_node', null);
  let secNodeIDs = node.getPath('parameters.secondary_data_nodes', []);
  let parentPageID = node.getPath('parameters.page_id', null);
  if (srcNodeID !== null) {
    let upstreamNodeID = srcNodeID.toString();
    upstreamNodes.push(upstreamNodeID);
    getUpstreamNodes(upstreamNodeID, upstreamNodes);
  }
  // else {
  //   let nodes = R.clone(store.getters['proj/nodeLists'][parentPageID]);
  //   let sortedNodes = nodes.sort((a, b) => (objects[a].relative_position < objects[b].relative_position ? 1 : -1));
  //   let pageUpstreamNodes = sortedNodes.filter((a)=>{if(objects[a].relative_position<node.relative_position){return a}});
  //   if (pageUpstreamNodes.length>0) {
  //     let upstreamNodeID = objects[pageUpstreamNodes[0].id].toString();
  //     upstreamNodes.push(upstreamNodeID);
  //     getUpstreamNodes(upstreamNodeID, upstreamNodes);
  //   }
  // }
  if (secNodeIDs) {
    for (let secNodeID of secNodeIDs) {
      let upstreamNodeID = secNodeID.toString();
      upstreamNodes.push(upstreamNodeID);
      getUpstreamNodes(upstreamNodeID, upstreamNodes);
    }
  }
  return upstreamNodes
}

export function calculateNodeSignature(parentNodeID, considerPage=true) {
  let projectObjects = store.getters['proj/projectObjects'];
  let dataObjects = store.getters['proj/dataObjects'];
  let nodeDataObjectTags = {};
  let nodeDataObjects = {};
  let nodeIDs = getUpstreamNodes(parentNodeID, []).reverse().concat([parentNodeID]);
  for (const nodeID of nodeIDs) {
    let node = projectObjects[nodeID];
    let tags = node['data_object_tags'];
    if (considerPage) {
      let page = projectObjects[node.parameters['page_id']];
      tags = {...page['data_object_tags'], ...tags};
    }

    nodeDataObjects[nodeID] = [];
    for (const [tagName, tagID] of Object.entries(tags)) {
      if (tagName!=="output_table_sort" && tagName!=="output_table_filter") {
        if (tagID!==null) {
          nodeDataObjects[nodeID].push(dataObjects[tagID.toString()])
        }
      }
    }

    if (node.id === parentNodeID) {
      if (tags.hasOwnProperty('output_table_sort') && tags.hasOwnProperty('output_table_filter')) {
        nodeDataObjects[nodeID].push(dataObjects[tags['output_table_sort'].toString()]);
        nodeDataObjects[nodeID].push(dataObjects[tags['output_table_filter'].toString()]);
      }
    }
  }
  // console.log('calculateNodeSignature end', JSON.stringify({'nodes': nodeIDs, 'data_objects': nodeDataObjects}).hashCode())
  return JSON.stringify({'nodes': nodeIDs, 'data_objects': nodeDataObjects}).hashCode();

}

export function createProjectFlowRequest(execution_commands, parameters, projectID) {
  let src_request_id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();

  return {
    "action": "project - run_flow",
    "request": {
      "src_request_id": src_request_id,
      "project_id": projectID,
      "commands": execution_commands,
      "parameters": parameters
    }
  }
}


export function createDataFlowRequest(parentNodeID, execution_commands=null) {
  let projectObjects = store.getters['proj/projectObjects'];
  let project = store.state.proj.project;
  let dataObjects = store.getters['proj/dataObjects'];
  let nodeSignatures = store.getters['proj/nodeSignatures'];

  let src_request_id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
  let request = {"action": "data - run_flow"};
  let nodeIDs = [];
  let nodes = [];
  let connDataObjectIDs = [];
  let connDataObjects = [];
  let nodeCommands = {};
  let inheritedDataObjectTags = {};
  let projectID = project.id;
  let allUpstreamNodeIDs = getUpstreamNodes(parentNodeID,[]);

  for (let nodeID of allUpstreamNodeIDs.reverse().concat([parentNodeID])) {
    if (!nodeIDs.includes(nodeID)) {
      nodeIDs.push(nodeID);
      let pageID = projectObjects[nodeID]['parameters']['page_id'];
      let pageDataObjectTags = projectObjects[pageID]['data_object_tags'];
      inheritedDataObjectTags[nodeID] = pageDataObjectTags;

      let nodeDataObjectTags = projectObjects[nodeID]['data_object_tags'];
      let allDataObjectTags =  Object.values(pageDataObjectTags).concat(Object.values(nodeDataObjectTags));
      for (let dataObjectID of allDataObjectTags) {
        if (!connDataObjectIDs.includes(dataObjectID)) {
          connDataObjectIDs.push(dataObjectID)
        }
      }

      switch(projectObjects[nodeID].type) {
        case 300:
          nodeCommands[nodeID] = ['run_connector'];
          break;
        case 301:
          nodeCommands[nodeID] = ['run_data'];
          break;
        case 302:
          nodeCommands[nodeID] = ['run_data'];
          break;
      }
    }
  }

  if (execution_commands) {
    nodeCommands[parentNodeID] = execution_commands;
  }
  // console.log(nodeIDs.includes('3'), nodeIDs.includes(3));
  let filtNodeSignatures = Object.keys(nodeSignatures)
      .filter(key => nodeIDs.includes(key))
      .reduce((obj, key) => {
        obj[key] = nodeSignatures[key];
        return obj;
      }, {});

  for (let id of connDataObjectIDs) connDataObjects.push(dataObjects[id]);
  for (let id of nodeIDs) nodes.push(projectObjects[id]);

  request['request']={};
  request['request']['src_request_id'] = src_request_id;
  request['request']["project_id"] = projectID;
  request['request']["inherited_data_object_tags"] = inheritedDataObjectTags;
  request['request']["nodes"] = nodes;
  request['request']['node_signatures'] = filtNodeSignatures;
  request['request']["node_commands"] = nodeCommands;
  request['request']['data_objects'] = connDataObjects;
  // console.log(request)
  return request
}

export function concatValues(dict) {
  return [].concat.apply([], Object.values(dict));
}


export function initProcessBranches(projectObjects, activeProcess) {
  let processList = getProjectBranch(projectObjects, null, null, 1);

  let processIDs = [activeProcess];
  let pageList = getProjectBranch(projectObjects, processIDs, 'process_id', 2);

  let pageIDs = [].concat.apply([], Object.values(pageList));
  let nodeList = getProjectBranch(projectObjects, pageIDs, 'page_id', 3);

  let nodeIDs = [].concat.apply([], Object.values(nodeList));
  let elementList = getProjectBranch(projectObjects, nodeIDs, 'node_id', 4);

  return [processList, pageList, nodeList, elementList]
}


export function initProjectBranches(projectObjects) {
  let processList = getProjectBranch(projectObjects, null, null, 1);

  let processIDs = [].concat.apply([], Object.values(processList));
  let pageList = getProjectBranch(projectObjects, processIDs, 'process_id', 2);

  let pageIDs = [].concat.apply([], Object.values(pageList));
  let nodeList = getProjectBranch(projectObjects, pageIDs, 'page_id', 3);

  let nodeIDs = [].conrcat.apply([], Object.values(nodeList));
  let elementList = getProjectBranch(projectObjects, nodeIDs, 'node_id', 4);

  return [processList, pageList, nodeList, elementList]
}


export function getObjectByRoute(route, parentObject, createIfNotExist= true) {
  let output = R.clone(parentObject);
  for (let i = 0; i < route.length; i++) {
    if (output.hasOwnProperty(route[i])) {
      output = output[route[i]]
    }
    else if (createIfNotExist) {

    }
    else {
      return null
    }
  }
  return output
}
