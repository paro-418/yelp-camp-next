import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import classes from './AddComment.module.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer';
import Button from '../../../components/Button';
import axios from 'axios';

const AddReviewPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { campId } = router.query;

  const reviewRef = useRef();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`/api/campgrounds/review/post-review/${campId}`, {
        review: reviewRef.current.value,
        username: session.user.name.username,
        id: session.user.name._id,
      });
      router.back();
    } catch (err) {
      console.log(`CAN NOT POST REVIEW`, err);
    }
  };

  if (session === null) {
    setTimeout(() => {
      router.back();
    }, 2000);
    return (
      <main className={classes.message}>
        <h2>Please login first to add review</h2>
      </main>
    );
  }
  return (
    <main className={classes.main}>
      <Header />
      <div className={classes.formContainer}>
        <h1 className={classes.h1}>Add New Comment</h1>
        <form action='' className={classes.form} onSubmit={formSubmitHandler}>
          <label htmlFor='textarea' className={classes.label}>
            Description
          </label>
          <textarea
            ref={reviewRef}
            id='textarea'
            className={classes.textarea}
            placeholder='write your experience here'
          ></textarea>
          <Button type='submit' className={classes.submitBtn}>
            Post Comment
          </Button>
        </form>
      </div>
      <Footer />
    </main>
  );
};

export default AddReviewPage;
