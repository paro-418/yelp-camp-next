import CampModel from '../../../Models/CampModel';
import connectToDatabase from '../../../lib/connectToDatabase';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  await connectToDatabase(mongoose.connection?.readyState);
  const { campName, campImage, category, createdBy, campDescription, price } =
    req.body;

  const newCamp = await CampModel.create({
    campDescription,
    campImage,
    campName,
    price,
    createdBy,
    category,
  });
  res.status(201).json({
    status: 'success',
    data: newCamp,
  });
}
