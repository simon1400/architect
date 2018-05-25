//prod.js - production keys here!
module.exports = {
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOCIE_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET
};
