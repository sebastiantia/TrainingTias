import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

import "./exercises-list.component.css";

const Exercise = (props) => {
  return (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0, 10)}</td>

      <td>
        <Link to={"/edit/" + props.exercise._id}>
          <EditIcon />{" "}
        </Link>{" "}
        |
        <DeleteIcon
          color="red.500"
          mr="2"
          onClick={() => props.deleteExercise(props.exercise._id)}
        />
      </td>
    </tr>
  );
};

class ExerciseList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);
    //intitalize the state
    this.state = {
      exercises: [],
    };
  }

  async componentDidMount() {
    const response = await axios.get("http://localhost:4000/exercises");
    try {
      this.setState({
        exercises: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteExercise(id) {
    const response = await axios.delete(
      "http://localhost:4000/exercises/" + id
    );
    console.log(response);
    this.setState({
      // _id is automatically created by MongoDB with creating objects
      exercises: this.state.exercises.filter((el) => el._id !== id), //for every elemtn in the exercises array, return as long as el._id  != id
    });
  }

  exerciseList() {
    return this.state.exercises.map((exercise) => {
      return (
        <Exercise
          exercise={exercise}
          deleteExercise={this.deleteExercise}
          key={exercise._id}
        />
      );
      console.log(exercise);
    });
  }

  footer() {
    if (this.exerciseList() != null) {
      return (
        <>
          <Th>Username</Th>
          <Th>Description</Th>
          <Th>Duration</Th>
          <Th>Date</Th>
          <Th>Actions</Th>
        </>
      );
    } else {
      return " ";
    }
  }

  render() {
    return (
      <container className="container">
        <div className="card">
          <div id="outerDivWrapper">
            <div id="outerDiv">
              <div id="scrollableContent">
                <h3>
                  <Table variant="striped" colorScheme="teal" className="table">
                    <TableCaption>
                      {" "}
                      "EAT CLEAN, STAY FIT, AND HAVE A BURGER TO STAY
                      SANE."—GIGI HADID
                    </TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Username</Th>
                        <Th>Description</Th>
                        <Th>Duration</Th>
                        <Th>Date</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>{this.exerciseList()}</Tbody>
                    <Tfoot>
                      <Tr>{this.footer()}</Tr>
                    </Tfoot>
                  </Table>

                  {/* <table className="table">
    <thead className="thead-light">
      <tr>
        <th>Username</th>
        <th>Description</th>
        <th>Duration</th>
        <th>Date</th>
        <th>Actions</th>
      </tr>

    </thead>
    <tbody>
      {this.exerciseList()}
    </tbody>
  </table> */}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </container>
    );
  }
}

export default ExerciseList;
