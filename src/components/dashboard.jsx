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
import ReactFileReader from 'react-file-reader'

class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      rows: [],
      user: {},
    };
  }

  componentDidMount=()=>{
    let patientData=JSON.parse(localStorage.getItem('pateintDetail'));
    if(patientData){
      this.setState({
        rows: patientData
      });
    }
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
    let { user } = this.state;
    let rows =JSON.parse(localStorage.getItem('pateintDetail'));
    rows=rows?rows:[]
    rows.push(user)
    localStorage.setItem('pateintDetail', JSON.stringify(rows)); 
    this.setState({
      open: false,
      rows 
    });
    this.changePage(0,5)
  };

  searchValue =(event)=>{
    let rowsData =JSON.parse(localStorage.getItem('pateintDetail'));
    const searchData = rowsData.filter(item => {
      return Object.keys(item).some(key =>
        item[key].toString().toLowerCase().includes(event.target.value.toLowerCase())
      );
    });
    this.setState({
      rows :searchData
    });

  }

  deletePatient =(index)=>{
    let {rows}=this.state;
    rows.splice(index, 1);
    this.setState({
      rows
    });
    localStorage.setItem('pateintDetail', JSON.stringify(rows)); 
  }

  changePage =(offset,perpageData)=>{
    let rowsData =JSON.parse(localStorage.getItem('pateintDetail'));
    const perPageValue = rowsData.slice(offset,perpageData)
    this.setState({rows:perPageValue})
  }
  handleFiles = files => {
    var reader = new FileReader();
    reader.onload = function(e) {
        // Use reader.result
        alert(reader.headers)
    }
    reader.readAsText(files[0]);
    console.log(files[0])
}


  render() {
    const { rows, open } = this.state;
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
              {rows.map((row,index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.age}</TableCell>
                  <TableCell align="right">{row.gender}</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="secondary" onClick={()=>this.deletePatient(index)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {rows.length>0 && <div style={{position: "absolute",right: '11px',padding: "14px"}}>
           <PaginateComponent totalData={rows} paginateData={this.changePage}/>
        </div>
          
        }
       
      </>
    );
  }
}
export default DashBoard;
