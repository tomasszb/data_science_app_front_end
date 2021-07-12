import store from '@/store'
import {
  newDescribeObject, newDescribeQuickObject, newFilterObject, newSortObject,
  newPrepObject,
  genProjectObjectID, getOrDefault, getPosition, defaultNames,

} from "@/core/newObjects/common";


export function newDataPreparationNode({pageID, sourceNodeID, prepType, name=''}) {

  let filterObject = newFilterObject()
  let sortObject = newSortObject()
  let describeObject = newDescribeObject()
  let describeQuickObject = newDescribeQuickObject()
  let action = newPrepObject(prepType)

  store.dispatch(
      'proj/object_manager/newDataObjectsBulk',
      { Objects: [
          filterObject, sortObject, describeObject, describeQuickObject, newPrepObject
        ]
      },
      { root: true }
  )

  let nodeID = genProjectObjectID();
  store.dispatch('proj/object_manager/newNode', {
    typeCD: 301,
    nodeID: nodeID,
    position: getPosition(store.getters['proj/nodeLists'][pageID]),
    name: getOrDefault(name, defaultNames['301']),
    pageID: pageID,
    sourceNodeID: sourceNodeID,
    dataObjectTags: {
      "output_table_filter": filterObject.id,
      "output_table_sort": sortObject.id,
      "column_stats": describeObject.id,
      "output_table_quick_info": describeQuickObject.id,
      'action': action.id
    }
  })

  return {
    'nodeID': nodeID,
    'dataObjects': {
      'action': action.id
    }
  }
}


export function newDataPreparationPage({processID, name=''}) {

  let pageID = genProjectObjectID();
  store.dispatch('proj/object_manager/newPage', {
    pageID: pageID,
    position: getPosition(store.getters['proj/pageLists'][processID]),
    typeCD: 201,
    name: getOrDefault(name, defaultNames['201']),
    processID: processID,
    dataObjectTags: {}
  })
}


export function newDataPreparationProcess({name=''}) {
  let processID = genProjectObjectID();
  store.dispatch('proj/object_manager/newProcess', {
    processID: processID,
    position: store.getters['proj/processList'].length,
    typeCD: 101,
    name: getOrDefault(name, defaultNames['101']),
    dataObjectTags: {}
  })

  let childName = defaultNames['201'];
  let page = newDataPreparationPage({processID: processID, name: childName})
  return {
    ...page,
    ...{'processID': processID}
  }
}