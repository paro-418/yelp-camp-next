import React, { useRef } from 'react';
import classes from './AddCampground.module.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer';
import Button from '../../../components/Button';
import Select from '../../../components/Select';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';

const AddNewCampGroundPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const categories = [
    'island',
    'riverside',
    'mountain',
    'beach',
    'waterfall',
    'grassland',
  ];
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const campImage = imageRef.current.value;
    const campName = nameRef.current.value;
    const price = priceRef.current.value;
    const campDescription = descriptionRef.current.value;
    const category = categoryRef.current.value;
    try {
      const res = await axios.post('/api/campgrounds/add-campground', {
        campImage,
        campName,
        price,
        campDescription,
        category,
        createdBy: session.user.name.username,
      });

      console.log(res);
    } catch (err) {
      console.log(`CAN NOT POST CAMPGROUND`);
    }
    imageRef.current.value = '';
    descriptionRef.current.value = '';
    nameRef.current.value = '';
    priceRef.current.value = '';
  };

  if (session === null) {
    setTimeout(() => {
      router.back();
    }, 2000);
    return (
      <main className={classes.message}>
        <h2>Please login first to add campground</h2>
      </main>
    );
  }

  return (
    <main className={classes.main}>
      <Header />
      <div className={classes.formContainer}>
        <h1 className={classes.h1}>Add New CampGround</h1>
        <form className={classes.form} onSubmit={formSubmitHandler}>
          <label htmlFor='campgroundName' className={classes.label}>
            CampGround Name
          </label>
          <input
            type='text'
            required
            id='campgroundName'
            className={classes.input}
            ref={nameRef}
          />
          <label htmlFor='price' className={classes.label}>
            Price
          </label>
          <input
            placeholder='in rupees'
            type='text'
            required
            id='price'
            className={classes.input}
            ref={priceRef}
          />
          <label htmlFor='image' className={classes.label}>
            image
          </label>
          <input
            placeholder='link of the image'
            type='text'
            required
            id='image'
            className={classes.input}
            ref={imageRef}
          />
          <label htmlFor='category' className={classes.label}>
            Category
          </label>
          <Select
            reference={categoryRef}
            className={classes.select}
            id='category'
            name='category'
            options={categories}
          />
          <label htmlFor='description' className={classes.label}>
            Description
          </label>
          <textarea
            type='text'
            required
            id='description'
            className={classes.textarea}
            ref={descriptionRef}
          />

          <Button className={classes.submitBtn}>Add CampGround</Button>
        </form>
      </div>
      <Footer />
    </main>
  );
};

export default AddNewCampGroundPage;
