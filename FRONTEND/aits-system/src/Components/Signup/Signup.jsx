import React from 'react'

function SignupPage(){
    /*manage role selection in dropdown box*/

    

    /* managing the input values*/
    /* when the component loads at first, no role is selected */
    const[ role, setRole] = useState('');
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[studentId, setStudentId] = useState('');
    const[lecturerId, setLecturerId] = useState('');
    const[registrarId, setRegistrarId] = useState('');
    const[email, setEmail] = useState('');

    /* handling changes when a user selects a role, what happens when a user selects a certain role*/
     const setUserRole = (evt) => {
        setRole( evt.target.value);
     }

     /* submission of the login form*/
     const submitLoginForm = (evt) => {
        evt.preventDefault();
        console.log('Form submitted successfully!: '{
            role,
            username,
            password,
            studentId,
            lecturerId,
            registrarId,

        });

      return (
        <div className= 'signUp Page'  >
            <h2>SignUp Page for AITS</h2>

            <div className='select your role'></div>
            <div className='selection of a role'>
                <label> Please select your role</label>
            </div>
 




            </div>

        

      )  


     }

}

export default Signup
