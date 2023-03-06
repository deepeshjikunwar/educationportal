
import React from 'react';
import '../CSS/Course.css';

const Course = ({ title, description, students }) => {
  return (
    <div className="course-container">
      <h1 className="course-title">{title}</h1>
      <p className="course-description">{description}</p>
      <div className="students-list">
        <h2 className="students-list-title">Students:</h2>
        <ul className="students-list-items">
          {students.map(student => (
            <li key={student.id} className="student">
              <span className="student-name">
                {student.firstName} {student.lastName}
              </span>
              <span className="student-age">{student.age}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Course;