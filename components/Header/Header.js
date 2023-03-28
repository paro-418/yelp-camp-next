import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Button from '../Button';
import Link from 'next/link';
import classes from './Header.module.css';

const Header = (props) => {
  const { data: session, status } = useSession();
  const logoutHandler = () => {};
  return (
    <header className={` ${classes.Header} ${props.className}`}>
      <div className={classes.logoDiv}>
        <img src='/Assets/Logo.svg' alt='Logo' />
      </div>

      <div className={classes.hamburgerDiv}>
        <input type='checkbox' className={classes.checkbox} />
        <img
          src='/Assets/Hamburger Menu.svg'
          alt='menu button'
          className={classes.hamburger}
        />
        <div className={classes.btnDiv}>
          <Button className={`${classes.btn}`}>
            <Link className={classes.Link} href='/'>
              Home
            </Link>
          </Button>
          <span className={classes.btnSpan}>
            {status === 'authenticated' ? (
              <Button className={` ${classes.btn} ${classes.userName}`}>
                <Link className={classes.Link} href='/profile'>
                  username
                </Link>
              </Button>
            ) : (
              <Button className={` ${classes.btn}`}>
                <Link className={classes.Link} href='/account/login'>
                  Login
                </Link>
              </Button>
            )}

            {status === 'authenticated' ? (
              <Button
                callFunction={logoutHandler}
                className={`${classes.btn} ${classes.logoutBtn}`}
              >
                Logout
              </Button>
            ) : (
              <Button className={`${classes.createAccount} ${classes.btn} `}>
                <Link className={classes.Link} href='/account/signup'>
                  Create Account
                </Link>
              </Button>
            )}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
