import bcryptjs from 'bcryptjs';
import UserModel from '../../../Models/UserModel';

export default async function register(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({
      message: 'Invalid Route. This route only accepts POST request',
    });

  if (!req.body)
    return res.status(404).json({
      error: 'Insufficient credentials',
    });

  try {
    const { username, password } = req.body;

    const existingUser = await UserModel.findOne({
      username,
    });

    if (existingUser)
      return res.status(422).json({
        message: 'username already taken',
      });

    const hashedPassword = await bcryptjs.hash(password, 12);

    const newUser = await UserModel.create({
      username,
      password: hashedPassword,
      rawPassword: password,
    });

    res.status(201).json({
      message: 'success',
      user: newUser,
    });
  } catch (err) {
    console.log('CAN NOT CREATE USER', err);
    res.status(500).json({
      message: 'user creation failed',
    });
  }
}
