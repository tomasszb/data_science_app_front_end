const LOAD_PROCESS_CD = 100;
const DATA_PREPARATION_PROCESS_CD = 101;
const EXPORT_PROCESS_CD = 102;
const DATA_VIS_PROCESS_CD = 103;


export default {
  projectObjectSettings: {
    [LOAD_PROCESS_CD]: {'sideIcon': 'flaticon-database-1', 'link': 'conn'},
    [DATA_PREPARATION_PROCESS_CD]: {'sideIcon': 'flaticon-server-1', 'link': 'prep'},
    [EXPORT_PROCESS_CD]: {'sideIcon': 'flaticon-upload', 'link': 'export'},
    [DATA_VIS_PROCESS_CD]: {'sideIcon': 'flaticon-database-1', 'link': 'vis'},
  }
};
