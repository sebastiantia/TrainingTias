import React from "react";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import EditExercises from "./components/edit-exercises.component";
import ExerciseList from "./components/exercises-list.component";
import CreateExercises from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import Navbar from "./components/Navbar.component";
function App() {
  return (
      <div className="container">
    <Navbar />
      <Routes>
          

        <Route path="/" element={<ExerciseList />} />
        <Route path="/edit/:id" element={< EditExercises />} />
        <Route path="/create" element={<CreateExercises />} />
        <Route path="/user" element={<CreateUser />} />
      </Routes>

    </div>

  );
}

export default App;
