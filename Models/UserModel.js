import { Schema, models, model } from 'mongoose';

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  rawPassword: {
    type: String,
  },
});

module.exports = models.Users || model('Users', userSchema);
