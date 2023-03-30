import React, { useState } from 'react';
import Link from 'next/link';
import { useRef } from 'react';
import Header from '../../components/Header/Header';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Card from '../../components/Card/Card';
import Footer from '../../components/Footer';
import CampModel from '../../Models/CampModel';
import { useSession } from 'next-auth/react';
import connectToDatabase from '../../lib/connectToDatabase';
import mongoose from 'mongoose';

const SearchPage = ({ allCamps }) => {
  const { status } = useSession();
  const [camps, setCamps] = useState(allCamps);
  const categoryRef = useRef();
  const categories = [
    'island',
    'riverside',
    'mountain',
    'beach',
    'waterfall',
    'grassland',
  ];

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const selected = categoryRef.current.value;
    console.log(selected);
    if (selected === '#') {
      setCamps(allCamps);
      return;
    }
    const filteredCamps = await allCamps.filter(
      (camps) => camps.category === selected
    );
    setCamps(filteredCamps);
  };
  return (
    <main className='flex flex-col p-2 md:py-4 md:px-8 lg:py-4 lg:px-20 gap-4'>
      <Header />
      <div className='formContainer border-2 border-solid border-[rgb(138,138,138)] rounded basis-4/12 bg-[rgba(250, 235, 215, 0.456)] p-6 flex flex-col gap-4'>
        <h2>Welcome to YelpCamp!</h2>
        <p className='w-2/6 leading-[1.3rem]'>
          View our hand-picked campground from all over the world, or add your
          own.
        </p>
        <form className='flex gap-4'>
          <Select
            onChange={formSubmitHandler}
            reference={categoryRef}
            className='py-2 px-4 text-[1rem] rounded border-2 border-solid border-[rgb(174,174,174)]'
            id='category'
            name='category'
            options={categories}
            defaultOption='All Campgrounds'
          />
          <Button
            type='submit'
            className='py-2 px-4 bg-[#000] text-white rounded-[0.3rem] cursor-pointer border-none '
            callFunction={formSubmitHandler}
          >
            search
          </Button>
        </form>
        {status === 'authenticated' ? (
          <Link className='underline' href='/campgrounds/add-campground'>
            Or add your own campground
          </Link>
        ) : (
          <Link href='/account/login' className='underline'>
            Or Login to add your own campground
          </Link>
        )}
      </div>
      <div className='cardContainer border-solid border-2 border-[rgb(220, 220, 220)] rounded grow overflow-hidden flex gap-8 flex-wrap my-8 mx-0 p-4  '>
        {camps.length === 0 ? (
          <p>Loading...Please wait</p>
        ) : (
          camps.map((campground) => (
            <Card key={campground._id} campground={campground} />
          ))
        )}
      </div>
      <Footer />
    </main>
  );
};

export default SearchPage;

export async function getStaticProps() {
  // console.log(`INDEX PAGE CONNECTION STATE`, mongoose.connection.readyState);
  connectToDatabase(mongoose.connection.readyState);
  const data = await CampModel.find();

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      allCamps: JSON.parse(JSON.stringify(data)),
    },

    revalidate: 10,
  };
}
