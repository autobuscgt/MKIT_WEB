import React from 'react';
import './Banner.css'
import mario from '../static/gif/mario.gif'
function Banner() {
    return (
        <div className='props'>
            
            <div className='banner'>
                
                <ul className='banner_list'> 
                    <li className='banner_list' style={{textAlign:'center'}}>            
                <span>
                 {`..{ МКИТ_WEB }..`}
                </span>
                
                </li>
                <li className='banner_list'>
                <span style={{fontSize:'20px',color:'#d7d7d7'}}> 
                присоединяйся к нам

            </span>
            <img src={mario} className='gif_anim'></img>
            </li>
                </ul>
                

        </div>
            
        </div>

    );
}

export default Banner;