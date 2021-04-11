
export default {
  project_objects_data_1: {
    "status": true,
    "Response": {
      "id": 1,
      "name": "1.project1 - 2 connectors, merge  v1",
      "project_id": 1,
      "owner_id": 1,
      "project_data_objects": [
        {
          "id": 1,
          "category": 1,
          "group": 1001,
          "type": 100100,
          "category_text": "Data Connector",
          "group_text": "File",
          "type_text": "CSV",
          "name": "CSV Connector 1",
          "owner_id": 1,
          "tag": "connector",
          "parameters": {
            "sep": ",",
            "decimal": ".",
            "filename": "/media/tomas/DATA/SHARED_DATA/DSWRAPPER_TEST_DATASETS/nba-players-stats/Players.csv"
          }
        },
        {
          "id": 3,
          "category": 2,
          "group": 2002,
          "type": 200200,
          "category_text": "Data Action",
          "group_text": "Merge Action",
          "type_text": "Left Join",
          "name": "Left Join",
          "owner_id": 1,
          "tag": "action",
          "parameters": {
            "columns": [
              {
                "left": "Player",
                "right": "Player"
              },
              {
                "left": "Player",
                "right": "Player"
              }
            ]
          }
        },
        {
          "id": 4,
          "category": 2,
          "group": 2000,
          "type": 200004,
          "category_text": "Data Action",
          "group_text": "Filter Action",
          "type_text": "Page Filter",
          "name": "Filter 1",
          "owner_id": 1,
          "tag": "output_table_filter",
          "parameters": {
            "page_size": 10,
            "page_index": 1
          }
        },
        {
          "id": 5,
          "category": 2,
          "group": 2005,
          "type": 200500,
          "category_text": "Data Action",
          "group_text": "Sort",
          "type_text": "Sort Values",
          "name": "Sort 1",
          "owner_id": 1,
          "tag": "output_table_sort",
          "parameters": {
            "columns": {}
          }
        },
        {
          "id": 8,
          "category": 2,
          "group": 2100,
          "type": 210000,
          "category_text": "Data Action",
          "group_text": "Describe",
          "type_text": "Describe Columns",
          "name": "Describe Columns",
          "owner_id": 1,
          "tag": "column_stats",
          "parameters": {}
        },
        {
          "id": 15,
          "category": 1,
          "group": 1001,
          "type": 100100,
          "category_text": "Data Connector",
          "group_text": "File",
          "type_text": "CSV",
          "name": "CSV Connector 1",
          "owner_id": 1,
          "tag": "connector",
          "parameters": {
            "sep": ",",
            "decimal": ".",
            "filename": "/media/tomas/DATA/SHARED_DATA/DSWRAPPER_TEST_DATASETS/nba-players-stats/Seasons_Stats.csv"
          }
        },
        {
          "id": 16,
          "category": 2,
          "group": 2100,
          "type": 210002,
          "category_text": "Data Action",
          "group_text": "Describe",
          "type_text": "Quick Info",
          "name": "Table Quick Info",
          "owner_id": 1,
          "tag": "output_table_quick_info",
          "parameters": {}
        },
        {
          "id": 17,
          "category": 3,
          "group": 3100,
          "type": 310000,
          "category_text": "Visualization",
          "group_text": null,
          "type_text": "Template",
          "name": "Template 1",
          "owner_id": 1,
          "tag": "chart_template",
          "parameters": {}
        },
        {
          "id": 18,
          "category": 3,
          "group": 3100,
          "type": 310000,
          "category_text": "Visualization",
          "group_text": null,
          "type_text": "Template",
          "name": "Template 2",
          "owner_id": 1,
          "tag": "chart_template",
          "parameters": {}
        },
        {
          "id": 19,
          "category": 2,
          "group": 2006,
          "type": 200601,
          "category_text": "Data Action",
          "group_text": "Pivot",
          "type_text": "Chart Pivot",
          "name": "Chart Pivot",
          "owner_id": 1,
          "tag": "chart_pivot",
          "parameters": {}
        }
      ],
      "project_objects": [
        {
          "id": 1,
          "project_id": 1,
          "relative_position": 1,
          "name": "Data Load Process 1",
          "group": 1,
          "type": 100,
          "data_object_tags": {},
          "front_end_tag": "",
          "parameters": {
            "dummy": 2
          },
          "display_settings": {}
        },
        {
          "id": 2,
          "project_id": 1,
          "relative_position": 1,
          "name": "Data Load - Sheet 1",
          "group": 2,
          "type": 200,
          "data_object_tags": {
            "connector": 1
          },
          "front_end_tag": "",
          "parameters": {
            "process_id": 1
          },
          "display_settings": {}
        },
        {
          "id": 3,
          "project_id": 1,
          "relative_position": 1,
          "name": "Data Load Node 1",
          "group": 3,
          "type": 300,
          "data_object_tags": {
            "output_table_filter": 4,
            "output_table_sort": 5,
            "column_stats": 8,
            "output_table_quick_info": 16
          },
          "front_end_tag": "",
          "parameters": {
            "page_id": 2,
            "source_data_node": null,
            "secondary_data_nodes": []
          },
          "display_settings": {}
        },
        {
          "id": 5,
          "project_id": 1,
          "relative_position": 2,
          "name": "Data Load Node 2",
          "group": 3,
          "type": 300,
          "data_object_tags": {
            "output_table_filter": 4,
            "column_stats": 8,
            "output_table_sort": 5,
            "output_table_quick_info": 16
          },
          "front_end_tag": "",
          "parameters": {
            "page_id": 8,
            "source_data_node": null,
            "secondary_data_nodes": []
          },
          "display_settings": {}
        },
        {
          "id": 7,
          "project_id": 1,
          "relative_position": 2,
          "name": "Data Preparation Process 1",
          "group": 1,
          "type": 101,
          "data_object_tags": {},
          "front_end_tag": "",
          "parameters": {
            "dummy": 2
          },
          "display_settings": {}
        },
        {
          "id": 8,
          "project_id": 1,
          "relative_position": 2,
          "name": "Data Load  - Sheet 2",
          "group": 2,
          "type": 200,
          "data_object_tags": {
            "connector": 15
          },
          "front_end_tag": "",
          "parameters": {
            "process_id": 1
          },
          "display_settings": {}
        },
        {
          "id": 9,
          "project_id": 1,
          "relative_position": 1,
          "name": "Data Preparation Node 1",
          "group": 3,
          "type": 301,
          "data_object_tags": {
            "action": 3
          },
          "front_end_tag": "",
          "parameters": {
            "page_id": 11,
            "source_data_node": null,
            "secondary_data_nodes": []
          },
          "display_settings": {}
        },
        {
          "id": 11,
          "project_id": 1,
          "relative_position": 1,
          "name": "Data Prep - Sheet 1",
          "group": 2,
          "type": 201,
          "data_object_tags": {},
          "front_end_tag": "",
          "parameters": {
            "process_id": 7
          },
          "display_settings": {}
        },
        {
          "id": 25,
          "project_id": 1,
          "relative_position": 3,
          "name": "Visualization Process",
          "group": 1,
          "type": 103,
          "data_object_tags": {},
          "front_end_tag": "",
          "parameters": null,
          "display_settings": {}
        },
        {
          "id": 26,
          "project_id": 1,
          "relative_position": 1,
          "name": "Data Vis Page 1",
          "group": 2,
          "type": 203,
          "data_object_tags": {},
          "front_end_tag": "",
          "parameters": {
            "process_id": 25
          },
          "display_settings": {}
        },
        {
          "id": 27,
          "project_id": 1,
          "relative_position": 1,
          "name": "Data Vis Node 1",
          "group": 3,
          "type": 303,
          "data_object_tags": {
            "chart_template": [
              17,
              18
            ],
            "chart_pivot": 19
          },
          "front_end_tag": "",
          "parameters": {
            "page_id": 26,
            "source_data_node": 3,
            "secondary_data_nodes": []
          },
          "display_settings": {}
        }
      ]
    }
  },
  project_all_1: {
    "status": true,
    "Response": [
      {
        "id": 1,
        "name": "project1 - 2 connectors, merge",
        "version": 1
      }
    ]
  },
  data_object_definitions_1: {
    "status": true,
    "Response": {
      "Data Connector": {
        "category_cd": 1,
        "children": [
          {
            "function": {
              "name": "MySQLConnector",
              "parameters": [
                {
                  "name": "default_database",
                  "default": null,
                  "dtype": {
                    "type": "string",
                    "default": null,
                    "min_length": null,
                    "max_length": null,
                    "regex": null,
                    "options": null,
                    "allow_null": true
                  }
                },
                {
                  "name": "username",
                  "default": null,
                  "dtype": {
                    "type": "string",
                    "default": null,
                    "min_length": null,
                    "max_length": null,
                    "regex": null,
                    "options": null,
                    "allow_null": true
                  }
                },
                {
                  "name": "password",
                  "default": null,
                  "dtype": {
                    "type": "string",
                    "default": null,
                    "min_length": null,
                    "max_length": null,
                    "regex": null,
                    "options": null,
                    "allow_null": true
                  }
                },
                {
                  "name": "server",
                  "default": null,
                  "dtype": {
                    "type": "string",
                    "default": null,
                    "min_length": null,
                    "max_length": null,
                    "regex": null,
                    "options": null,
                    "allow_null": true
                  }
                },
                {
                  "name": "port",
                  "default": null,
                  "dtype": {
                    "type": "integer",
                    "default": null,
                    "min_value": null,
                    "max_value": null,
                    "options": null,
                    "allow_null": true
                  }
                }
              ],
              "type": "class",
              "methods": [
                {
                  "name": "connect",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "disconnect",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "run_query",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "queries",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "query_vars",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "new_conn",
                      "default": false,
                      "dtype": null
                    },
                    {
                      "name": "limit",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "index_col",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "coerce_float",
                      "default": true,
                      "dtype": null
                    },
                    {
                      "name": "parse_dates",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "skip_on_error",
                      "default": false,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "test_connection",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    }
                  ]
                }
              ]
            },
            "group_name": "SQL",
            "group_cd": 1000,
            "type_cd": 100000,
            "type_name": "MySQL"
          },
          {
            "function": {
              "name": "PostgresSQLConnector",
              "parameters": [
                {
                  "name": "default_database",
                  "default": null,
                  "dtype": {
                    "type": "string",
                    "default": null,
                    "min_length": null,
                    "max_length": null,
                    "regex": null,
                    "options": null,
                    "allow_null": true
                  }
                },
                {
                  "name": "username",
                  "default": null,
                  "dtype": {
                    "type": "string",
                    "default": null,
                    "min_length": null,
                    "max_length": null,
                    "regex": null,
                    "options": null,
                    "allow_null": true
                  }
                },
                {
                  "name": "password",
                  "default": null,
                  "dtype": {
                    "type": "string",
                    "default": null,
                    "min_length": null,
                    "max_length": null,
                    "regex": null,
                    "options": null,
                    "allow_null": true
                  }
                },
                {
                  "name": "server",
                  "default": null,
                  "dtype": {
                    "type": "string",
                    "default": null,
                    "min_length": null,
                    "max_length": null,
                    "regex": null,
                    "options": null,
                    "allow_null": true
                  }
                },
                {
                  "name": "port",
                  "default": null,
                  "dtype": {
                    "type": "integer",
                    "default": null,
                    "min_value": null,
                    "max_value": null,
                    "options": null,
                    "allow_null": true
                  }
                }
              ],
              "type": "class",
              "methods": [
                {
                  "name": "connect",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "disconnect",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "run_query",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "queries",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "query_vars",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "new_conn",
                      "default": false,
                      "dtype": null
                    },
                    {
                      "name": "limit",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "index_col",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "coerce_float",
                      "default": true,
                      "dtype": null
                    },
                    {
                      "name": "parse_dates",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "skip_on_error",
                      "default": false,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "test_connection",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    }
                  ]
                }
              ]
            },
            "group_name": "SQL",
            "group_cd": 1000,
            "type_cd": 100001,
            "type_name": "PostgreSQL"
          },
          {
            "function": {
              "name": "SqliteConnector",
              "parameters": [
                {
                  "name": "database",
                  "default": null,
                  "dtype": {
                    "type": "string",
                    "default": null,
                    "min_length": null,
                    "max_length": null,
                    "regex": null,
                    "options": null,
                    "allow_null": true
                  }
                }
              ],
              "type": "class",
              "methods": [
                {
                  "name": "connect",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    }
                  ]
                }
              ]
            },
            "group_name": "SQL",
            "group_cd": 1000,
            "type_cd": 100002,
            "type_name": "SQLite"
          },
          {
            "function": {
              "name": "CSVConnector",
              "parameters": [
                {
                  "name": "filename",
                  "default": null,
                  "dtype": {
                    "type": "string",
                    "default": null,
                    "min_length": null,
                    "max_length": null,
                    "regex": null,
                    "options": null,
                    "allow_null": true
                  }
                },
                {
                  "name": "sep",
                  "default": null,
                  "dtype": {
                    "type": "string",
                    "default": null,
                    "min_length": null,
                    "max_length": null,
                    "regex": null,
                    "options": null,
                    "allow_null": true
                  }
                },
                {
                  "name": "decimal",
                  "default": ".",
                  "dtype": {
                    "type": "string",
                    "default": null,
                    "min_length": null,
                    "max_length": null,
                    "regex": null,
                    "options": null,
                    "allow_null": true
                  }
                }
              ],
              "type": "class",
              "methods": [
                {
                  "name": "run",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "test_connection",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    }
                  ]
                }
              ]
            },
            "group_name": "File",
            "group_cd": 1001,
            "type_cd": 100100,
            "type_name": "CSV"
          },
          {
            "function": {
              "name": "FeatherConnector",
              "parameters": [
                {
                  "name": "filename",
                  "default": null,
                  "dtype": null
                }
              ],
              "type": "class",
              "methods": [
                {
                  "name": "run",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "test_connection",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    }
                  ]
                }
              ]
            },
            "group_name": "File",
            "group_cd": 1001,
            "type_cd": 100101,
            "type_name": "Feather"
          }
        ]
      },
      "Data Action": {
        "category_cd": 2,
        "children": [
          {
            "function": {
              "name": "filter_formula",
              "parameters": [
                {
                  "name": "data",
                  "default": null,
                  "dtype": {
                    "type": "dataset",
                    "df_count": 1,
                    "allow_null": true
                  }
                },
                {
                  "name": "formula",
                  "default": null,
                  "dtype": {
                    "type": "list",
                    "max_len": 20,
                    "list_key": 1,
                    "variable": {
                      "type": "formula",
                      "min_length": 0,
                      "max_length": 1000,
                      "data_index": null,
                      "allow_null": true
                    }
                  }
                },
                {
                  "name": "negative",
                  "default": null,
                  "dtype": {
                    "type": "boolean",
                    "default": null,
                    "allow_null": true
                  }
                },
                {
                  "name": "alternative",
                  "default": null,
                  "dtype": {
                    "type": "boolean",
                    "default": null,
                    "allow_null": true
                  }
                }
              ],
              "type": "function"
            },
            "group_name": "Filter Action",
            "group_cd": 2000,
            "type_cd": 200000,
            "type_name": "Formula Filter"
          },
          {
            "function": {
              "name": "filter_list",
              "parameters": [
                {
                  "name": "data",
                  "default": null,
                  "dtype": {
                    "type": "dataset",
                    "df_count": 1,
                    "allow_null": true
                  }
                },
                {
                  "name": "column",
                  "default": null,
                  "dtype": {
                    "type": "column",
                    "data_index": null,
                    "allow_multiple": true,
                    "allow_null": true
                  }
                },
                {
                  "name": "values",
                  "default": null,
                  "dtype": {
                    "type": "list",
                    "max_len": null,
                    "list_key": null,
                    "variable": null
                  }
                }
              ],
              "type": "function"
            },
            "group_name": "Filter Action",
            "group_cd": 2000,
            "type_cd": 200001,
            "type_name": "List Filter"
          },
          {
            "function": {
              "name": "filter_regex",
              "parameters": [
                {
                  "name": "data",
                  "default": null,
                  "dtype": {
                    "type": "dataset",
                    "df_count": 1,
                    "allow_null": true
                  }
                },
                {
                  "name": "column",
                  "default": null,
                  "dtype": {
                    "type": "column",
                    "data_index": null,
                    "allow_multiple": true,
                    "allow_null": true
                  }
                },
                {
                  "name": "regex",
                  "default": null,
                  "dtype": {
                    "type": "string",
                    "default": null,
                    "min_length": null,
                    "max_length": null,
                    "regex": null,
                    "options": null,
                    "allow_null": true
                  }
                },
                {
                  "name": "negative",
                  "default": null,
                  "dtype": {
                    "type": "boolean",
                    "default": null,
                    "allow_null": true
                  }
                },
                {
                  "name": "alternative",
                  "default": null,
                  "dtype": {
                    "type": "boolean",
                    "default": null,
                    "allow_null": true
                  }
                }
              ],
              "type": "function"
            },
            "group_name": "Filter Action",
            "group_cd": 2000,
            "type_cd": 200002,
            "type_name": "Regex Filter"
          },
          {
            "function": {
              "name": "filter_conditional",
              "parameters": [
                {
                  "name": "data",
                  "default": null,
                  "dtype": {
                    "type": "dataset",
                    "df_count": 1,
                    "allow_null": true
                  }
                },
                {
                  "name": "column",
                  "default": null,
                  "dtype": {
                    "type": "column",
                    "data_index": null,
                    "allow_multiple": true,
                    "allow_null": true
                  }
                },
                {
                  "name": "condition",
                  "default": null,
                  "dtype": {
                    "type": "condition",
                    "types": {
                      "gt": {
                        "type": "float",
                        "default": null,
                        "min_value": null,
                        "max_value": null,
                        "allow_null": true
                      },
                      "ge": {
                        "type": "float",
                        "default": null,
                        "min_value": null,
                        "max_value": null,
                        "allow_null": true
                      },
                      "lt": {
                        "type": "float",
                        "default": null,
                        "min_value": null,
                        "max_value": null,
                        "allow_null": true
                      },
                      "le": {
                        "type": "float",
                        "default": null,
                        "min_value": null,
                        "max_value": null,
                        "allow_null": true
                      },
                      "between": {
                        "type": "float_range",
                        "default": null,
                        "min_value": null,
                        "max_value": null,
                        "allow_null": true
                      },
                      "startswith": {
                        "type": "string",
                        "default": null,
                        "min_length": null,
                        "max_length": null,
                        "regex": null,
                        "options": null,
                        "allow_null": true
                      },
                      "endswith": {
                        "type": "string",
                        "default": null,
                        "min_length": null,
                        "max_length": null,
                        "regex": null,
                        "options": null,
                        "allow_null": true
                      },
                      "contains": {
                        "type": "string",
                        "default": null,
                        "min_length": null,
                        "max_length": null,
                        "regex": null,
                        "options": null,
                        "allow_null": true
                      },
                      "regex": {
                        "type": "string",
                        "default": null,
                        "min_length": null,
                        "max_length": null,
                        "regex": null,
                        "options": null,
                        "allow_null": true
                      }
                    },
                    "allow_null": true
                  }
                },
                {
                  "name": "negative",
                  "default": null,
                  "dtype": {
                    "type": "boolean",
                    "default": null,
                    "allow_null": true
                  }
                },
                {
                  "name": "alternative",
                  "default": null,
                  "dtype": {
                    "type": "boolean",
                    "default": null,
                    "allow_null": true
                  }
                }
              ],
              "type": "function"
            },
            "group_name": "Filter Action",
            "group_cd": 2000,
            "type_cd": 200003,
            "type_name": "Conditional Filter"
          },
          {
            "function": {
              "name": "filter_row_index_range",
              "parameters": [
                {
                  "name": "data",
                  "default": null,
                  "dtype": {
                    "type": "dataset",
                    "df_count": 1,
                    "allow_null": true
                  }
                },
                {
                  "name": "lower",
                  "default": null,
                  "dtype": null
                },
                {
                  "name": "upper",
                  "default": null,
                  "dtype": null
                }
              ],
              "type": "function"
            },
            "group_name": "Filter Action",
            "group_cd": 2000,
            "type_cd": 200004,
            "type_name": "Row range Filter"
          },
          {
            "function": {
              "name": "filter_page",
              "parameters": [
                {
                  "name": "data",
                  "default": null,
                  "dtype": {
                    "type": "dataset",
                    "df_count": 1,
                    "allow_null": true
                  }
                },
                {
                  "name": "page_size",
                  "default": null,
                  "dtype": {
                    "type": "integer",
                    "default": null,
                    "min_value": null,
                    "max_value": null,
                    "options": null,
                    "allow_null": true
                  }
                },
                {
                  "name": "page_index",
                  "default": null,
                  "dtype": {
                    "type": "integer",
                    "default": null,
                    "min_value": null,
                    "max_value": null,
                    "options": null,
                    "allow_null": true
                  }
                }
              ],
              "type": "function"
            },
            "group_name": "Filter Action",
            "group_cd": 2000,
            "type_cd": 200004,
            "type_name": "Page Filter"
          },
          {
            "function": {
              "name": "map_formula",
              "parameters": [
                {
                  "name": "data",
                  "default": null,
                  "dtype": {
                    "type": "dataset",
                    "df_count": 1,
                    "allow_null": true
                  }
                },
                {
                  "name": "new_column_name",
                  "default": null,
                  "dtype": {
                    "type": "string",
                    "default": null,
                    "min_length": null,
                    "max_length": null,
                    "regex": null,
                    "options": null,
                    "allow_null": true
                  }
                },
                {
                  "name": "formula",
                  "default": null,
                  "dtype": {
                    "type": "list",
                    "max_len": 20,
                    "list_key": 1,
                    "variable": {
                      "type": "formula",
                      "min_length": 0,
                      "max_length": 1000,
                      "data_index": null,
                      "allow_null": true
                    }
                  }
                },
                {
                  "name": "output",
                  "default": null,
                  "dtype": {
                    "type": "list",
                    "max_len": 20,
                    "list_key": 1,
                    "variable": {
                      "type": "string",
                      "default": null,
                      "min_length": null,
                      "max_length": null,
                      "regex": null,
                      "options": null,
                      "allow_null": true
                    }
                  }
                },
                {
                  "name": "default_output",
                  "default": null,
                  "dtype": {
                    "type": "string",
                    "default": null,
                    "min_length": null,
                    "max_length": null,
                    "regex": null,
                    "options": null,
                    "allow_null": true
                  }
                }
              ],
              "type": "function"
            },
            "group_name": "Map Action",
            "group_cd": 2001,
            "type_cd": 200100,
            "type_name": "Formula Map"
          },
          {
            "function": {
              "name": "map_dictionary",
              "parameters": [
                {
                  "name": "data",
                  "default": null,
                  "dtype": {
                    "type": "dataset",
                    "df_count": 1,
                    "allow_null": true
                  }
                },
                {
                  "name": "new_column_name",
                  "default": null,
                  "dtype": {
                    "type": "string",
                    "default": null,
                    "min_length": null,
                    "max_length": null,
                    "regex": null,
                    "options": null,
                    "allow_null": true
                  }
                },
                {
                  "name": "column",
                  "default": null,
                  "dtype": null
                },
                {
                  "name": "dictionary",
                  "default": null,
                  "dtype": {}
                },
                {
                  "name": "default_output",
                  "default": null,
                  "dtype": {
                    "type": "string",
                    "default": null,
                    "min_length": null,
                    "max_length": null,
                    "regex": null,
                    "options": null,
                    "allow_null": true
                  }
                }
              ],
              "type": "function"
            },
            "group_name": "Map Action",
            "group_cd": 2001,
            "type_cd": 200101,
            "type_name": "Dictionary Map"
          },
          {
            "function": {
              "name": "map_regex",
              "parameters": [
                {
                  "name": "data",
                  "default": null,
                  "dtype": {
                    "type": "dataset",
                    "df_count": 1,
                    "allow_null": true
                  }
                },
                {
                  "name": "column",
                  "default": null,
                  "dtype": null
                },
                {
                  "name": "new_column_name",
                  "default": null,
                  "dtype": {
                    "type": "string",
                    "default": null,
                    "min_length": null,
                    "max_length": null,
                    "regex": null,
                    "options": null,
                    "allow_null": true
                  }
                },
                {
                  "name": "regex",
                  "default": null,
                  "dtype": {
                    "type": "list",
                    "max_len": 20,
                    "list_key": 1,
                    "variable": {
                      "type": "string",
                      "default": null,
                      "min_length": null,
                      "max_length": null,
                      "regex": null,
                      "options": null,
                      "allow_null": true
                    }
                  }
                },
                {
                  "name": "output",
                  "default": null,
                  "dtype": {
                    "type": "list",
                    "max_len": 20,
                    "list_key": 1,
                    "variable": {
                      "type": "string",
                      "default": null,
                      "min_length": null,
                      "max_length": null,
                      "regex": null,
                      "options": null,
                      "allow_null": true
                    }
                  }
                },
                {
                  "name": "ignore_case",
                  "default": null,
                  "dtype": {
                    "type": "list",
                    "max_len": 20,
                    "list_key": 1,
                    "variable": {
                      "type": "boolean",
                      "default": null,
                      "allow_null": true
                    }
                  }
                },
                {
                  "name": "default_output",
                  "default": null,
                  "dtype": {
                    "type": "string",
                    "default": null,
                    "min_length": null,
                    "max_length": null,
                    "regex": null,
                    "options": null,
                    "allow_null": true
                  }
                }
              ],
              "type": "function"
            },
            "group_name": "Map Action",
            "group_cd": 2001,
            "type_cd": 200102,
            "type_name": "Regex Map"
          },
          {
            "function": {
              "name": "map_conditional",
              "parameters": [
                {
                  "name": "data",
                  "default": null,
                  "dtype": {
                    "type": "dataset",
                    "df_count": 1,
                    "allow_null": true
                  }
                },
                {
                  "name": "column",
                  "default": null,
                  "dtype": null
                },
                {
                  "name": "new_column_name",
                  "default": null,
                  "dtype": {
                    "type": "string",
                    "default": null,
                    "min_length": null,
                    "max_length": null,
                    "regex": null,
                    "options": null,
                    "allow_null": true
                  }
                },
                {
                  "name": "condition",
                  "default": null,
                  "dtype": {
                    "type": "list",
                    "max_len": 20,
                    "list_key": 1,
                    "variable": {
                      "type": "condition",
                      "types": {
                        "gt": {
                          "type": "float",
                          "default": null,
                          "min_value": null,
                          "max_value": null,
                          "allow_null": true
                        },
                        "ge": {
                          "type": "float",
                          "default": null,
                          "min_value": null,
                          "max_value": null,
                          "allow_null": true
                        },
                        "lt": {
                          "type": "float",
                          "default": null,
                          "min_value": null,
                          "max_value": null,
                          "allow_null": true
                        },
                        "le": {
                          "type": "float",
                          "default": null,
                          "min_value": null,
                          "max_value": null,
                          "allow_null": true
                        },
                        "between": {
                          "type": "float_range",
                          "default": null,
                          "min_value": null,
                          "max_value": null,
                          "allow_null": true
                        },
                        "startswith": {
                          "type": "string",
                          "default": null,
                          "min_length": null,
                          "max_length": null,
                          "regex": null,
                          "options": null,
                          "allow_null": true
                        },
                        "endswith": {
                          "type": "string",
                          "default": null,
                          "min_length": null,
                          "max_length": null,
                          "regex": null,
                          "options": null,
                          "allow_null": true
                        },
                        "contains": {
                          "type": "string",
                          "default": null,
                          "min_length": null,
                          "max_length": null,
                          "regex": null,
                          "options": null,
                          "allow_null": true
                        },
                        "regex": {
                          "type": "string",
                          "default": null,
                          "min_length": null,
                          "max_length": null,
                          "regex": null,
                          "options": null,
                          "allow_null": true
                        }
                      },
                      "allow_null": true
                    }
                  }
                },
                {
                  "name": "output",
                  "default": null,
                  "dtype": {
                    "type": "list",
                    "max_len": 20,
                    "list_key": 1,
                    "variable": {
                      "type": "string",
                      "default": null,
                      "min_length": null,
                      "max_length": null,
                      "regex": null,
                      "options": null,
                      "allow_null": true
                    }
                  }
                },
                {
                  "name": "default_output",
                  "default": null,
                  "dtype": {
                    "type": "string",
                    "default": null,
                    "min_length": null,
                    "max_length": null,
                    "regex": null,
                    "options": null,
                    "allow_null": true
                  }
                }
              ],
              "type": "function"
            },
            "group_name": "Map Action",
            "group_cd": 2001,
            "type_cd": 200103,
            "type_name": "Conditional Map"
          },
          {
            "function": {
              "name": "map_bins",
              "parameters": [
                {
                  "name": "data",
                  "default": null,
                  "dtype": {
                    "type": "dataset",
                    "df_count": 1,
                    "allow_null": true
                  }
                },
                {
                  "name": "column",
                  "default": null,
                  "dtype": null
                },
                {
                  "name": "new_column_name",
                  "default": null,
                  "dtype": {
                    "type": "string",
                    "default": null,
                    "min_length": null,
                    "max_length": null,
                    "regex": null,
                    "options": null,
                    "allow_null": true
                  }
                },
                {
                  "name": "bins",
                  "default": null,
                  "dtype": {
                    "type": "integer",
                    "default": null,
                    "min_value": 2,
                    "max_value": 10000,
                    "options": null,
                    "allow_null": true
                  }
                },
                {
                  "name": "output",
                  "default": null,
                  "dtype": {
                    "type": "string",
                    "default": null,
                    "min_length": null,
                    "max_length": null,
                    "regex": null,
                    "options": null,
                    "allow_null": true
                  }
                }
              ],
              "type": "function"
            },
            "group_name": "Map Action",
            "group_cd": 2001,
            "type_cd": 200104,
            "type_name": "Bin Map"
          },
          {
            "function": {
              "name": "left_join",
              "parameters": [
                {
                  "name": "data",
                  "default": null,
                  "dtype": {
                    "type": "dataset",
                    "df_count": 1,
                    "allow_null": true
                  }
                },
                {
                  "name": "columns",
                  "default": null,
                  "dtype": {
                    "type": "list",
                    "max_len": 20,
                    "list_key": null,
                    "variable": {
                      "type": "column_pair",
                      "names": [
                        "left",
                        "right"
                      ],
                      "data_index": null,
                      "allow_null": true
                    }
                  }
                }
              ],
              "type": "function"
            },
            "group_name": "Merge Action",
            "group_cd": 2002,
            "type_cd": 200200,
            "type_name": "Left Join"
          },
          {
            "function": {
              "name": "right_join",
              "parameters": [
                {
                  "name": "data",
                  "default": null,
                  "dtype": {
                    "type": "dataset",
                    "df_count": 1,
                    "allow_null": true
                  }
                },
                {
                  "name": "columns",
                  "default": null,
                  "dtype": {
                    "type": "list",
                    "max_len": 20,
                    "list_key": null,
                    "variable": {
                      "type": "column_pair",
                      "names": [
                        "left",
                        "right"
                      ],
                      "data_index": null,
                      "allow_null": true
                    }
                  }
                }
              ],
              "type": "function"
            },
            "group_name": "Merge Action",
            "group_cd": 2002,
            "type_cd": 200201,
            "type_name": "Right Join"
          },
          {
            "function": {
              "name": "outer_join",
              "parameters": [
                {
                  "name": "data",
                  "default": null,
                  "dtype": {
                    "type": "dataset",
                    "df_count": 1,
                    "allow_null": true
                  }
                },
                {
                  "name": "columns",
                  "default": null,
                  "dtype": {
                    "type": "list",
                    "max_len": 20,
                    "list_key": null,
                    "variable": {
                      "type": "column_pair",
                      "names": [
                        "left",
                        "right"
                      ],
                      "data_index": null,
                      "allow_null": true
                    }
                  }
                }
              ],
              "type": "function"
            },
            "group_name": "Merge Action",
            "group_cd": 2002,
            "type_cd": 200202,
            "type_name": "Outer Join"
          },
          {
            "function": {
              "name": "inner_join",
              "parameters": [
                {
                  "name": "data",
                  "default": null,
                  "dtype": {
                    "type": "dataset",
                    "df_count": 1,
                    "allow_null": true
                  }
                },
                {
                  "name": "columns",
                  "default": null,
                  "dtype": {
                    "type": "list",
                    "max_len": 20,
                    "list_key": null,
                    "variable": {
                      "type": "column_pair",
                      "names": [
                        "left",
                        "right"
                      ],
                      "data_index": null,
                      "allow_null": true
                    }
                  }
                }
              ],
              "type": "function"
            },
            "group_name": "Merge Action",
            "group_cd": 2002,
            "type_cd": 200203,
            "type_name": "Inner Join"
          },
          {
            "function": {
              "name": "union",
              "parameters": [
                {
                  "name": "data",
                  "default": null,
                  "dtype": {
                    "type": "dataset",
                    "df_count": 1,
                    "allow_null": true
                  }
                }
              ],
              "type": "function"
            },
            "group_name": "Merge Action",
            "group_cd": 2002,
            "type_cd": 200204,
            "type_name": "Union Merge"
          },
          {
            "function": {
              "name": "subtotal",
              "parameters": [
                {
                  "name": "data",
                  "default": null,
                  "dtype": {
                    "type": "dataset",
                    "df_count": 1,
                    "allow_null": true
                  }
                },
                {
                  "name": "new_column_name",
                  "default": null,
                  "dtype": null
                },
                {
                  "name": "groupby_columns",
                  "default": null,
                  "dtype": {
                    "type": "list",
                    "max_len": null,
                    "list_key": null,
                    "variable": {
                      "type": "column",
                      "data_index": null,
                      "allow_multiple": true,
                      "allow_null": true
                    }
                  }
                },
                {
                  "name": "value_column",
                  "default": null,
                  "dtype": {
                    "type": "column",
                    "data_index": null,
                    "allow_multiple": true,
                    "allow_null": true
                  }
                },
                {
                  "name": "aggregation",
                  "default": null,
                  "dtype": {
                    "type": "string",
                    "default": null,
                    "min_length": null,
                    "max_length": null,
                    "regex": null,
                    "options": [
                      "len",
                      "sum",
                      "max",
                      "min",
                      "avg",
                      "median",
                      "mean",
                      "std",
                      "var"
                    ],
                    "allow_null": true
                  }
                }
              ],
              "type": "function"
            },
            "group_name": "Aggregate Action",
            "group_cd": 2003,
            "type_cd": 200300,
            "type_name": "Subtotal Aggregate"
          },
          {
            "function": {
              "name": "rolling_window",
              "parameters": [
                {
                  "name": "data",
                  "default": null,
                  "dtype": {
                    "type": "dataset",
                    "df_count": 1,
                    "allow_null": true
                  }
                },
                {
                  "name": "new_column_name",
                  "default": null,
                  "dtype": {
                    "type": "list",
                    "max_len": null,
                    "list_key": 1,
                    "variable": {
                      "type": "string",
                      "default": null,
                      "min_length": null,
                      "max_length": null,
                      "regex": null,
                      "options": null,
                      "allow_null": true
                    }
                  }
                },
                {
                  "name": "window",
                  "default": null,
                  "dtype": {
                    "type": "integer",
                    "default": null,
                    "min_value": null,
                    "max_value": null,
                    "options": null,
                    "allow_null": true
                  }
                },
                {
                  "name": "value_column",
                  "default": null,
                  "dtype": {
                    "type": "list",
                    "max_len": null,
                    "list_key": 1,
                    "variable": {
                      "type": "column",
                      "data_index": null,
                      "allow_multiple": true,
                      "allow_null": true
                    }
                  }
                },
                {
                  "name": "aggregation",
                  "default": null,
                  "dtype": {
                    "type": "list",
                    "max_len": null,
                    "list_key": 1,
                    "variable": {
                      "type": "string",
                      "default": null,
                      "min_length": null,
                      "max_length": null,
                      "regex": null,
                      "options": [
                        "len",
                        "sum",
                        "max",
                        "min",
                        "avg",
                        "median",
                        "mean",
                        "std",
                        "var"
                      ],
                      "allow_null": true
                    }
                  }
                }
              ],
              "type": "function"
            },
            "group_name": "Aggregate Action",
            "group_cd": 2003,
            "type_cd": 200301,
            "type_name": "Rolling Window Aggregate"
          },
          {
            "function": {
              "name": "describe_columns",
              "parameters": [
                {
                  "name": "data",
                  "default": null,
                  "dtype": {
                    "type": "dataset",
                    "df_count": 1,
                    "allow_null": true
                  }
                }
              ],
              "type": "function"
            },
            "group_name": "Describe",
            "group_cd": 2100,
            "type_cd": 210000,
            "type_name": "Describe Columns"
          },
          {
            "function": {
              "name": "get_quick_table_info",
              "parameters": [
                {
                  "name": "data",
                  "default": null,
                  "dtype": {
                    "type": "dataset",
                    "df_count": 1,
                    "allow_null": true
                  }
                }
              ],
              "type": "function"
            },
            "group_name": "Describe",
            "group_cd": 2100,
            "type_cd": 210002,
            "type_name": "Quick Info"
          },
          {
            "function": {
              "name": "describe_data",
              "parameters": [
                {
                  "name": "data",
                  "default": null,
                  "dtype": {
                    "type": "dataset",
                    "df_count": 1,
                    "allow_null": true
                  }
                }
              ],
              "type": "function"
            },
            "group_name": "Describe",
            "group_cd": 2100,
            "type_cd": 210001,
            "type_name": "Describe Data"
          },
          {
            "function": {
              "name": "sort_rows",
              "parameters": [
                {
                  "name": "data",
                  "default": null,
                  "dtype": {
                    "type": "dataset",
                    "df_count": 1,
                    "allow_null": true
                  }
                },
                {
                  "name": "columns",
                  "default": null,
                  "dtype": {}
                }
              ],
              "type": "function"
            },
            "group_name": "Sort",
            "group_cd": 2005,
            "type_cd": 200500,
            "type_name": "Sort Values"
          },
          {
            "function": {
              "name": "Pivot",
              "parameters": [
                {
                  "name": "data",
                  "default": null,
                  "dtype": null
                },
                {
                  "name": "xaxis",
                  "default": null,
                  "dtype": null
                },
                {
                  "name": "yaxis",
                  "default": null,
                  "dtype": null
                },
                {
                  "name": "value_axis",
                  "default": null,
                  "dtype": null
                },
                {
                  "name": "values_coordinates",
                  "default": [
                    0,
                    0
                  ],
                  "dtype": null
                }
              ],
              "type": "class",
              "methods": [
                {
                  "name": "_create_source_pivot",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "_generate_value_mappings",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "_get_levels_order",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "_get_sort_order",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "_get_unstack_order",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "_index_to_multi",
                  "parameters": [
                    {
                      "name": "df",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "_reorder_pivot",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "pivot",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "_stack_value_columns",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "pivot",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "add_columns",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "value_axis",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "aggregate_over",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "columns",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "agg",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "apply_formula",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "name",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "formula",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "create_subtotals",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "levels",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "agg",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "axes",
                      "default": 0,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "run",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "to_dataframe",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    }
                  ]
                }
              ]
            },
            "group_name": "Pivot",
            "group_cd": 2006,
            "type_cd": 200600,
            "type_name": "Base Pivot Action"
          },
          {
            "function": {
              "name": "ChartPivot",
              "parameters": [
                {
                  "name": "data",
                  "default": null,
                  "dtype": {
                    "type": "dataset",
                    "df_count": 1,
                    "allow_null": true
                  }
                },
                {
                  "name": "main_axis",
                  "default": null,
                  "dtype": {
                    "type": "list",
                    "max_len": null,
                    "list_key": null,
                    "variable": {
                      "type": "column",
                      "data_index": null,
                      "allow_multiple": true,
                      "allow_null": true
                    }
                  }
                },
                {
                  "name": "values",
                  "default": null,
                  "dtype": {
                    "type": "list",
                    "max_len": null,
                    "list_key": null,
                    "variable": {
                      "type": "column",
                      "data_index": null,
                      "allow_multiple": true,
                      "allow_null": true
                    }
                  }
                },
                {
                  "name": "category",
                  "default": null,
                  "dtype": {
                    "type": "list",
                    "max_len": null,
                    "list_key": null,
                    "variable": {
                      "type": "column",
                      "data_index": null,
                      "allow_multiple": true,
                      "allow_null": true
                    }
                  }
                }
              ],
              "type": "class",
              "methods": [
                {
                  "name": "_create_source_pivot",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "_generate_value_mappings",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "_get_levels_order",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "_get_sort_order",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "_get_unstack_order",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "_index_to_multi",
                  "parameters": [
                    {
                      "name": "df",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "_reorder_pivot",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "pivot",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "_stack_value_columns",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "pivot",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "add_columns",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "value_axis",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "aggregate_over",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "columns",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "agg",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "apply_formula",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "name",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "formula",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "create_subtotals",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "levels",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "agg",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "axes",
                      "default": 0,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "run",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "to_dataframe",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    }
                  ]
                }
              ]
            },
            "group_name": "Pivot",
            "group_cd": 2006,
            "type_cd": 200601,
            "type_name": "Chart Pivot"
          }
        ]
      },
      "Visualization": {
        "category_cd": 3,
        "children": [
          {
            "function": {
              "name": "ChartTemplate",
              "parameters": [
                {
                  "name": "template",
                  "default": null,
                  "dtype": {
                    "title.show": {
                      "type": "boolean",
                      "default": true,
                      "allow_null": true
                    },
                    "title.text": {
                      "type": "string",
                      "default": "Title",
                      "min_length": null,
                      "max_length": null,
                      "regex": null,
                      "options": null,
                      "allow_null": true
                    },
                    "title.horizontal_position": {
                      "type": "string",
                      "default": "middle",
                      "min_length": null,
                      "max_length": null,
                      "regex": null,
                      "options": [
                        "left",
                        "middle",
                        "right"
                      ],
                      "allow_null": true
                    },
                    "title.vertical_position": {
                      "type": "integer",
                      "default": null,
                      "min_value": null,
                      "max_value": null,
                      "options": null,
                      "allow_null": true
                    },
                    "title.color": {
                      "type": "color",
                      "default": "#111111",
                      "min_length": null,
                      "max_length": null,
                      "regex": "#[\\dA-F][\\dA-F][\\dA-F][\\dA-F][\\dA-F][\\dA-F]",
                      "options": null,
                      "allow_null": true
                    },
                    "title.font_family": {
                      "type": "string",
                      "default": "arial",
                      "min_length": null,
                      "max_length": null,
                      "regex": null,
                      "options": [
                        "arial",
                        "times",
                        "bold"
                      ],
                      "allow_null": true
                    },
                    "title.font_weight": {
                      "type": "string",
                      "default": "normal",
                      "min_length": null,
                      "max_length": null,
                      "regex": null,
                      "options": [
                        "normal",
                        "bolder",
                        "bold"
                      ],
                      "allow_null": true
                    },
                    "title.font_size": {
                      "type": "integer",
                      "default": 18,
                      "min_value": 8,
                      "max_value": 80,
                      "options": null,
                      "allow_null": true
                    },
                    "subtitle.color": {
                      "type": "color",
                      "default": "#111111",
                      "min_length": null,
                      "max_length": null,
                      "regex": "#[\\dA-F][\\dA-F][\\dA-F][\\dA-F][\\dA-F][\\dA-F]",
                      "options": null,
                      "allow_null": true
                    },
                    "subtitle.font_family": {
                      "type": "string",
                      "default": "arial",
                      "min_length": null,
                      "max_length": null,
                      "regex": null,
                      "options": [
                        "arial",
                        "times",
                        "bold"
                      ],
                      "allow_null": true
                    },
                    "subtitle.font_weight": {
                      "type": "string",
                      "default": "normal",
                      "min_length": null,
                      "max_length": null,
                      "regex": null,
                      "options": [
                        "normal",
                        "bolder",
                        "bold"
                      ],
                      "allow_null": true
                    },
                    "subtitle.font_size": {
                      "type": "integer",
                      "default": 18,
                      "min_value": 8,
                      "max_value": 80,
                      "options": null,
                      "allow_null": true
                    },
                    "position.left": {
                      "type": "integer",
                      "default": 0,
                      "min_value": null,
                      "max_value": null,
                      "options": null,
                      "allow_null": true
                    },
                    "position.top": {
                      "type": "integer",
                      "default": 0,
                      "min_value": null,
                      "max_value": null,
                      "options": null,
                      "allow_null": true
                    },
                    "position.right": {
                      "type": "integer",
                      "default": 0,
                      "min_value": null,
                      "max_value": null,
                      "options": null,
                      "allow_null": true
                    },
                    "position.bottom": {
                      "type": "integer",
                      "default": 0,
                      "min_value": null,
                      "max_value": null,
                      "options": null,
                      "allow_null": true
                    },
                    "background_color": {
                      "type": "color",
                      "default": "#ffffff",
                      "min_length": null,
                      "max_length": null,
                      "regex": "#[\\dA-F][\\dA-F][\\dA-F][\\dA-F][\\dA-F][\\dA-F]",
                      "options": null,
                      "allow_null": true
                    },
                    "chart_types": {
                      "line": {
                        "chart_type": {
                          "type": "constant",
                          "value": "line",
                          "allow_null": true
                        },
                        "x_axis.type": {
                          "type": "string",
                          "default": null,
                          "min_length": null,
                          "max_length": null,
                          "regex": null,
                          "options": [
                            "value",
                            "category",
                            "time",
                            "log"
                          ],
                          "allow_null": true
                        },
                        "x_axis.show": {
                          "type": "boolean",
                          "default": true,
                          "allow_null": true
                        },
                        "x_axis.offset": {
                          "type": "integer",
                          "default": 0,
                          "min_value": null,
                          "max_value": null,
                          "options": null,
                          "allow_null": true
                        },
                        "x_axis.min": {
                          "type": "integer",
                          "default": null,
                          "min_value": null,
                          "max_value": null,
                          "options": null,
                          "allow_null": true
                        },
                        "x_axis.max": {
                          "type": "integer",
                          "default": null,
                          "min_value": null,
                          "max_value": null,
                          "options": null,
                          "allow_null": true
                        },
                        "x_axis.name.show": {
                          "type": "boolean",
                          "default": true,
                          "allow_null": true
                        },
                        "x_axis.name.color": {
                          "type": "color",
                          "default": "#111111",
                          "min_length": null,
                          "max_length": null,
                          "regex": "#[\\dA-F][\\dA-F][\\dA-F][\\dA-F][\\dA-F][\\dA-F]",
                          "options": null,
                          "allow_null": true
                        },
                        "x_axis.name.font_family": {
                          "type": "string",
                          "default": "arial",
                          "min_length": null,
                          "max_length": null,
                          "regex": null,
                          "options": [
                            "arial",
                            "times",
                            "bold"
                          ],
                          "allow_null": true
                        },
                        "x_axis.name.font_weight": {
                          "type": "string",
                          "default": "normal",
                          "min_length": null,
                          "max_length": null,
                          "regex": null,
                          "options": [
                            "normal",
                            "bolder",
                            "bold"
                          ],
                          "allow_null": true
                        },
                        "x_axis.name.font_size": {
                          "type": "integer",
                          "default": 18,
                          "min_value": 8,
                          "max_value": 80,
                          "options": null,
                          "allow_null": true
                        },
                        "x_axis.name.offset": {
                          "type": "integer",
                          "default": 0,
                          "min_value": null,
                          "max_value": null,
                          "options": null,
                          "allow_null": true
                        },
                        "x_axis.label.show": {
                          "type": "boolean",
                          "default": null,
                          "allow_null": true
                        },
                        "x_axis.label.color": {
                          "type": "color",
                          "default": "#111111",
                          "min_length": null,
                          "max_length": null,
                          "regex": "#[\\dA-F][\\dA-F][\\dA-F][\\dA-F][\\dA-F][\\dA-F]",
                          "options": null,
                          "allow_null": true
                        },
                        "x_axis.label.font_family": {
                          "type": "string",
                          "default": "arial",
                          "min_length": null,
                          "max_length": null,
                          "regex": null,
                          "options": [
                            "arial",
                            "times",
                            "bold"
                          ],
                          "allow_null": true
                        },
                        "x_axis.label.font_weight": {
                          "type": "string",
                          "default": "normal",
                          "min_length": null,
                          "max_length": null,
                          "regex": null,
                          "options": [
                            "normal",
                            "bolder",
                            "bold"
                          ],
                          "allow_null": true
                        },
                        "x_axis.label.font_size": {
                          "type": "integer",
                          "default": 18,
                          "min_value": 8,
                          "max_value": 80,
                          "options": null,
                          "allow_null": true
                        },
                        "x_axis.label.position": {
                          "type": "string",
                          "default": null,
                          "min_length": null,
                          "max_length": null,
                          "regex": null,
                          "options": [
                            "top",
                            "bottom"
                          ],
                          "allow_null": true
                        },
                        "x_axis.label.offset": {
                          "type": "integer",
                          "default": 0,
                          "min_value": null,
                          "max_value": null,
                          "options": null,
                          "allow_null": true
                        },
                        "y_axis.type": {
                          "type": "string",
                          "default": null,
                          "min_length": null,
                          "max_length": null,
                          "regex": null,
                          "options": [
                            "value",
                            "category",
                            "time",
                            "log"
                          ],
                          "allow_null": true
                        },
                        "y_axis.show": {
                          "type": "boolean",
                          "default": null,
                          "allow_null": true
                        },
                        "y_axis.offset": {
                          "type": "integer",
                          "default": 0,
                          "min_value": null,
                          "max_value": null,
                          "options": null,
                          "allow_null": true
                        },
                        "y_axis.min": {
                          "type": "integer",
                          "default": null,
                          "min_value": null,
                          "max_value": null,
                          "options": null,
                          "allow_null": true
                        },
                        "y_axis.max": {
                          "type": "integer",
                          "default": null,
                          "min_value": null,
                          "max_value": null,
                          "options": null,
                          "allow_null": true
                        },
                        "y_axis.name.show": {
                          "type": "boolean",
                          "default": null,
                          "allow_null": true
                        },
                        "y_axis.name.color": {
                          "type": "color",
                          "default": null,
                          "min_length": null,
                          "max_length": null,
                          "regex": "#[\\dA-F][\\dA-F][\\dA-F][\\dA-F][\\dA-F][\\dA-F]",
                          "options": null,
                          "allow_null": true
                        },
                        "y_axis.name.font_family": {
                          "type": "string",
                          "default": "arial",
                          "min_length": null,
                          "max_length": null,
                          "regex": null,
                          "options": [
                            "arial",
                            "times",
                            "bold"
                          ],
                          "allow_null": true
                        },
                        "y_axis.name.font_weight": {
                          "type": "string",
                          "default": "normal",
                          "min_length": null,
                          "max_length": null,
                          "regex": null,
                          "options": [
                            "normal",
                            "bolder",
                            "bold"
                          ],
                          "allow_null": true
                        },
                        "y_axis.name.font_size": {
                          "type": "integer",
                          "default": 18,
                          "min_value": 8,
                          "max_value": 80,
                          "options": null,
                          "allow_null": true
                        },
                        "y_axis.name.offset": {
                          "type": "integer",
                          "default": 0,
                          "min_value": null,
                          "max_value": null,
                          "options": null,
                          "allow_null": true
                        },
                        "y_axis.label.show": {
                          "type": "boolean",
                          "default": null,
                          "allow_null": true
                        },
                        "y_axis.label.color": {
                          "type": "color",
                          "default": "#111111",
                          "min_length": null,
                          "max_length": null,
                          "regex": "#[\\dA-F][\\dA-F][\\dA-F][\\dA-F][\\dA-F][\\dA-F]",
                          "options": null,
                          "allow_null": true
                        },
                        "y_axis.label.font_family": {
                          "type": "string",
                          "default": "arial",
                          "min_length": null,
                          "max_length": null,
                          "regex": null,
                          "options": [
                            "arial",
                            "times",
                            "bold"
                          ],
                          "allow_null": true
                        },
                        "y_axis.label.font_weight": {
                          "type": "string",
                          "default": "normal",
                          "min_length": null,
                          "max_length": null,
                          "regex": null,
                          "options": [
                            "normal",
                            "bolder",
                            "bold"
                          ],
                          "allow_null": true
                        },
                        "y_axis.label.font_size": {
                          "type": "integer",
                          "default": 18,
                          "min_value": 8,
                          "max_value": 80,
                          "options": null,
                          "allow_null": true
                        },
                        "y_axis.label.position": {
                          "type": "string",
                          "default": null,
                          "min_length": null,
                          "max_length": null,
                          "regex": null,
                          "options": [
                            "top",
                            "bottom"
                          ],
                          "allow_null": true
                        },
                        "y_axis.label.offset": {
                          "type": "integer",
                          "default": 0,
                          "min_value": null,
                          "max_value": null,
                          "options": null,
                          "allow_null": true
                        },
                        "color_palette": {
                          "type": "list",
                          "max_len": null,
                          "list_key": null,
                          "variable": {
                            "type": "string",
                            "default": null,
                            "min_length": null,
                            "max_length": null,
                            "regex": "#[\\dA-F][\\dA-F][\\dA-F][\\dA-F][\\dA-F][\\dA-F]",
                            "options": null,
                            "allow_null": true
                          }
                        },
                        "marker.show": {
                          "type": "boolean",
                          "default": null,
                          "allow_null": true
                        },
                        "marker.color": {
                          "type": "color",
                          "default": null,
                          "min_length": null,
                          "max_length": null,
                          "regex": "#[\\dA-F][\\dA-F][\\dA-F][\\dA-F][\\dA-F][\\dA-F]",
                          "options": null,
                          "allow_null": true
                        },
                        "marker.symbol": {
                          "type": "string",
                          "default": "circle",
                          "min_length": null,
                          "max_length": null,
                          "regex": null,
                          "options": [
                            "circle",
                            "rect",
                            "roundRect",
                            "triangle",
                            "diamond",
                            "pin",
                            "arrow",
                            "none"
                          ],
                          "allow_null": true
                        },
                        "marker.size": {
                          "type": "integer",
                          "default": 2,
                          "min_value": null,
                          "max_value": null,
                          "options": null,
                          "allow_null": true
                        },
                        "label.show": {
                          "type": "boolean",
                          "default": null,
                          "allow_null": true
                        },
                        "label.color": {
                          "type": "color",
                          "default": "#111111",
                          "min_length": null,
                          "max_length": null,
                          "regex": "#[\\dA-F][\\dA-F][\\dA-F][\\dA-F][\\dA-F][\\dA-F]",
                          "options": null,
                          "allow_null": true
                        },
                        "label.font_family": {
                          "type": "string",
                          "default": "arial",
                          "min_length": null,
                          "max_length": null,
                          "regex": null,
                          "options": [
                            "arial",
                            "times",
                            "bold"
                          ],
                          "allow_null": true
                        },
                        "label.font_weight": {
                          "type": "string",
                          "default": "normal",
                          "min_length": null,
                          "max_length": null,
                          "regex": null,
                          "options": [
                            "normal",
                            "bolder",
                            "bold"
                          ],
                          "allow_null": true
                        },
                        "label.font_size": {
                          "type": "integer",
                          "default": null,
                          "min_value": null,
                          "max_value": null,
                          "options": [
                            6,
                            7,
                            8,
                            9,
                            10,
                            11,
                            12,
                            13,
                            14,
                            15,
                            16,
                            18,
                            20,
                            24,
                            30
                          ],
                          "allow_null": true
                        },
                        "label.position": {
                          "type": "string",
                          "default": null,
                          "min_length": null,
                          "max_length": null,
                          "regex": null,
                          "options": [
                            "top",
                            "bottom"
                          ],
                          "allow_null": true
                        },
                        "label.offset": {
                          "type": "integer",
                          "default": 0,
                          "min_value": null,
                          "max_value": null,
                          "options": null,
                          "allow_null": true
                        },
                        "line_style.color": {
                          "type": "color",
                          "default": null,
                          "min_length": null,
                          "max_length": null,
                          "regex": "#[\\dA-F][\\dA-F][\\dA-F][\\dA-F][\\dA-F][\\dA-F]",
                          "options": null,
                          "allow_null": true
                        },
                        "line_style.width": {
                          "type": "integer",
                          "default": 2,
                          "min_value": null,
                          "max_value": null,
                          "options": null,
                          "allow_null": true
                        },
                        "line_style.line_type": {
                          "type": "string",
                          "default": "solid",
                          "min_length": null,
                          "max_length": null,
                          "regex": null,
                          "options": [
                            "solid",
                            "dashed",
                            "dotted"
                          ],
                          "allow_null": true
                        },
                        "area_style.color": {
                          "type": "color",
                          "default": null,
                          "min_length": null,
                          "max_length": null,
                          "regex": "#[\\dA-F][\\dA-F][\\dA-F][\\dA-F][\\dA-F][\\dA-F]",
                          "options": null,
                          "allow_null": true
                        },
                        "area_style.opacity": {
                          "type": "float",
                          "default": null,
                          "min_value": 0,
                          "max_value": 1,
                          "allow_null": true
                        }
                      }
                    }
                  }
                }
              ],
              "type": "class",
              "methods": [
                {
                  "name": "_update",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "d",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "u",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "create_chart_options",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "data",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "front_end",
                      "default": "echarts.py",
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "fill_paths",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "template",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "get_template_path",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "path",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "set_path",
                  "parameters": [
                    {
                      "name": "obj",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "path",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "value",
                      "default": null,
                      "dtype": null
                    }
                  ]
                },
                {
                  "name": "update",
                  "parameters": [
                    {
                      "name": "self",
                      "default": null,
                      "dtype": null
                    },
                    {
                      "name": "second_template",
                      "default": null,
                      "dtype": null
                    }
                  ]
                }
              ]
            },
            "group_name": "Template",
            "group_cd": 3000,
            "type_cd": 310000,
            "type_name": "Template"
          }
        ]
      },
      "Test Category": {
        "category_cd": 9,
        "children": [
          {
            "function": {
              "name": "test_all_parameters",
              "parameters": [
                {
                  "name": "data",
                  "default": null,
                  "dtype": {
                    "type": "dataset",
                    "df_count": 1,
                    "allow_null": true
                  }
                },
                {
                  "name": "column_list",
                  "default": null,
                  "dtype": {
                    "type": "list",
                    "max_len": 20,
                    "list_key": null,
                    "variable": {
                      "type": "column_pair",
                      "names": [
                        "left",
                        "right"
                      ],
                      "data_index": null,
                      "allow_null": true
                    }
                  }
                },
                {
                  "name": "column",
                  "default": null,
                  "dtype": {
                    "type": "column",
                    "data_index": null,
                    "allow_multiple": true,
                    "allow_null": true
                  }
                },
                {
                  "name": "string_list",
                  "default": null,
                  "dtype": {
                    "type": "list",
                    "max_len": null,
                    "list_key": 1,
                    "variable": {
                      "type": "string",
                      "default": null,
                      "min_length": null,
                      "max_length": null,
                      "regex": null,
                      "options": null,
                      "allow_null": true
                    }
                  }
                },
                {
                  "name": "string",
                  "default": null,
                  "dtype": {
                    "type": "string",
                    "default": null,
                    "min_length": null,
                    "max_length": null,
                    "regex": null,
                    "options": null,
                    "allow_null": true
                  }
                },
                {
                  "name": "integer_number",
                  "default": null,
                  "dtype": {
                    "type": "integer",
                    "default": null,
                    "min_value": null,
                    "max_value": null,
                    "options": null,
                    "allow_null": true
                  }
                },
                {
                  "name": "float_number",
                  "default": null,
                  "dtype": {
                    "type": "float",
                    "default": null,
                    "min_value": null,
                    "max_value": null,
                    "allow_null": true
                  }
                }
              ],
              "type": "function"
            },
            "group_name": "Test Group",
            "group_cd": 9000,
            "type_cd": 900001,
            "type_name": "Test ALL"
          }
        ]
      }
    }
  }
}


