import axios from 'axios';
export default async function signup({ password, username }) {
  try {
    await axios.post('/api/auth/sign-up',{password, username});
  } catch (err) {
    console.log(`CAN NOT SIGNUP`, err);
  }
}
