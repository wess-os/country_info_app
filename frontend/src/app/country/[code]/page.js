"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchCountryDetails } from '../../utils/api';
import CountryTable from '../../components/CountryTable';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';
import Link from 'next/link';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import { FaArrowAltCircleLeft } from "react-icons/fa";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const CountryDetails = ({ params }) => {
    const code = React.use(params).code;
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [populationData, setPopulationData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const countriesPerPage = 5;

    useEffect(() => {
        if (code) {
            const fetchCountryDetailsData = async () => {
                try {
                    const data = await fetchCountryDetails(code);
                    setCountry(data);
                    const populationInfo = data.population.data;
                    const countryPopulation = populationInfo.find(item => item.country === data.borders.commonName);
                    if (countryPopulation) {
                        setPopulationData(countryPopulation.populationCounts);
                    }
                } catch (error) {
                    console.error('Error fetching country details:', error);
                    setError('Failed to load country details.');
                } finally {
                    setLoading(false);
                }
            };
            fetchCountryDetailsData();
        }
    }, [code]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div className="error text-red-500 text-center">{error}</div>;
    }

    if (!country) {
        return null;
    }

    const flagData = country.flag.data.find(flag => flag.name === country.borders.commonName);
    const flagUrl = flagData ? flagData.flag : null;

    const filteredCountries = country.borders.borders.filter(borderCountry =>
        borderCountry.commonName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);
    const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

    const chartData = {
        labels: populationData.map(data => data.year),
        datasets: [
            {
                label: 'Population',
                data: populationData.map(data => data.value),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg">
            <Link title='Back to countries list' href="/" className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                <FaArrowAltCircleLeft />
            </Link>

            <div className="flex flex-col items-center mb-4">
                {flagUrl && <img src={flagUrl} alt={`Flag of ${country.borders.commonName}`} className="w-16 h-10 mb-4 rounded shadow" />}
                <h1 className="text-4xl font-bold text-gray-800 text-center">{country.borders.commonName}</h1>
            </div>

            <div className="borders mt-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Countries that border {country.borders.commonName}:
                    </h2>
                    <div className="flex justify-center mt-4">
                        <input
                            type="text"
                            placeholder="Search bordering countries..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mb-4 p-3 w-full max-w-md border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <CountryTable countries={currentCountries} />

                {/* Centralizando os botões de paginação */}
                <div className="flex justify-center items-center mt-6">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>

            <div className="population-chart mt-6 text-center">
                <h2 className="text-3xl font-bold text-gray-800">Population Over Time</h2>
                <Line data={chartData} />
            </div>
        </div>
    );
};

export default CountryDetails;
