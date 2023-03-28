import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import classes from './CampGround.module.css';
import Link from 'next/link';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import login from '../../utils/login';

const CampGroundPage = () => {
  const isLoggedIn = login();
  const allReviews = [];
  const { campId } = useRouter();
  //   const [campInfo, setCampInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const campInfo = {
    capImage: '',
    campDescription: 'abdkcmejcbeo sdcn cdjs cd sc sdsd c l l',
    createdBy: 'paro',
  };

  return (
    <main>
      <Header className={classes.header} />
      {loading ? (
        <Loading />
      ) : (
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
              {allReviews.map((review) => (
                <Review key={review._id} review={review} />
              ))}
              <div className={classes.btnContainer}>
                {allReviews.length === 0 && (
                  <div className={classes.noReview}>No reviews yet</div>
                )}
                {isLoggedIn ? (
                  <Button className={classes.reviewBtn}>
                    <Link
                      href={`/campgrounds/review/${campId}`}
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
                    <Link href='/login' className={classes.Link}>
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
      )}
      <Footer className={classes.footer} />
    </main>
  );
};

export default CampGroundPage;
