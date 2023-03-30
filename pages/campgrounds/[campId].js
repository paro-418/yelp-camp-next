import React, { useState, useEffect } from 'react';
import classes from './CampGround.module.css';
import Link from 'next/link';
import CampModel from '../../Models/CampModel';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Review from '../../components/Reviews/Review';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import mongoose from 'mongoose';
import connectToDatabase from '../../lib/connectToDatabase';

const CampGroundPage = ({ campInfo }) => {
  const { status } = useSession();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `/api/campgrounds/review/get-review/${campInfo._id}`
        );
        setReviews(response.data.allReviews);
      } catch (err) {}
    };

    fetchReviews();
  }, []);

  return (
    <main>
      <Header className={classes.header} />
      {
        // loading ? (
        //   <Loading />
        // ) :
        <main className={classes.main}>
          <div className={classes.mapContainer}>
            <img src='/Assets/Map.png' alt='map' className={classes.mapImage} />
          </div>
          <div className={classes.infoContainer}>
            <div className={classes.camp}>
              <img
                src={campInfo.campImage}
                alt={campInfo.campName}
                className={classes.campImage}
              />
              <article className={classes.campInfo}>
                <div className={classes.campTitle}>
                  <h4 className={classes.campName}>{campInfo.campName}</h4>
                  <span className={classes.campPrice}>$104.99/night</span>
                </div>
                <p className={classes.campDescription}>
                  {campInfo.campDescription}
                </p>
                <span className={classes.submittedBy}>
                  Submitted by {campInfo.createdBy}
                </span>
              </article>
            </div>
            <div className={classes.reviews}>
              <h4 className={classes.reviewHeading}>Reviews</h4>
              {reviews.map((review) => (
                <Review key={review._id} review={review} />
              ))}
              <div className={classes.btnContainer}>
                {reviews.length === 0 && (
                  <div className={classes.noReview}>No reviews yet</div>
                )}
                {status === 'authenticated' ? (
                  <Button className={classes.reviewBtn}>
                    <Link
                      href={`/campgrounds/review/${campInfo._id}`}
                      className={classes.Link}
                    >
                      <img
                        src='/Assets/Chat Bubble.svg'
                        alt='add review button'
                      />
                      Leave a review
                    </Link>
                  </Button>
                ) : (
                  <Button className={classes.reviewBtn}>
                    <Link href='/account/login' className={classes.Link}>
                      <img
                        src='/Assets/Login.svg'
                        alt='can not review please login to review'
                      />
                      Login to review
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </main>
      }
      <Footer className={classes.footer} />
    </main>
  );
};

export default CampGroundPage;

export async function getServerSideProps({ params }) {
  await connectToDatabase(mongoose.connection.readyState);
  const { campId } = params;
  const foundedCamp = await CampModel.findById(campId);
  return {
    props: {
      campInfo: JSON.parse(JSON.stringify(foundedCamp)),
    },
  };
}
