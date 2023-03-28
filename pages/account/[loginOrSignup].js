import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classes from './Login.module.css';
import Button from '../../components/Button';

const SignupPage = () => {
  const router = useRouter();

  useEffect(() => {
    // if (login()) {
    //   router.back();
    // }
  }, []);

  // this state is to toggle between create or sing in function
  const [createOrLogin, setSetCreateOrLogin] = useState(true);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const toggleCreateOrLogin = () => {
    setSetCreateOrLogin(!createOrLogin);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
  };
  return (
    <main className={classes.main}>
      <div className={classes.formContainer}>
        <header>
          <img src='/Assets/Logo.svg' alt='logo' />
          <Link href='/campgrounds' className={classes.link}>
            Back to campgrounds
          </Link>
        </header>
        <form className={classes.form} onSubmit={formSubmitHandler}>
          <h1 className={classes.h1}>
            Start exploring camps from all around the world.
          </h1>

          <div className={classes.inputContainer}>
            <label htmlFor='username' className={classes.label}>
              username
            </label>
            <input
              id='username'
              placeholder='username'
              type='text'
              required
              className={classes.input}
              ref={usernameRef}
            />
            <label htmlFor='password' className={classes.label}>
              password
            </label>
            <input
              id='password'
              placeholder='password'
              text='password'
              required
              className={classes.input}
              ref={passwordRef}
            />
          </div>

          {createOrLogin ? (
            <Button className={classes.submitBtn} type='submit'>
              Login
            </Button>
          ) : (
            <Button className={classes.submitBtn} type='submit'>
              Create an account
            </Button>
          )}
        </form>
        {createOrLogin ? (
          <p>
            Not a user yet? &nbsp;
            <Button
              callFunction={toggleCreateOrLogin}
              className={classes.quesBtn}
            >
              Create an account
            </Button>
          </p>
        ) : (
          <p>
            Already a user? &nbsp;
            <Button
              callFunction={toggleCreateOrLogin}
              className={classes.quesBtn}
            >
              Sign in
            </Button>
          </p>
        )}
      </div>
      <div className={classes.reviewContainer}>
        <span className={classes.review}>
          <blockquote className={classes.blockquote}>
            "someones experience in a long damn sentence i had to type someones
            experience in a long damn sentence i had to type someones experience
            in a long damn sentence i had to type."
          </blockquote>
          <div className={classes.reviewerInfo}>
            <img
              src='/Assets/User Testimonial.svg'
              alt='a user'
              className={classes.userImage}
            />
            <span className={classes.userInfo}>
              <h5 className={classes.name}>May Andrews</h5>
              <p className={classes.position}>Professional Hiker</p>
            </span>
          </div>
        </span>
      </div>
    </main>
  );
};

export default SignupPage;
