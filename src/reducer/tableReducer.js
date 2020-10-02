import  {tableData} from '../constant'
const intialState=[];

export const tableDataReducer =(state=intialState,action)=>{
    switch(action.type){
        case tableData.TABLE_ALL_DATA :
        return ({
            ...state,
            tableAllData:action
        })
        
        default  :return state;
    }

}