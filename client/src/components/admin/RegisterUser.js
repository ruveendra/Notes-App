import React, {useState} from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from 'axios';

 function RegisterUser({setIsLogin}) {
    const [user, setUser] = useState({email: '',password: '' })
    const [err, setErr] = useState('')

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
        setErr('')
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            const res = await axios.post('/users/register',{
                email: user.email,
                password: user.password
            })
            setUser({name: '', email: '', password: ''})
            setErr(res.data.msg)
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }
  return (

    
    <div class="center">
      <h2>Register Student</h2>
      <form onSubmit={registerSubmit}>
        <div class="txt_field"  >
          <input type="email" required name="email" id="login-email"  value={user.email} onChange={onChangeInput}/>
          <span></span>
          <label>Email</label>
        </div>
        <div class="txt_field">
          <input type="password"  name="password" id="login-password" required value={user.password} autoComplete="true" onChange={onChangeInput}/>
          <span></span>
          <label>Password</label>
        </div>
        {/* <div class="pass">Forgot Password?</div> */}
        <h5>{err}</h5>
        <input type="submit" value="Register"/>
        {/* <div class="signup_link">
          Not a member? <a href="#">Signup</a>
        </div> */}
      </form>
    </div>
    
    
//     <section className="login-page">
//     <div className="register create-note" >
//     <h2>Register User</h2>
//          <form onSubmit={registerSubmit}>
            
//              <input type="email" name="email" id="register-email"
//              placeholder="Email" required value={user.email}
//              onChange={onChangeInput} />

//              <input type="password" name="password" id="register-password"
//              placeholder="Password" required value={user.password}
//              autoComplete="true" onChange={onChangeInput} />

//              <button type="submit">Register</button>
             
//              <h3>{err}</h3>
//          </form>
//     </div>
// </section>
    
  );
}

export default RegisterUser