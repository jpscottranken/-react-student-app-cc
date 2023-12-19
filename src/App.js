import "bootstrap/dist/css/bootstrap.min.css";
import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";
import _ from "lodash";

import "./App.css";
import "./Components/Student.css";

import Student from "./Components/Student";
import AddStudent from "./Components/AddStudent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function App() {
  //  React hooks
  const [allStudents, setAllStudents] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [keywords, setKeywords] = useState("");
  const [gradYear, setGradYear] = useState("");

  //  Seed data
  const students = [
    {
      id: nanoid(),
      firstName: "Ruby",
      lastName: "Tabrett",
      email: "rtabrett0@pagesperso-orange.fr",
      image: "images/student1.jpg",
      gradYear: 2020,
    },
    {
      id: nanoid(),
      firstName: "Damien",
      lastName: "Demongeot",
      email: "ddemongeot1@redcross.org",
      image: "images/student2.jpg",
      gradYear: 2020,
    },
    {
      id: nanoid(),
      firstName: "Rasia",
      lastName: "Sinnock",
      email: "rsinnock2@skype.com",
      image: "images/student3.jpg",
      gradYear: 2022,
    },
    {
      id: nanoid(),
      firstName: "Horatio",
      lastName: "Sea",
      email: "hsea3@google.de",
      image: "images/student4.jpg",
      gradYear: 2022,
    },
    {
      id: nanoid(),
      firstName: "Lezley",
      lastName: "Ferrari",
      email: "lferrari4@umich.edu",
      image: "images/student5.jpg",
      gradYear: 2024,
    },
    {
      id: nanoid(),
      firstName: "Virge",
      lastName: "Singh",
      email: "vsingh5@typepad.com",
      image: "images/student6.jpg",
      gradYear: 2024,
    },
    {
      id: nanoid(),
      firstName: "Stillman",
      lastName: "Hyndman",
      email: "shyndman6@nature.com",
      image: "images/student7.jpg",
      gradYear: 2026,
    },
    {
      id: nanoid(),
      firstName: "Suzy",
      lastName: "Heinle",
      email: "sheinle7@behance.net",
      image: "images/student8.jpg",
      gradYear: 2026,
    },
    {
      id: nanoid(),
      firstName: "Carine",
      lastName: "Willison",
      email: "cwillison8@bigcartel.com",
      image: "images/student9.jpg",
      gradYear: 2028,
    },
    {
      id: nanoid(),
      firstName: "Mora",
      lastName: "Glover",
      email: "mglover9@jigsy.com",
      image: "images/student10.jpg",
      gradYear: 2028,
    },
  ];

  useEffect(() => {
    saveStudents(students);
  }, []);

  const saveStudents = (students) => {
    setAllStudents(students);
    setSearchResults(students);
  };

  const searchStudents = () => {
    let keywordsArray = [];

    if (keywords) {
      keywordsArray = keywords.toLowerCase().split(" ");
    }

    if (gradYear) {
      keywordsArray.push(gradYear.toString());
    }

    if (keywordsArray.length > 0) {
      const searchResults = allStudents.filter((student) => {
        for (const word of keywordsArray) {
          if (
            student.firstName.toLowerCase().includes(word) ||
            student.lastName.toLowerCase().includes(word) ||
            student.gradYear === parseInt(word)
          ) {
            return true;
          }
        }
        return false;
      });

      setSearchResults(searchResults);
    } else {
      setSearchResults(allStudents);
    }
  };

  //  Called to add a new student
  const addStudent = (newStudent) => {
    const updatedStudents = [...allStudents, newStudent];
    saveStudents(updatedStudents);
  };

  //  Called to remove an existing student
  const removeStudent = (studentToDelete) => {
    const updatedStudentsArray = allStudents.filter(
      (student) => student.id !== studentToDelete.id
    );
    saveStudents(updatedStudentsArray);
  };

  const updateStudent = (updatedStudent) => {
    const updatedStudentsArray = allStudents.map((student) =>
      student.id === updatedStudent.id
        ? { ...student, ...updatedStudent }
        : student
    );

    saveStudents(updatedStudentsArray);
  };

  return (
    <div className='container'>
      <div className='row' id='currentStudents'>
        <h3 id='currentStudentHeader'>Current Students</h3>
        {searchResults &&
          searchResults.map((student) => (
            <div className='col-lg-2' key={student.id}>
              <Student
                student={student}
                removeStudent={removeStudent}
                updateStudent={updateStudent}
              />
            </div>
          ))}
      </div>

      <AddStudent addStudent={addStudent} />

      <div className='row mt-4' id='searchStudent'>
        <h3 id='searchStudentHeader'>Search For Student</h3>
        <div className='col-md-4'>
          <label htmlFor='txtKeywords'>Search by First Name or Last Name</label>
          <input
            type='text'
            className='form-control'
            placeholder='Name here'
            onChange={(evt) => setKeywords(evt.currentTarget.value)}
            value={keywords}
          />
        </div>

        <div className='col-md-4'>
          <label htmlFor='txtKeywords'>Search by Graduation Year</label>
          <select
            value={gradYear}
            className='form-select'
            onChange={(evt) => setGradYear(evt.currentTarget.value)}
          >
            <option value=''>Select Grad Year</option>
            {_(allStudents)
              .map((student) => student.gradYear)
              .sort()
              .uniq()
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))
              .value()}
          </select>
        </div>

        <div className='col-md-4'>
          <button
            type='button'
            className='btn btn-primary'
            onClick={searchStudents}
          >
            Search Students <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
