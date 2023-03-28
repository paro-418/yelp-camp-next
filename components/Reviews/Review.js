import React from 'react';
import classes from './Review.module.css';

const Review = ({ review }) => {
  const now = new Date(Date.now()).getTime();
  const postedAt = new Date(review.createdAt).getTime();

  const milliSeconds = now - postedAt;
  const seconds = +(milliSeconds / 1000).toFixed();
  const minutes = +(seconds / 60).toFixed();
  const hours = Math.floor(+(minutes / 60));
  const days = Math.floor(+hours / 24).toFixed();
  const months = Math.floor(+days / 30.5).toFixed();
  const years = Math.floor(+months / 12).toFixed();

  let output = `${years} year ago`;
  if (years < 1) output = `${months} months ago`;
  if (months < 1) output = `${days} days ago`;
  if (days < 1) output = `${hours} hours ago`;
  if (hours < 1) output = `${minutes} minutes ago`;
  if (minutes < 1) output = `${seconds} secs ago`;

  return (
    <div className={classes.review}>
      <div className={classes.nameTime}>
        <h3>{review.reviewerName}</h3>
        <time>{output}</time>
      </div>
      <blockquote className={classes.blockquote}>{review.review}</blockquote>
    </div>
  );
};

export default Review;
