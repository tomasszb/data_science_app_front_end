
export default {
  projectObjectSettings: {
    [100]: {'sideIcon': 'flaticon-database-1', 'link': 'proc'},
    [101]: {'sideIcon': 'flaticon-server-1', 'link': 'proc'},
    [102]: {'sideIcon': 'flaticon-upload', 'link': 'proc'},
    [103]: {'sideIcon': 'flaticon-database-1', 'link': 'proc'},
  },
  // ################################  PROJECT OBJECTS  ################################

  // Project Object Groups
  PROBJ_PROCESS_CD : 1,
  PROBJ_PAGE_CD : 2,
  PROBJ_NODE_CD : 3,
  PROBJ_ELEMENT_CD : 4,

  // Processes
  LOAD_PROCESS_CD : 100,
  DATA_PREPARATION_PROCESS_CD : 101,
  EXPORT_PROCESS_CD : 102,
  DATA_VIS_PROCESS_CD : 103,

  // Pages
  STEP_PAGE_CD : 200,
  SHEET_PAGE_CD : 201,

  // Nodes
  DATA_LOAD_NODE_CD : 300,
  DATA_PREPARATION_NODE_CD : 301,
  DATA_EXPORT_NODE_CD : 302,
  DATA_VIS_NODE_CD : 303,

  // Elements
  DATA_LOAD_ELEMENT_CD : 400,
  DATA_ACTION_ELEMENT_CD : 401,
  DATA_CHART_ELEMENT_CD : 402,
  DATA_OUTPUT_ELEMENT_CD : 403,

  // ################################  DATA OBJECTS  ################################

  // Data Object Groups
  OBJ_DATA_CONNECTOR_CD : 1,
  OBJ_ACTION_CD : 2,
  OBJ_FUNCTION_CD : 3,
  OBJ_OUTPUT_CD : 4,


  // Data Object Types

  // Connectors
  SQL_CONNECTOR_CD : 100,
  FILE_CONNECTOR_CD : 101,
  SCRIPT_CONNECTOR_CD : 102,

  // Actions
  FILTER_ACTION_CD : 200,
  NEW_COLUMN_ACTION_CD : 201,
  MERGE_ACTION_CD : 202,
  SPLIT_ACTION_CD : 203,

  // Functions
  FORMULA_FUNCTION_CD : 300,
  MAPPING_FUNCTION_CD : 301,
  QUERY_FUNCTION_CD : 302,
  SCRIPT_FUNCTION_CD : 303,

  // Outputs
  DATA_OUTPUT_CD : 400,


  // Data Object Detail Types

  // Execution type
  SYNC_CD : 0,
  ASYNC_CD : 1,

  // Filter type
  MULTI_CHOICE_CD : 0,
  SINGLE_CHOICE_CD : 1,
  RANGE_CD : 2,
  FORMULA_CD : 3,
  INDEX_CD : 4,

  // Merge type
  LEFT_CD : 0,
  RIGHT_CD : 1,
  INNER_CD : 2,
  FULL_OUTER_CD : 3,
  LEFT_ANTI_CD : 4,
  RIGHT_ANTI_CD : 5,
  UNION_CD : 6,

  // Split type
  BINS_CD : 0,
  COLUMN_CD : 1,

  // Scripts
  MAPPING_OUTPUT_CD : 0,
  FILTER_OUTPUT_CD : 1,
  OUTPUT_CD : 2,
  DATA_CD : 3,
  MULTI_DATA_CD : 4,

  // Queries
  SQL_QUERY_CD : 0,

  // Connector Type
  MYSQL_CD : 0,
  TERADATA_CD : 1,
  POSTGRE_CD : 2,
  SQLITE_CD : 3,

  // File Connector Type
  CSV_CD : 0,

  // Script Connector Type
  PYTHON_CD : 0,

  // Output Types
  DATAFRAME_OUTPUT_CD : 0,
  JSON_OUTPUT_CD : 1,
  JSON_FILE_OUTPUT_CD : 2,
  CSV_FILE_OUTPUT_CD : 3

};


