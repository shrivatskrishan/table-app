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
  handlaeChange = (event) => {
    let {user}=this.state
    let userDetail=Object.assign({ ...user, [event.target.name]: event.target.value })
    this.setState({
        user: userDetail
      });
  };
  signupUser = () => {
      let {user}=this.state
      if(user.hasOwnProperty("userName")){
        if(user.newPassword===user.confirmPassword){
            let userData={};
            userData.userName=user.userName;
            userData.passeord=user.newPassword;
           localStorage.setItem('user', JSON.stringify(userData)); 
           history.push(`/dashboard`)
        }else{
            alert("pswrd not match")
        }    
      }
     
  };

  render() {
    return (
      <div  style={{textAlign: "center", padding: "240px"}}>
        <div>
          <TextField
            style={{width:"260px"}}
            id="standard-error"
            name='userName'
            onChange={(event) => this.handlaeChange(event)}
            label="User Name"
          />
        </div>
        <div>
          <TextField
          style={{width:"260px",marginTop: "9px"
          }}
            type="password"
            id="standard-error"
            label="New Password"
            name="newPassword"
            onChange={(event) => this.handlaeChange(event)}
          />
        </div>
        <div>
          <TextField
          style={{width:"260px",marginTop: "9px",
           marginBottom: '14px'}}
            type="password"
            id="standard-error"
            label="Confirm Password"
            name="confirmPassword"
            onChange={(event) => this.handlaeChange(event)}
          />
        </div>
        <Button
          style={{width:"156px"}}
          variant="contained"
          color="primary"
          onClick={() => this.signupUser()}
        >
          Signup
        </Button>
      </div>
    );
  }
}
