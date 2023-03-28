import { Schema, model, models } from 'mongoose';

const campSchema = Schema(
  {
    campName: {
      type: String,
      required: true,
      min: 3,
    },

    price: {
      type: Number,
      required: true,
    },

    campImage: {
      type: String,
      required: true,
    },

    campDescription: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    createdBy: {
      type: String,
    },
  },
  {
    timeStamps: true,
  }
);

// we use models.Camps and then the || operator and then use the model function by mongoose. We do that because we don't want to create a new model every single time we hit an API route in Next.js
module.exports = models.Camps || model('Camps', campSchema);
