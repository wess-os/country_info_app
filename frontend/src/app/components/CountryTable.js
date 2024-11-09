"use client";
import React from 'react';
import Link from 'next/link';

const CountryTable = ({ countries }) => {
    return (
        <table className="min-w-full bg-white border border-gray-300 shadow-md overflow-hidden">
            <thead className="bg-gray-200">
                <tr>
                    <th className="py-3 px-4 border-b text-left text-gray-600">Country Name</th>
                    <th className="py-3 px-4 border-b text-left text-gray-600">Action</th>
                </tr>
            </thead>
            <tbody>
                {countries.length === 0 ? (
                    <tr>
                        <td colSpan="2" className="py-3 px-4 text-center text-gray-600">No countries found.</td>
                    </tr>
                ) : (
                    countries.map(country => (
                        <tr key={country.countryCode} className="hover:bg-gray-100">
                            <td className="py-3 px-4 border-b">{(country.name) ? country.name : country.commonName}</td>
                            <td className="py-3 px-4 border-b">
                                <Link href={`/country/${country.countryCode}`}>
                                    <button className="text-blue-500 hover:underline">
                                        View Details
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default CountryTable;
