import React from 'react'
import './PopTrek.css';
import { Link } from 'react-router-dom';
function PopTrek() {
    return (
        <div className='poptrek'>
            <div className='container'>
                <div className='desc'>
                    <h1>Find The Perfect Escapes</h1><hr /><br />
                    <span>Discover Your Ideal Experience</span>
                </div>
                <div className="container two">
                    <div className='images'>
                        <Link to="/" ><img src={require("../components/images/boi.jpg")} id="img1" alt="bstofIndia"></img></Link>
                        <Link to="/" ><img src={require("../components/images/1.jpg")} style={{ width: 250, height: 362 }} alt="camping"></img></Link>
                        <Link to="/" ><img src={require("../components/images/him.png")} alt="Him"></img></Link>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default PopTrek
