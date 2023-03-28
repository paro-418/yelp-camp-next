export default async function signup(req, res) {
  return res.status(200).json({
    data: 'signup request received',
  });
}
