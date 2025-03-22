import React from 'react'

/*this component is a header that displays lecturer name, and course unit they */ 
const LecturerInfo = () => {
    return(
        <div className = 'lecturer infor'>
            <h1>Lecturer Dashboard</h1>
            <p>Welcome Dr. [Lecturer Name]</p>
            <p>CourseUnit: [Course Unit]</p>
        </div>

    );

}
export default LecturerInfo;