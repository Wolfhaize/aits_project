
import React, {useState} from 'react';
import './Signup.css';



function SignupPage(){
    /*manage role selection in dropdown box*/

    

    /* managing the input values*/
    /* when the component loads at first, no role is selected */
    const[ role, setRole] = useState('');
    const[firstname,setfirstname] = useState('')
    const[lastname,setlastname] = useState('')
    const[username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[studentId, setStudentId] = useState('');
    const[RegisterationId, setRegisterationId] = useState('')
    const[lecturerId, setLecturerId] = useState('');
    const[registrarId, setRegistrarId] = useState('');
    

    /* handling changes when a user selects a role, what happens when a user selects a certain role*/
     const setUserRole = (evt) => {
        setRole( evt.target.value);
     };

     /* submission of the login form*/
     const handleSubmit = (evt) => {
        evt.preventDefault();


        

        /*This requires all fields to be filled before procedding with the form submission*/
        if (!role || !username|| !email || !password ||!firstname ||!lastname){
          alert('Please fill in the required fields!');
          return;
        }
        /*check if the role specific ID is provided*/
        if ((role === 'student' &&!studentId &&!RegisterationId)||
            (role === 'lecturer' &&!lecturerId)||
            (role === 'registrar' &&!registrarId)){
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
            userData.id = studentId;
          } else if (role === 'lecturer') {
            userData.id = lecturerId;
          } else {
            userData.id = registrarId;
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
                
                <label htmlFor="firstname">FirstName: </label>
                <input 
                type="text"
                id='firstname'
                placeholder='Enter your first name' 
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
                required
                />
                <label htmlFor="lastname">LastName: </label>
                <input 
                type="text"
                id='lastname'
                placeholder='Enter your last name' 
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
                required
                />


                <label htmlFor="username">Username:</label>
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
                {/*onChange, when the user types in it, it updates the studentId or lecturerId or registrarId state*/}
                  {role === 'student' &&(
                    <div>
                      <label> Student number</label>
                      <input 
                        type="text" 
                        value = {studentId}
                        onChange = {(evt) => setStudentId(evt.target.value)}
                        placeholder = 'Enter your Student number'
                        required 
                        />
                      <label> Registeration number</label>
                      <input 
                        type="text" 
                        value = {studentId}
                        onChange = {(evt) => setRegisterationId(evt.target.value)}
                        placeholder = 'Enter your Registeration number'
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
                        onChange = {(evt) => setLecturerId(evt.target.value)}
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
                        onChange = {(evt) => setRegistrarId(evt.target.value)}
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
