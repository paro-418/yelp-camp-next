import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import classes from './AddComment.module.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer';
import Button from '../../../components/Button';

const AddReviewPage = () => {
  const navigate = useRouter();
  const router = useRouter();
  const { campId } = router.query;

  const reviewRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    // call axios
  };
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
