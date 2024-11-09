const express = require('express');
const axios = require('axios');
const { URL_API_ONE, URL_API_TWO } = require('../config/dotenvConfig');

const router = express.Router();

router.get('/countries', async (req, res) => {
    try {
        const response = await axios.get(`${URL_API_ONE}AvailableCountries`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching countries:', error);
        res.status(500).json({ error: 'Failed to fetch countries', details: error.message });
    }
});

router.get('/country/:code', async (req, res) => {
    const countryCode = req.params.code;
    try {
        const bordersResponse = await axios.get(`${URL_API_ONE}CountryInfo/${countryCode}`);
        const populationResponse = await axios.get(`${URL_API_TWO}countries/population`);
        const flagResponse = await axios.get(`${URL_API_TWO}countries/flag/images`);

        res.json({
            borders: bordersResponse.data,
            population: populationResponse.data,
            flag: flagResponse.data,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch country info' });
    }
});

module.exports = router;
