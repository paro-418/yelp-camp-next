import Button from '../Button';
import Link from 'next/link';
import classes from './Header.module.css';

const Header = (props) => {
  const logoutHandler = () => {};
  return (
    <header className={`${props.header} ${classes.Header} `}>
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
            {false ? (
              <Button className={` ${classes.btn} ${classes.userName}`}>
                <Link className={classes.Link} href='/profile'>
                  username
                </Link>
              </Button>
            ) : (
              <Button className={` ${classes.btn}`}>
                <Link className={classes.Link} href='/login'>
                  Login
                </Link>
              </Button>
            )}

            {false ? (
              <Button
                callFunction={logoutHandler}
                className={`${classes.btn} ${classes.logoutBtn}`}
              >
                Logout
              </Button>
            ) : (
              <Button className={`${classes.createAccount} ${classes.btn} `}>
                <Link className={classes.Link} href='/signup'>
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
