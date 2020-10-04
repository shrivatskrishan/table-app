import { tableData } from "../constant";
const intialState = {
    patientData:[]
};

export const tableDataReducer = (state = intialState, action) => {
  switch (action.type) {
    case tableData.TABLE_ALL_DATA:
      return {
        ...state,
        patientData: action.res ? action.res:state.patientData,
      };
    case tableData.SAVE_DATA_SUCCESSFULY:
      return {
        ...state,
        patientData: action.res,
      };
    case tableData.DELETE_DATA_SUCCESSFULY:
      return {
        ...state,
        patientData: action.res,
      };
      case tableData.SHEARCH_DATA_SUCCESSFULY:
      return {
        ...state,
        patientData: action.res,
      };
      case tableData.PAGINATION_DATA:
        return {
          ...state,
          patientData: action.res,
        };
      
    default:
      return state;
  }
};
