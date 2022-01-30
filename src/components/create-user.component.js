import React, { useState, Component } from "react";

import axios from "axios";
import "./createuser.css";


const CreateUser = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div>
      <div className="card">
        <div id="outerDivWrapper">
          <div id="outerDiv ">
            <form onSubmit={async (e) => {
              e.preventDefault()
              try {
                const post = await axios.post("http://localhost:4000/users/add", {
                  username,
                  password
                }); //.post sends a http post request to the end point which is the url
                //endpoint is expecting a json body which is why we are sending user
                console.log(post.data); //.data is how you access the body of a request
              } catch (e) {
                console.log(e);
              }
              setUsername("");
              setPassword("");
          
            }}>
              <div className="test">
                <label display="flex">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                  marginBottom="1em"
                />
                <label display="flex">Password:</label>
                <input
                  type="text"
                  className="form-control"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  marginBottom="1em"
    
                />
              </div>
              <div style={{marginTop:'1em'}}>
                <button className='btn btn-primary'> 
                  Create user
                </button>
              </div>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;

// class CreateUser extends Component {
//   constructor(props) {
//     super(props);

//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//     this.state = {
//       //state is how you create variables in react, you are never gonna do: let name = 'beau':
//       //In React you are always going to create everything in STATE so that React will auto update with new values.
//       username: "",
//     };
//   }

//   onChangeUsername(e) {
//     this.setState({
//       username: e.target.value, //the target is the text-box, and .value is the value of the textbox
//       //this sets username to value in the textbox 'target'
//       //it's not going to replace state with just this, it just updates username element within the state.
//     });
//   }
//   async onSubmit(e) {
//     e.preventDefault(); //this will prevent the default HTML form submit behavior
//     const user = {
//       username: this.state.username,
//     };

//     console.log(user);

//     //NOW WE ARE GOING TO SEND USER DATA TO OUR BACKEND
//     try {
//       const post = await axios.post("http://localhost:4000/users/add", user); //.post sends a http post request to the end point which is the url
//       //endpoint is expecting a json body which is why we are sending user
//       console.log(post.data); //.data is how you access the body of a request
//     } catch (e) {
//       console.log(e);
//     }

//     // <Navigate to="/"/>
//     //after exercise has been submitted
//     // window.location = "/"; // this is how you return the user to a specific page

//     this.setState({
//       username: "",
//     });
//   }

//   render() {
//     return (
//       <div>
//         <div className="card">
//           <div id="outerDivWrapper">
//             <div id="outerDiv ">
//               <form onSubmit={this.onSubmit}>
//                 <div className="test">
//                   <label display="flex">Username:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={this.state.username}
//                     onChange={this.onChangeUsername}
//                     marginBottom="1em"
//                   />
//                 </div>
//                 <div style={{marginTop:'1em'}}>
//                   <input
//                     type="submit"
//                     value="Create User"
//                     className="btn btn-primary"
//                   />
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// export default CreateUser;
