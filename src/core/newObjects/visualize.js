import store from '@/store'
import {
  newDescribeObject, newDescribeQuickObject, newFilterObject, newSortObject,
  newVisObject, newVisTemplateObject, newVisPivotObject, newDashboardObject,
  genProjectObjectID, getOrDefault, getPosition, defaultNames,

} from "@/core/newObjects/common";


export function newDataVisualizationNode({pageID, sourceNodeID, name=''}) {

  let filterObject = newFilterObject()
  let sortObject = newSortObject()
  let describeObject = newDescribeObject()
  let describeQuickObject = newDescribeQuickObject()
  let visObject = newVisObject()
  let visTemplate = newVisTemplateObject()
  let visPivot = newVisPivotObject()

  // store.dispatch("proj/object_manager/updateDataObject", { Object: filterObject, ObjectID: filterObject.id }, { root: true });
  // store.dispatch("proj/object_manager/updateDataObject", { Object: sortObject, ObjectID: sortObject.id }, { root: true });
  // store.dispatch("proj/object_manager/updateDataObject", { Object: describeObject, ObjectID: describeObject.id }, { root: true });
  // store.dispatch("proj/object_manager/updateDataObject", { Object: describeQuickObject, ObjectID: describeQuickObject.id }, { root: true });
  // store.dispatch("proj/object_manager/updateDataObject", { Object: visObject, ObjectID: visObject.id }, { root: true });
  // store.dispatch("proj/object_manager/updateDataObject", { Object: visTemplate, ObjectID: visTemplate.id }, { root: true });
  // store.dispatch("proj/object_manager/updateDataObject", { Object: visPivot, ObjectID: visPivot.id }, { root: true });

  store.dispatch(
      'proj/object_manager/newDataObjectsBulk',
      { Objects: [
          filterObject, sortObject, describeObject, describeQuickObject, visObject, visTemplate, visPivot
        ]
      },
      { root: true }
  )

  let nodeID = genProjectObjectID();
  store.dispatch('proj/object_manager/newNode', {
    typeCD: 303,
    nodeID: nodeID,
    position: getPosition(store.getters['proj/nodeLists'][pageID]),
    name: getOrDefault(name, defaultNames['300']),
    pageID: pageID,
    sourceNodeID: sourceNodeID,
    dataObjectTags: {
      "output_table_filter": filterObject.id,
      "output_table_sort": sortObject.id,
      "column_stats": describeObject.id,
      "output_table_quick_info": describeQuickObject.id,
      'data_visualization': visObject.id,
      'visualization_pivot': visPivot.id,
      'chart_template': visTemplate.id
    }
  })

  return {
    'nodeID': nodeID,
    'dataObjects': {
      'data_visualization': visObject.id,
      'visualization_pivot': visPivot.id,
      'chart_template': visTemplate.id
    }
  }
}


export function newDataVisalizationPage({processID, name=''}) {

  let dashboardObject = newDashboardObject()
  store.dispatch("proj/object_manager/updateDataObject", { Object: dashboardObject, ObjectID: dashboardObject.id }, { root: true });

  let pageID = genProjectObjectID();
  store.dispatch('proj/object_manager/newPage', {
    pageID: pageID,
    position: getPosition(store.getters['proj/pageLists'][processID]),
    typeCD: 203,
    name: getOrDefault(name, defaultNames['203']),
    processID: processID,
    dataObjectTags: {
      "dashboard": dashboardObject.id
    }
  })
}


export function newDataVisualizationProcess({name=''}) {
  let processID = genProjectObjectID();
  store.dispatch('proj/object_manager/newProcess', {
    processID: processID,
    position: store.getters['proj/processList'].length,
    typeCD: 103,
    name: getOrDefault(name, defaultNames['103']),
    dataObjectTags: {}
  })

  let childName = defaultNames['203'];
  let page = newDataVisalizationPage({processID: processID, name: childName})
  return {
    ...page,
    ...{'processID': processID}
  }
}