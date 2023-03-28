import { Schema, models, model } from 'mongoose';

const reviewSchema = Schema(
  {
    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    reviewerName: {
      type: String,
      required: true,
    },
    reviewedCamp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Camps',
      required: true,
    },
    review: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
//we use models.Test and then the logical OR operator and then use the model function by mongoose. We do that because we don't want to create a new model every single time we hit an API route in Next.js
module.exports = models.Reviews || model('Reviews', reviewSchema);
