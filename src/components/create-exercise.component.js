import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {Modal} from './Modal.js';


import './create-exercise.component.css'

//this will allow us to add exercises to our database

class CreateExercises extends Component {
  constructor(props) {
    //in js classes you always need to call constructor when defining the constructor of a subclass
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);

    this.state = {
      //state is how you create variables in react, you are never gonna do: let name = 'beau':
      //In React you are always going to create everything in STATE so that React will auto update with new values.
      username: "",
      password: "",
      error:"",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
      show: false,
    }; //now we need to add methods to update the state properties...
  }

  async componentDidMount() {
    //this is a component life cycle methood
    //componentDidMount will be called before anything LOADS on the page...
    const req = await axios.get("http://localhost:4000/users/");
    console.log(req.data);
    

    if(req.data.length > 0){
      this.setState({
        users: req.data.map(user => user.username),
        username: req.data[0].username
      })

    }

  }

  showModal() {
    this.setState({ show: true });
  };

  hideModal() {
    this.setState({ show: false });
  };


  onChangeUsername(e) {
    this.setState({
      username: e.target.value, //the target is the text-box, and .value is the value of the textbox
      //this sets username to value in the textbox 'target'
      //it's not going to replace state with just this, it just updates username element within the state.
    });
  }

  onChangePassword(e){
    this.setState({
      password: e.target.value,
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }
  //we use a calendar library
  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }
  //handling the submit button

  async onSubmit(e) {

    e.preventDefault(); //this will prevent the default HTML form submit behavior
    
    this.showModal();

    const exercise = {
      username: this.state.username,
      error: this.state.error,
      password: this.state.password,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    console.log(exercise);
    try {
      const post = await axios.post(
        "http://localhost:4000/exercises/add",
        exercise
      );
      console.log(post.data);
      this.setState({
        error: post.data
    }) 
    } catch (e) {
      console.log(e);
    }



    

    // <Navigate to="/"/>
    //after exercise has been submitted
    // window.location = "/"; // this is how you return the user to a specific page
  }

  render() {
    return (

    
      <div>
        <Modal show={this.state.show} handleClose={this.hideModal}>
        <p>{this.state.error}</p>
      </Modal>
        <container className="container">
        
        <div className="card">

          <div id="outerDivWrapper">
            <div id="outerDiv">
              <div id="scrollableContent">
        
        <h3 style={{marginBottom:"1em"}}><b>Create New Exercise Log</b></h3>
        
        <form onSubmit={this.onSubmit} >
        
          {/* when you submit you call this.onSubmit */}
          <div className="form-group">
            <label>Username:</label>
            <select
              ref="userInput"
              // This is a drop down menu
              required
              className="form-control"
              value={this.state.username} //we are setting the value to this.state.username
              onChange={this.onChangeUsername} // we are ssetting onChange to the function
            > 
              
              {/* The curly braces means we are doing js!
              this.state.users is an array of all the users that will come from MongoDB and map lets us
              return something for each member of array */}
              {this.state.users.map((user) => (
                // An option is literally an option from a select box
                //we have a key which is the user, a value which is the user, and the actual text that will actually appear which is user.
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input 
            type="text"
            required
            className="form-control"
            value={this.state.password}
            onChange={this.onChangePassword}
            /> 
          </div>
          
          <div className="form-group">
            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
              />
            </div>
            <label>Duration (in minutes):</label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div marginBottom={4}>
            <label >Date: </label>
            <div>
              <DatePicker //DatePicker conponent is going to pop up a calendar where you can select an actual date
                selected={this.state.date}
                onChange={this.onChangeDate}
                display={"flex"}
              />
            </div>
          </div>
          <div className="form-group"  >
            <input
              type="submit"
              value="Create Exercise Log"
              className="btn btn-primary"
              style={{marginTop: "1em"}}
            />
            
          </div>
        </form>
        </div>
            </div>
          </div>
        </div>
      </container>
      </div>
    );
  }
}

export default CreateExercises;
