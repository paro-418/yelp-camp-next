import ReviewModel from '../../../../../Models/ReviewModel';
import connectToDatabase from '../../../../../lib/connectToDatabase';
import mongoose from 'mongoose';
export default async function handler(req, res) {
  connectToDatabase(mongoose.connection?.readyState);

  const { campId } = req.query;
  const { review, username, id } = req.body;

  if (review === '') {
    res.status(400).json({
      status: 'failed',
      message: 'please enter valid review',
    });
  }

  const newReview = await ReviewModel.create({
    reviewerId: id,
    reviewerName: username,
    reviewedCamp: campId,
    review,
  });

  res.status(201).json({
    status: 'success',
    data: newReview,
  });
}
