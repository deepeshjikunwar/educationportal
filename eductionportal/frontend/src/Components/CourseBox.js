
import React from 'react';
import '../CSS/CourseBox.css';

const CourseBox = ({ title, description, capacity }) => {
  return (
    <div className="course-container">
      <h2 className="course-title">{title}</h2>
      <p className="course-description">{description}</p>

        <h3 className="course-capacity">Capacity: {capacity}</h3>
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
  );
};
export default CourseBox;