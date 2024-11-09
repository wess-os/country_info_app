import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchCountries = async () => {
    const response = await axios.get(`${API_URL}/countries`);
    return response.data;
};

export const fetchCountryDetails = async (code) => {
    const response = await axios.get(`${API_URL}/country/${code}`);
    return response.data;
};
