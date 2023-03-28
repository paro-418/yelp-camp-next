import ReviewModel from '../../../../../Models/ReviewModel';
import connectToDatabase from '../../../../../lib/connectToDatabase';

export default async function handler(req, res) {
  connectToDatabase();
  const { campId } = req.query;
  let allReviews;
  try {
    allReviews = await ReviewModel.find({
      reviewedCamp: campId,
    });
  } catch (err) {
    console.log(err);
  }
  res.status(200).json({
    status: 'Success',
    allReviews,
  });
}
