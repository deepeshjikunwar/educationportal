
import React from 'react';
import '../CSS/CourseBox.css';

const CourseBox = ({ title, description, capacity }) => {
  return (
    <div className="course-container">
      {/* Heloooooooooooooooo */}
      <h1 className="course-title">{title}</h1>
      <p className="course-description">{description}</p>
      <div className="students-list">
        <h2 className="students-list-title">Capacity: {capacity}</h2>
        <ul className="students-list-items">
          {
          /* {students.map(student => (
            <li key={student.id} className="student">
              <span className="student-name">
                {student.firstName} {student.lastName}
              </span>
              <span className="student-age">{student.age}</span>
            </li>
          ))} */ 
          }
        </ul>
      </div>
    </div>
  );
};
export default CourseBox;