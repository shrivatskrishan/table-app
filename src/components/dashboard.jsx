import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputBase from '@material-ui/core/InputBase';
import PaginateComponent from './pagination'
import { connect } from "react-redux";
import ReactFileReader from 'react-file-reader'
import {genrateGuid} from '../healper/genrateGuid'
import {patientDataDetail} from '../action'

class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      offset: 0,
      perPage: 5,
      currentPage: 0,
      pageCount:0,
      uptoData:5,
      open: false,
      rows: JSON.parse(localStorage.getItem("pateintDetail")),
      user: {},
    };
  }

  componentDidMount=()=>{
    const { dispatch } = this.props;
    dispatch(patientDataDetail.getAllPateientData(this.state.offset,this.state.perPage))
  }

  handlaeChangeDailog = (event) => {
    let { user } = this.state;
    let userDetail = Object.assign({
      ...user,
      [event.target.name]: event.target.value,
    });
    this.setState({
      user: userDetail,
    });
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  addPatient = () => {
    const { dispatch } = this.props;
    let { user } = this.state;
    user.id=genrateGuid()
    dispatch(patientDataDetail.savePatientDetail(user))
    this.handleClose()
  };

  searchValue =(event)=>{
    const { dispatch } = this.props;
    dispatch(patientDataDetail.searchPationet(event.target.value,this.state.offset,this.state.uptoData))
  }

  deletePatient =(id)=>{
    const { dispatch } = this.props;
    dispatch(patientDataDetail.deletePatientData(id,this.state.offset,this.state.uptoData))
  }
  

  changePage =(offset,perpageData,perPage,currentPage)=>{
    const { dispatch } = this.props;
    dispatch(patientDataDetail.getAllPateientData(offset,perpageData))
    this.setState({offset,currentPage,uptoData:perpageData,perPage})
  }

  handleFiles = files => {
    const { dispatch } = this.props;
    dispatch(patientDataDetail.readFile(files,this.state.offset,this.state.perPage))
   
  }

  render() {
    const { open } = this.state;
    const {patientData}=this.props
    return (
      <>
        <div>
          <div style={{display: "flex", padding: "10px"}}> 
          <Button
            variant="outlined"
            color="primary"
            onClick={() => this.handleClickOpen()}
          >
            Add New Patien
          </Button>
          <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
          <Button style={{width: "157px", background: "lightblue"}}>Upload</Button>
          </ReactFileReader>
          </div>
          <div style={{textAlign:"end"}}>
          <InputBase
              style={{borderBottom:"solid"}}
                autoFocus 
                placeholder="Search…"
                margin="dense"
                id="search"
                onChange={(event) => this.searchValue(event)}
                
              />
          </div>
        
          <Dialog
            open={open}
            onClose={() => this.handleClose()}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add Patient</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="text"
                onChange={(event) => this.handlaeChangeDailog(event)}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="email"
                label="Email Address"
                type="email"
                onChange={(event) => this.handlaeChangeDailog(event)}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="age"
                name="age"
                label="Age"
                type="number"
                onChange={(event) => this.handlaeChangeDailog(event)}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="gender"
                name="gender"
                label="Gender"
                type="text"
                onChange={(event) => this.handlaeChangeDailog(event)}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleClose()} color="primary">
                Cancel
              </Button>
              <Button onClick={() => this.addPatient()} color="primary">
                Add Patient
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow style={{background:'black', color:'white'}}>
                <TableCell style={{color:'white',fontWeight:'bold'}} >Name</TableCell>
                <TableCell  style={{color:'white',fontWeight:'bold'}} align="right">Email</TableCell>
                <TableCell style={{color:'white',fontWeight:'bold'}} align="right">Age</TableCell>
                <TableCell style={{color:'white',fontWeight:'bold'}} align="right">Gender</TableCell>
                <TableCell style={{color:'white',fontWeight:'bold'}} align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patientData.map((row,index) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.age}</TableCell>
                  <TableCell align="right">{row.gender}</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="secondary" onClick={()=>this.deletePatient(row.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {patientData.length>0 && <div style={{position: "absolute",right: '11px',padding: "14px"}}>
           <PaginateComponent perpageData={patientData} totalData={JSON.parse(localStorage.getItem("pateintDetail"))} paginateData={this.changePage}/>
        </div>
          
        }
       
      </>
    );
  }
}
function mapStateToProps(state) {
  const { patientData } = state.tableDataReducer;
  return {
    patientData
  };
}
export default connect(mapStateToProps)(DashBoard);
