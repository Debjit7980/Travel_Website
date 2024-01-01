import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './form.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Navbar from './Navbar';

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [data, setData] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            axios.post("https://travel-website-rouge.vercel.app/signup", { name, email, pass })
                .then(result => {
                    document.getElementById("demo").innerHTML = result.data.message;
                    setEmail('');
                    setName('');
                    setPass('')
                })
                .catch(err => console.log(err))
            //console.log("Data Stored");
        }
        catch (error) {
            console.error(error);
        }
        const data = await fetch('https://travel-website-rouge.vercel.app/signup', {
            method: 'post',
            body: JSON.stringify({ name, email, pass }),
            headers: {
                'Content-type': 'application.json'
            }
        })
        const result = await data.json();
        console.warn(result);
        navigate("/login")
        if (result) {
            alert("Data Saved Successfully")
            setName("");
            setEmail("");
            setPass("");
        }

    };
    useEffect(() => {
        setTimeout(() => {
            setData(true);
            window.scrollTo(0, 0);
        }, 2000)

    }, [])
    return (

        <>
            {data ?
            <>
                <Navbar />
                <div className='all'></div>
                <div className="form signin">
                    {console.log(name)}
                    <p id="demo" className='text-success'></p>
                    <h3>Register Yourself</h3>
                    <form onSubmit={handleSubmit} className='signinform'>
                        <div className='cont'>
                            <div className="form-input-container">
                                <input type="text" className="form-control shadow-none" required name="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                                <label >User Name</label>

                            </div>
                            <div className="form-input-container">
                                <input type="email" className="form-control shadow-none" required name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                <label >E-mail</label>
                                <p id="msg1"></p>
                            </div>
                            <div className="form-input-container">
                                <input type="password" className="form-control shadow-none" required name="pass" value={pass} onChange={(e) => { setPass(e.target.value) }} />
                                <label >Password</label>

                            </div>
                            <div className="button">
                                <button className="btn btn-primary" type="submit">Sign Up</button>
                            </div><br />
                        </div>
                        <div className='section'>
                            <div className='fadeEffect'></div>
                            <div className="already">
                                <label>Already Registered? Try <Link className="text-primary" to="/login" >Sign In</Link> </label>
                            </div>
                        </div>
                    </form>
                </div>

            </>
            :
                <Box sx={{ display: 'flex', position: 'absolute', left: '50%', alignItems: 'center', height: "100vh" }}>
                    Loading...&nbsp;
                    <CircularProgress />
                </Box>
            }

        </>
    )
}

export default SignUp
