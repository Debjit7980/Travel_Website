import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './form.css'
//import axios from 'axios';
import Navbar from './Navbar';

function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            /*axios.post("https://naturesdeck-backend-app.onrender.com/login", { email, pass })
                .then(res => {
                    console.log(res.data)
                    document.getElementById("demo").innerHTML = res.data.message
                    if (res.data.status === "Success") {
                        console.log("After Logging in: ", res.data)
                        localStorage.setItem("userDataToken", res.data.result.token)

                        navigate("/")
                        //setEmail(res.data.email);
                        //setPass(res.data.pass);
                    }
                })
                .catch(err => console.log(err))*/
            const data=await fetch('https://naturesdeck-trekcamp-backend-app.onrender.com/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, pass }),
            })
            const result = await data.json();
            if(result.status===201)
            {
                console.log("After Logging in: ", result);
                localStorage.setItem("userDataToken", result.response.token);
                navigate("/");
                //document.getElementById("demo").innerHTML=result.messege;
            }
            else{
                document.getElementById("demo").innerHTML=result.message;
            }
        }
        catch (e) {
            console.error("Error:",e);
        }

    }
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    return (
        <div className="form-container">  
            <Navbar />
            <div className='all'></div>
            <div className='form signin secondform'>
                <h3>Sign In Yourself</h3>
                <form onSubmit={handleSubmit} className='signinform secondform'>
                    <div className='cont'>
                        <div className="form-input-container">
                            <input type="email" className="form-control shadow-none" required name="email" onChange={(e) => { setEmail(e.target.value) }} id="floatingInput"  />
                            <label>E-mail</label>
                            <p id="msg1"></p>
                        </div>
                        <div className="form-input-container" id="input-pass">
                            <input type="password" className="form-control shadow-none" required name="pass"  onChange={(e) => { setPass(e.target.value) }} />
                            <label>Password</label>
                        </div>
                        <p id="demo" className='text-danger'></p>

                        <div className='button'>
                            <button className='btn btn-primary' type='submit' >
                                Sign In
                            </button>
                        </div>
                        <br />
                        
                    </div>
                    <div className='section'>
                    <div className='fadeEffect'></div>
                        {/*<div className='pic'>
                            <img src={require('./images/signin.jpg')} className='image' alt="img" />
                        </div>*/}
                        <div className='already'>
                            <label>
                                Not Registered yet? Then{' '}
                                <Link to='/signup'>
                                    Sign Up
                                </Link>
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
