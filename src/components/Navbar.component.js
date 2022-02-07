import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.component.css'

class Navbar extends Component {
  render() {

    return (
      <nav >
        <a>
           <Link to="/" className="navbar-brand">
          ExcerTracker
        </Link>

        </a>
       
        <div>
          <ul>
            <li>
              <Link to="/" style={{textDecoration:"none"}}>
                Exercises
              </Link>
            </li>
            <li >
              <Link to="/create" >
                Create Exercise Log
              </Link>
            </li>
            <li >
              <Link to="/user" >
                Create User
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;