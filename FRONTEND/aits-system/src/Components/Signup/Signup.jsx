import React from 'react'
import React, {useState} from 'react';
import './Signup.css';



function SignupPage(){
    /*manage role selection in dropdown box*/

    

    /* managing the input values*/
    /* when the component loads at first, no role is selected */
    const[ role, setRole] = useState('');
    const[username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[studentId, setStudentId] = useState('');
    const[lecturerId, setLecturerId] = useState('');
    const[registrarId, setRegistrarId] = useState('');
    

    /* handling changes when a user selects a role, what happens when a user selects a certain role*/
     const setUserRole = (evt) => {
        setRole( evt.target.value);
     

     /* submission of the login form*/
     const handleSubmit = (evt) => {
        evt.preventDefault();
       

        /*This requires all fields to be filled before procedding with the form submission*/
        if (!email || !role || !username || !password ){
          alert('Please fill in the required fields!');
          return;
        }

        if ((role == 'student' &&!studentId)||
            (role == 'lecturer' &&!lecturerId)||
            (role == 'registrar' &&!registrarId)){
              alert('Please provide a valid &{role} Id.');
              return;
            }
          }

        /*Handling the submission of data, sending it to the server*/
        const userData = {
          role,
          email,
          username,
          password,
          
          }

          /* where the server will send the input data*/
          if (role === 'student') {
            requestData.id = studentId;
          } else if (role === 'lecturer') {
            requestData.id = lecturerId;
          } else {
            requestData.id = registrarId;
          };

          console.log('Form Submitted: ',userData );
          alert('Congrats! Signup Successful!');
        };




      return (
        <div className= 'signUp Page'  >
            <h2>Welcome to the SignUp Page for AITS</h2>
            {/* <form  onSubmit = {handleSignUp}></form>*/}
            <form className='signUp form'>
              <div className='inputArea'>
                {/* area for the username*/}
                <label htmlFor="userName">userName:</label>
                <input 
                type="text"
                id='name'
                placeholder='Enter your username' />

                {/* area for the email*/}
                <label htmlFor="email">Email: </label>
                <input 
                type="email"
                id='email'
                placeholder='Enter your email' />

                {/* area for the password*/}
                <label htmlFor="password">Password: </label>
                <input 
                type="password"
                id='password'
                placeholder='Enter your password' />


                {/* conditional or user role fields*/}
                {/*if role is true, then what is in the brackets will be rendered*/}
                {/*onChange, when the user types in it, it updates the studentId or lecturerId or registrarId state*/}
                  {role === 'student' &&(
                    <div>
                      <label> Student ID</label>
                      <input 
                        type="text" 
                        value = {studentId}
                        onchange = {(evt) => setstudentId(evt.target.value)}
                        placeholder = 'Enter your Student ID'
                        required 
                        />
                    </div>
                  )}

                  {role === 'lecturer' &&(
                    <div>
                      <label> lecturer ID</label>
                      <input 
                        type="text" 
                        value = {lecturerId}
                        onchange = {(evt) => setlecturerId(evt.target.value)}
                        placeholder = 'Enter your lecturer ID'
                        required 
                        />
                    </div>
                  )}

                  {role === 'registrar' &&(
                    <div>
                      <label> Registrar ID</label>
                      <input 
                        type="text" 
                        value = {registrarId}
                        onchange = {(evt) => setregistrarId(evt.target.value)}
                        placeholder = 'Enter your Registrar ID'
                        required 
                        />
                    </div>
                  )}

                  {/*submit button*/}
                  <div>
                    <button type = 'Signup'> Sign Up</button>

                  </div>

              </div>
            </form>
          </div>
      )
            }
export default SignupPage;
