"use client";
import { useEffect, useState } from 'react';
import { fetchCountries } from './utils/api';
import CountryTable from './components/CountryTable';
import Loader from './components/Loader';
import Pagination from './components/Pagination';

const Home = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const countriesPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCountries();
                setCountries(data);
            } catch (error) {
                console.error('Error fetching countries:', error);
                setError('Failed to load countries.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div className="error text-red-500 text-center">{error}</div>;
    }

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);
    const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

    return (
        <div className="container mx-auto p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 text-center">Available Countries</h1>
            <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-6 p-3 w-full max-w-md border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <CountryTable countries={currentCountries} />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default Home;
