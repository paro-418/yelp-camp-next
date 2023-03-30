import React from 'react';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classes from './Login.module.css';
import Button from '../../components/Button';
import { signIn } from 'next-auth/react';
import axios from 'axios';

const SignupPage = () => {
  const { back } = useRouter();
  // this state is to toggle between create or sing in function
  const [creating, setCreating] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const toggleCreateOrLogin = () => {
    setCreating(!creating);
  };

  const authenticateHandler = async (username, password) => {
    const status = await signIn('credentials', {
      username,
      password,
      redirect: false,
      callbackUrl: '/',
    });

    if (!status.error) back();
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;

      if (username === '' || password === '') {
        return alert('Both field is required');
      }
      if (creating) {
        // registering user
        await axios.post('/api/auth/sign-up', {
          password,
          username,
        });

        usernameRef.current.value = '';
        passwordRef.current.value = '';
        await authenticateHandler(username, password);
      } else {
        // logging user in
        await authenticateHandler(username, password);
      }
    } catch (err) {
      console.log(`CAN NOT PROCESS`, err);
    }
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

          {creating ? (
            <Button className={classes.submitBtn} type='submit'>
              Create an account
            </Button>
          ) : (
            <Button className={classes.submitBtn} type='submit'>
              Login
            </Button>
          )}
        </form>
        {creating ? (
          <p>
            Already a user? &nbsp;
            <Button
              callFunction={toggleCreateOrLogin}
              className={classes.quesBtn}
            >
              Sign in
            </Button>
          </p>
        ) : (
          <p>
            Not a user yet? &nbsp;
            <Button
              callFunction={toggleCreateOrLogin}
              className={classes.quesBtn}
            >
              Create an account
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
