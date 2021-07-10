export function genDataObjectID() {
  return 'do-'+(Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
}

export function genProjectObjectID() {
  return 'po-'+(Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
}

export function getPosition(list) {
  return typeof list !== 'undefined' ? list.length + 1 : 1
}

export function getOrDefault(providedValue, defaultValue) {
  if (providedValue===null) {
    return defaultValue
  }
  else if (typeof providedValue==='undefined') {
    return defaultValue
  }
  else if (providedValue==='') {
    return defaultValue
  }
  return providedValue;
}

export const defaultNames = {
  100: 'Load Data',
  101: 'Prepare Data',
  102: 'Export',
  103: 'Visualize',
  200: 'New Connector',
  201: 'Prepare',
  202: 'Export',
  203: 'Dashboard',
  300: 'Query',
  301: 'Action',
  302: 'Export',
  303: 'Chart',
  400: 'Load Element',
  401: 'Action Element',
  402: 'Chart Element'
};

export function newFilterObject() {
  return {
    'id': genDataObjectID(),
    "category": 2,
    "group": 2000,
    "type": 200004,
    "tag": "output_table_filter",
    "parameters": {
      "page_size": 10,
      "page_index": 1
    }
  }
}

export function newSortObject() {
  return {
    "id": genDataObjectID(),
    "category": 2,
    "group": 2005,
    "type": 200500,
    "tag": "output_table_sort",
    "parameters": {
      "columns": {}
    }
  }
}

export function newDescribeObject() {
  return {
    "id": genDataObjectID(),
    "category": 2,
    "group": 2100,
    "type": 210000,
    "tag": "column_stats",
    "parameters": {}
  }
}

export function newDescribeQuickObject() {
  return {
    "id": genDataObjectID(),
    "category": 2,
    "group": 2100,
    "type": 210002,
    "tag": "output_table_quick_info",
    "parameters": {}
  }
}

export function newConnectorObject(connectorType) {
  return {
    'id': genDataObjectID(),
    "category": 1,
    "group": parseInt(connectorType.toString().slice(0,4)),
    "type": connectorType,
    "tag": "connector",
    "parameters": {}
  }
}

export function newDashboardObject(connectorType) {
  return {
    'id': genDataObjectID(),
    "category": 3,
    "group": 3200,
    "type": 320000,
    "tag": "dashboard",
    "parameters": {
      "edit":true,
      "vertical_align":true,
      "width":800,
      "height":800
    }
  }
}


export function newVisObject() {
  return {
    'id': genDataObjectID(),
    "category": 3,
    "group": 3100,
    "type": 310000,
    "tag": "data_visualization",
    "parameters": {}
  }
}

export function newVisPivotObject() {
  return {
    'id': genDataObjectID(),
    "category": 2,
    "group": 2006,
    "type": 200601,
    "tag": "visualization_pivot",
    "parameters": {}
  }
}


export function newVisTemplateObject() {
  return {
    'id': genDataObjectID(),
    "category": 3,
    "group": 3000,
    "type": 300000,
    "tag": "chart_template",
    "parameters": {
      "template":{
        "chart_types":{
          "line":{
            "chart_type":"line"
          }
        },
        "x_axis":{
          "type":"category"
        },
        "y_axis":{
          "type":"value"
        }
      }
    }
  }
}