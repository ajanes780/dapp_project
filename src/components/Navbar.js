import React from 'react'
import Identicon from 'identicon.js'

const Navbar = (props) => {
  return (
    <nav className='navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow'>
      <a
        className='navbar-brand col-sm-3 col-md-2 mr-0'
        href='www.google.com'
        target='_blank'
        rel='noopener noreferrer'
      >
        The Social Network
      </a>
      <ul className='navbar-nav px-3'>
        <li className='nav-item text-nowrap d-none d-sm-none d-sm-block'>
          <small className='text-secondary'>
            <small id='account'>Your wallet: {props.account}</small>

            {props.account ? (
              <img
                alt='account logo'
                className='m1-2'
                width='30'
                height='30'
                src={`data:image/png;base64,${new Identicon(props.account, 30).toString()}`}
              />
            ) : (
              <span> </span>
            )}
          </small>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
