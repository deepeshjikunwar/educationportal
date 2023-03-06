// AdminDashboard.js

import React from 'react';
import Course from './Course';
import '../CSS/AdminDashboard.css';

const courses = [
  {
    id: 1,
    title: 'React Fundamentals',
    description: 'Learn the basics of React',
    students: [
      { id: 1, firstName: 'John', lastName: 'Doe', age: 22 },
      { id: 2, firstName: 'Jane', lastName: 'Doe', age: 21 },
      { id: 3, firstName: 'Bob', lastName: 'Smith', age: 25 },
    ],
  },
  {
    id: 2,
    title: 'Advanced React',
    description: 'Learn advanced concepts in React',
    students: [
      { id: 4, firstName: 'Alice', lastName: 'Jones', age: 24 },
      { id: 5, firstName: 'Charlie', lastName: 'Brown', age: 23 },
    ],
  },
];

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      {courses.map(course => (
        <div key={course.id} className="course-box">
          <Course
            title={course.title}
            description={course.description}
            students={course.students}
          />
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
