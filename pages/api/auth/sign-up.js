import bcrypt from 'bcrypt';
import UserModel from '../../../Models/UserModel';

export default async function register(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({
      message: 'Invalid Route. This route only accepts POST request',
    });

  try {
    const { username, password } = req.body;

    const existingUser = await UserModel.find({
      username,
    });

    if (existingUser.length === '0')
      return res.status(422).json({
        message: 'username already taken',
      });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await UserModel.create({
      username,
      password: hashedPassword,
      rawPassword: password,
    });

    // const createdUser = await newUser.save();

    res.status(200).json({
      message: 'success',
      data: newUser,
    });
  } catch (err) {
    console.log('CAN NOT CREATE USER', err);
    res.status(500).json({
      message: 'user creation failed',
    });
  }
}
