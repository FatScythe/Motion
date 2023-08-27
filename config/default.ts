export default {
  port: 5000 || process.env.PORT,
  dbURI: process.env.MONGO_URI,
  saltRounds: 10,
  JWT: process.env.JWT_SECRET,
};
