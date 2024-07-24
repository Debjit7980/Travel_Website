import React from 'react'
import './CardCamp.css';

function CardsCamp(props) {
    return (
        <div className='containerCamp'>
            <div className='image'>
                <img src={props.imgLink} alt="cmpImg" height="250" />
            </div>
            <div className='descCamp'>
                <h3 >{props.name}
                <span id="price">&#8377;5500</span> </h3><br />
                <span id="desc"><small><i class="fa-solid fa-bed"></i> 4 beds</small></span>
                <span id="desc"><small><i class="fa-solid fa-bowl-food"></i> Food</small></span>
                <span id="desc"><small><i class="fa-solid fa-fire"></i> Campfire</small></span>
                <span id="desc"><small><i class="fa-solid fa-music"></i> Music</small></span>
                <span id="desc"><small><i className="fa-sharp fa-solid fa-person-hiking"></i> Trekking</small></span><br/>
                <button id="booking">Book a Tent</button>
            </div>

        </div>
    )
}

export default CardsCamp
