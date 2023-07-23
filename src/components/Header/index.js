import React from 'react'
import './index.css'

const Header = () => (
    <div className="header-con">
        <img className="web-logo" src="https://mytransfer.be/wp-content/uploads/2018/12/Transfer-logo-default-RGB.png" alt="webLogo" />
        <div>
            <ul className='header-items-con'>
                <li className='header-items'>Destinations</li>
                <li className='header-items'>My Bookings</li>
                <li className='header-items'>Travel agencies</li>
                <li className='header-items'>Help Centre</li>
                <li><img src="https://icon-library.com/images/british-flag-icon/british-flag-icon-13.jpg" className='flag-img' alt="eur-flag" /></li>
                <li className='header-items'>EUR</li>
                <li><button className='login-btn' type="button">Login</button></li>
            </ul>
        </div>
    </div>
)
        
export default Header