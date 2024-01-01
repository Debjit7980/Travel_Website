import React from 'react'
import { Link } from 'react-router-dom';
import './cards.css';

function Cards(props) {
    return (
        <>
            <li className='card-item'>
                <Link>
                    <figure>
                        <img src={props.imgLink} alt="TrekImage" />
                        <div className='fade'></div>
                        <div className='card-desc'>
                            <h3>{props.name}</h3>
                        </div>
                    </figure>
                </Link>
            </li>
        </>
    )
}

export default Cards
