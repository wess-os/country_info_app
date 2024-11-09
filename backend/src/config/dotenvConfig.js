const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT || 5000,
    URL_API_ONE: process.env.URL_API_ONE,
    URL_API_TWO: process.env.URL_API_TWO,
};
