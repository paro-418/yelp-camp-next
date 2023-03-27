import React from 'react';
import Button from '../components/Button';
import Link from 'next/link';

const HomePage = () => {
  return (
    <main className='flex md:h-screen justify-between'>
      <div className='lg:basis-3/5'>
        <img
          src='/Assets/Logo.svg'
          alt='logo'
          className='my-6 mx-4 lg:ml-40 lg:mt-10'
        />

        <div className=''>
          <img
            src='/Assets/HeroImage(TabletMobile).jpg'
            alt='logo'
            className='w-screen md:hidden'
          />
        </div>

        <div className='my-6 mx-4 lg:ml-40 lg:mt-32'>
          <h1 className='font-bold text-4xl w-4/5 lg:text-6xl lg:mb-6'>
            Explore the best camps on Earth.
          </h1>
          <p className='my-4 leading-6 text-gray-500 font-semibold lg:w-2/3'>
            YelpCamp is a curated list of best camping spots on Earth.
            Unfiltered and Unbiased reviews
          </p>
          <ul className='flex flex-col gap-2 text-gray-500 font-semibold'>
            <li className='flex'>
              <img
                src='/Assets/CheckMark.svg'
                alt='checkMark'
                className='mr-2'
              />
              Add your own camp suggestions.
            </li>
            <li className='flex'>
              <img
                src='/Assets/CheckMark.svg'
                alt='checkMark'
                className='mr-2'
              />
              Leave reviews and experiences.
            </li>
            <li className='flex'>
              <img
                src='/Assets/CheckMark.svg'
                alt='checkMark'
                className='mr-2'
              />
              See locations for all camps.
            </li>
          </ul>
          <Button className='font-bold text-white bg-black px-6 py-4 rounded-md  mt-6 mb-8'>
            <Link className='' href='/campgrounds'>
              View CampGrounds
            </Link>
          </Button>

          <div className=''>
            <p className='text-gray-400 font-semibold'>Partnered with:</p>
            <div className='flex'>
              <img className='' src='/Assets/Airbnb.svg' alt='air-bnb' />
              <img className='' src='/Assets/Booking.svg' alt='Booking.com' />
              <img className='' src='/Assets/PlumGuide.svg' alt='PlumGuide' />
            </div>
          </div>
        </div>
      </div>
      <div className=''>
        <img
          src='/Assets/HeroImage.jpg'
          alt='landing page'
          className='hidden lg:block lg:h-screen'
        />
      </div>
    </main>
  );
};

export default HomePage;
