
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
    const[studentNumber, setStudentNumber] = useState('');
    const[lecturerNumber, setLecturerNumber] = useState('');
    const[registrarNumber, setRegistrarNumber] = useState('');
    

    /* handling changes when a user selects a role, what happens when a user selects a certain role*/
     const setUserRole = (evt) => {
        setRole( evt.target.value);
     };

     /* submission of the login form*/
     const handleSubmit = (evt) => {
        evt.preventDefault();


        

        /*This requires all fields to be filled before procedding with the form submission*/
        if (!role || !username|| !email || !password ){
          alert('Please fill in the required fields!');
          return;
        }
        /*check if the role specific Number is provided*/
        if ((role === 'student' &&!studentNumber)||
            (role === 'lecturer' &&!lecturerNumber)||
            (role === 'registrar' &&!registrarNumber)){
              alert('Please provide a valid &{role} Id.');
              return;
            }
          

        /*Handling the submission of data, sending it to the server*/
        const userData = {
          role,
          username,
          email,
          password,
          };

          /* where the server will send the input data*/
          if (role === 'student') {
            userData.id = studentNumber;
          } else if (role === 'lecturer') {
            userData.id = lecturerNumber;
          } else {
            userData.id = registrarNumber;
          };

          console.log('Form Submitted: ',userData );
          alert('Congrats! Signup Successful!');
        };




      return (
        <div className= 'signUp Page'  >
            <h2>Welcome to the SignUp Page for AITS</h2>
            {/* <form  onSubmit = {handleSignUp}></form>*/}
            <form className='signUp form' onSubmit = {handleSubmit}>
              <div className='inputArea'>
                {/* area for the username*/}
                <label htmlFor="username">UserName:</label>
                <input 
                type="text"
                id='username'
                placeholder='Enter your username' 
                value = {username}
                onChange = {(evt) => setUsername(evt.target.value)}
                required
                />
                


                {/* area for the email*/}
                <label htmlFor="email">Email: </label>
                <input 
                type="email"
                id='email'
                placeholder='Enter your email' 
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                required/>

                {/* area for the password*/}
                <label htmlFor="password">Password: </label>
                <input 
                type="password"
                id='password'
                placeholder='Enter your password' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />



                {/* Role Selection */}
                <label htmlFor="role">Select Role:</label>
                <select
                  value={role}
                  onChange={setUserRole}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="lecturer">Lecturer</option>
                  <option value="registrar">Registrar</option>
                </select>


                {/* conditional or user role fields*/}
                {/*if role is true, then what is in the brackets will be rendered*/}
                {/*onChange, when the user types in it, it updates the studentINumber or lecturerNumber or registrarNumber state*/}
                  {role === 'student' &&(
                    <div>
                      <label> Student Number</label>
                      <input 
                        type="text" 
                        value = {studentNumber}
                        onChange = {(evt) => setStudentNumber(evt.target.value)}
                        placeholder = 'Enter your Student Number'
                        required 
                        />
                    </div>
                  )}

                  {role === 'lecturer' &&(
                    <div>
                      <label> lecturer Number</label>
                      <input 
                        type="text" 
                        value = {lecturerNumber}
                        onChange = {(evt) => setLecturerNumber(evt.target.value)}
                        placeholder = 'Enter your lecturer Number'
                        required 
                        />
                    </div>
                  )}

                  {role === 'registrar' &&(
                    <div>
                      <label> Registrar Number</label>
                      <input 
                        type="text" 
                        value = {registrarNumber}
                        onChange = {(evt) => setRegistrarNumber(evt.target.value)}
                        placeholder = 'Enter your Registrar Number'
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
