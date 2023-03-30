import axios from 'axios';
export default async function signup({ password, username }) {
  try {
    // requesting backend to process & simple validating logic here
    await axios.post('/api/auth/sign-up', { password, username });
  } catch (err) {
    console.log(`CAN NOT SIGNUP`, err);
  }
}
