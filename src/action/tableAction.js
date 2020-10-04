import { tableData } from "../constant";
import { genrateGuid } from "../healper/genrateGuid";

const getAllPateientData = (offset,perpageData) => {
  return (dispatch, getState) => {
    const getPatientData = JSON.parse(localStorage.getItem("pateintDetail"));
     let getPaginationData=getAllpaginationData(offset,perpageData,getPatientData)
    return dispatch(success(getPaginationData));
  };
  function success(res) {
    return { type: tableData.TABLE_ALL_DATA, res };
  }
};

const savePatientDetail = (patientData) => {
  return (dispatch, getState) => {
    let getPatientData = JSON.parse(localStorage.getItem("pateintDetail"));
    getPatientData = getPatientData ? getPatientData : [];
    getPatientData.unshift(patientData);
    localStorage.setItem("pateintDetail", JSON.stringify(getPatientData));
    let getPaginationData=getAllpaginationData(0,5,getPatientData)
    return dispatch(success(getPaginationData));
  };
  function success(res) {
    return { type: tableData.SAVE_DATA_SUCCESSFULY, res };
  }
};

const searchPationet = (value,offset,perpageData) => {
  return (dispatch, getState) => {
    let getPatientData = JSON.parse(localStorage.getItem("pateintDetail"));
    const searchData = getPatientData.filter((item) => {
      return Object.keys(item).some((key) =>
        item[key].toString().toLowerCase().includes(value.toLowerCase())
      );
    });
    return dispatch(success(searchData));
  };
  function success(res) {
    return { type: tableData.SHEARCH_DATA_SUCCESSFULY, res };
  }
};

const deletePatientData = (id,offset,perpageData) => {
  return (dispatch, getState) => {
    const getPatientData = JSON.parse(localStorage.getItem("pateintDetail"));
    getPatientData.splice(
      getPatientData.findIndex((x) => x.id === id),
      1
    );
    localStorage.setItem("pateintDetail", JSON.stringify(getPatientData));
    let getPaginationData=getAllpaginationData(offset,perpageData,getPatientData)
    return dispatch(success(getPaginationData));
  };
  function success(res) {
    return { type: tableData.DELETE_DATA_SUCCESSFULY, res };
  }
};

const readFile = (files,offset,perpageData) => {
  return (dispatch, getState) => {
    var reader = new FileReader();
    reader.onload = (e) => {
      let fileData = reader.result.split("\n");
      let data = [];
      fileData.forEach((element, index) => {
        if (index) {
          const elementRaw = element.split(",");
          if (element) {
            let param = {
              id: genrateGuid(),
              name: elementRaw[0],
              email: elementRaw[1],
              age: elementRaw[2],
              gender: elementRaw[3],
            };
            data.push(param);
          }
        }
      });

      localStorage.setItem("pateintDetail", JSON.stringify(data));
      let getPaginationData=getAllpaginationData(offset,perpageData,data)
      return dispatch(success(getPaginationData));
    };
    reader.readAsText(files[0]);
  };
  function success(res) {
    return { type: tableData.TABLE_ALL_DATA, res };
  }
};
const getAllpaginationData=(offset,perpageData,getPatientData)=>{
    if(getPatientData){
        return getPatientData.slice(offset,perpageData)
    }
   
}
const paginationData =(offset,perpageData,getPatientData)=>{
    return (dispatch, getState) => {
         let getPaginationData=getPatientData.slice(offset,perpageData)
        return dispatch(success(getPaginationData));
      };
      function success(res) {
        return { type: tableData.PAGINATION_DATA};
      }
}
export const patientDataDetail = {
  getAllPateientData,
  savePatientDetail,
  deletePatientData,
  searchPationet,
  readFile,
  paginationData
};
