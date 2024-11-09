const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/dotenvConfig');
const countryRoutes = require('./routes/countryRoutes');

const app = express();

app.use(cors());
app.use('/api', countryRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
