import store from '../store/index'
import {mapGetters, mapState} from "vuex";


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
  else {
    return activeOld
  }
}


export function createFlowRequest(elementCommands, parentElements, localElements) {
  let elementLists = store.getters['proj/elementLists'];
  let projectObjects = store.getters['proj/projectObjects'];
  let dataObjects = store.getters['proj/dataObjects'];

  let src_request_id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
  let request = {"action": "run_flow"};
  let elements = [];
  let project_data_objects = [];
  let filteredElementIDs = getUpstreamElements(projectObjects, elementLists, [], parentElements);
  let projectID = localStorage.getItem('project_id');

  for (const [parent_node_id, element_ids] of Object.entries(elementLists)) {
    for (let index in element_ids) {
      let element_id = element_ids[index];
      let element = projectObjects[element_id];
      if((filteredElementIDs.includes(element_id) && element['local_execution'] === false) || localElements.includes(parseInt(element_id))) {
        let parent_node = projectObjects[parent_node_id];
        element['source_data_node_id'] = parent_node['parameters']['source_data_node_id'];
        element['command']  = element_id in elementCommands ? elementCommands[element_id] : "run";
        elements.push(element)
      }

    }
  }
  for (const [id, project_data_object] of Object.entries(dataObjects)) {
    project_data_objects.push(project_data_object);
  }

  request['request']={};
  request['request']['src_request_id'] = src_request_id;
  request['request']["project_id"] = projectID;
  // request['request']["owner_id"] = ownerID;
  request['request']['project_data_objects'] = project_data_objects;
  request['request']['elements'] = elements;

  console.log(request);

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

  let nodeIDs = [].concat.apply([], Object.values(nodeList));
  let elementList = getProjectBranch(projectObjects, nodeIDs, 'node_id', 4);

  return [processList, pageList, nodeList, elementList]
}

export function getUpstreamElements(projectObjects, elementList, elements, parentElements) {
  let new_elements = [];
  for( let elementID of parentElements ) {
    let element = projectObjects[elementID];
    let node_id = element.parameters.node_id;
    let sec_data_node_id = element.parameters.sec_data_node_id;
    let source_data_node_id = element.parameters.source_data_node_id;

    new_elements = new_elements.concat(elementList[node_id]);
    new_elements = new_elements.concat(elementList[sec_data_node_id]);
    new_elements = new_elements.concat(elementList[source_data_node_id]);

    new_elements = new_elements.filter(function (e) {
      return e != null & !elements.includes(e);
    });
  }
  elements = elements.concat(new_elements);
  if (new_elements.length > 0) {
    return getUpstreamElements(projectObjects, elementList, elements, new_elements)
  } else {
    return elements
  }

}
