import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {history} from '../healper/history';
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
        user:{}
    };
  }
  handlaeChange =(event)=>{
    let {user}=this.state
    let userDetail=Object.assign({ ...user, [event.target.name]: event.target.value })
    this.setState({
        user: userDetail
      });
  }
  loginUser =()=>{
      let {user}=this.state;
    let userData=JSON.parse(localStorage.getItem('user'));
    if(user.userName===userData.userName && user.passeord===userData.passeord){
      history.push(`/dashboard`)
    }
  }

  render() {
   
    return (
      <div style={{textAlign: "center", padding: "240px"}}>
          <div >
            <TextField style={{width:"260px"}}  id="standard-error" name='userName' onChange={(event)=>this.handlaeChange(event)} label="User Name" />
           <div>
            <TextField
              style={{width:"260px",marginTop: "9px",
              marginBottom: '14px'}}
              type="password"
              id="standard-error"
              name='passeord'
              label="Password"
              onChange={(event)=>this.handlaeChange(event)}
            />
            </div>
          </div>
        <Button style={{width:"156px"}} variant="contained" color="primary" onClick={()=>this.loginUser()}>
          Login
        </Button>
      </div>
    );
  }
}
