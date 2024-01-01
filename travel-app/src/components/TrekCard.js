import React from 'react';
import './TrekCard.css';

function TrekCard({treks,trip,tripimg}) {
    return (
        <div className='main-cont'>
            <div className='card'>
                <div className='trek-card'>
                    <div className='trekimg'>
                        <img src={tripimg} alt="trekImg" />
                    </div>
                    
                    <div className='trekDesc'>
                        <span id="trekDest">{trip} Trek</span>
                        <span id="duration">7 Days/6 Nights</span>
                        <span id="travel">{treks.name}----{trip}</span>
                        <div className='icons-list'>
                            <div className='icons'>
                                <i class="fa-sharp fa-solid fa-taxi" id="car"></i>
                                <h6>Transport Included</h6>
                            </div>
                            <div className='icons'>
                                <i class="fa-solid fa-bowl-food" id="stay"></i>
                                <h6>Meals Included</h6>
                            </div>
                            <div className='icons'>
                                <i class="fa-solid fa-bed" id="stay"></i>
                                <h6>Stay Included</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='booking'>
                    <div className='enquiry'>
                        <pre>
                            Superb <span>4.2</span>
                        </pre>
                        <p>123 ratings</p>
                        <div className='rating'>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star" id="except"></i>
                        </div>
                        <p id="cut"><s>&#8377; 25500</s></p>
                        <h2 id="price">&#8377; 19500</h2>  
                        <button>Send Enquiry</button>  
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TrekCard
