import store from '@/store'
import {
    newDescribeObject, newDescribeQuickObject, newFilterObject, newSortObject,
    newConnectorObject,
    genProjectObjectID, getOrDefault, getPosition, defaultNames
  } from "@/core/newObjects/common";


export function newDataLoadNode({pageID, name=''}) {

  let filterObject = newFilterObject()
  let sortObject = newSortObject()
  let describeObject = newDescribeObject()
  let describeQuickObject = newDescribeQuickObject()
  store.commit("proj/UPDATE_DATA_OBJECT", { Object: filterObject, ObjectID: filterObject.id }, { root: true });
  store.commit("proj/UPDATE_DATA_OBJECT", { Object: sortObject, ObjectID: sortObject.id }, { root: true });
  store.commit("proj/UPDATE_DATA_OBJECT", { Object: describeObject, ObjectID: describeObject.id }, { root: true });
  store.commit("proj/UPDATE_DATA_OBJECT", { Object: describeQuickObject, ObjectID: describeQuickObject.id }, { root: true });

  let nodeID = genProjectObjectID();
  store.dispatch('proj/object_manager/newNode', {
    typeCD: 300,
    nodeID: nodeID,
    position: getPosition(store.getters['proj/nodeLists'][pageID]),
    name: getOrDefault(name, defaultNames['300']),
    pageID: pageID,
    dataObjectTags: {
      "output_table_filter": filterObject.id,
      "output_table_sort": sortObject.id,
      "column_stats": describeObject.id,
      "output_table_quick_info": describeQuickObject.id
    }
  })
  return {'nodeID': nodeID}
}


export function newDataLoadPage({processID, connectorType, name=''}) {

  let connectorObject = newConnectorObject(connectorType)
  store.commit("proj/UPDATE_DATA_OBJECT", { Object: connectorObject, ObjectID: connectorObject.id }, { root: true });

  let pageID = genProjectObjectID();
  store.dispatch('proj/object_manager/newPage', {
    pageID: pageID,
    position: getPosition(store.getters['proj/pageLists'][processID]),
    typeCD: 200,
    name: getOrDefault(name, defaultNames['200']),
    processID: processID,
    dataObjectTags: {
      "connector": connectorObject.id
    }
  })

  let childName = defaultNames[300];
  let node = newDataLoadNode({pageID: pageID, name: childName})
  return {
    ...node,
    ...{'padeID': pageID}
  }
}