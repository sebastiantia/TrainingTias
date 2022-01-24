import React, { Component } from "react";

import axios from 'axios';

class CreateUser extends Component {
  constructor(props){
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      //state is how you create variables in react, you are never gonna do: let name = 'beau':
      //In React you are always going to create everything in STATE so that React will auto update with new values.
      username: "",
    }; 
  }

    onChangeUsername(e) {
      this.setState({
        username: e.target.value, //the target is the text-box, and .value is the value of the textbox
        //this sets username to value in the textbox 'target'
        //it's not going to replace state with just this, it just updates username element within the state.
      });
    }
    async onSubmit(e) {
      e.preventDefault(); //this will prevent the default HTML form submit behavior
      const user = {
        username: this.state.username,
      };

      console.log(user);

      //NOW WE ARE GOING TO SEND USER DATA TO OUR BACKEND
      try{
        const post = await axios.post('http://localhost:4000/users/add', user) //.post sends a http post request to the end point which is the url
        //endpoint is expecting a json body which is why we are sending user
        console.log(post.data); //.data is how you access the body of a request
      } catch(e){
        console.log(e);
      }

      
      // <Navigate to="/"/>
      //after exercise has been submitted
      // window.location = "/"; // this is how you return the user to a specific page


      this.setState({
        username: ""
      })
  
    }

  
 
  

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input type='text' className="form-control" value={this.state.username} onChange={this.onChangeUsername} />
          </div>
          <div className="form-group">
            <input type='submit' value='Create User' className="btn btn-primary"/>
          </div>
        </form>
      </div>
    );
  }
}
export default CreateUser