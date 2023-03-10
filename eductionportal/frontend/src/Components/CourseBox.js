
import React from 'react';
// import '../CSS/CourseBox.css';
import { Card, Space } from 'antd';
const { Meta } = Card;
const CourseBox = ({ title, description, capacity ,forStudent }) => {
  return (
    <Card hoverable className="course-container"  
    // title={title}

    style={{
      width: 300,
    }}>
      {/* <h2 className="course-title">{title}</h2> */}
          <Meta
              title={title}
              description={"description"}
            />
  

        <p className="course-capacity">Capacity: {capacity}</p>

    </Card>
  );
};
export default CourseBox;