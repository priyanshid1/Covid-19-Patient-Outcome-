import React, { useEffect, useState } from 'react';

const Filter = ({ filter, setFilter, data }) => {
    const [countryOptions, setCountryOptions] = useState([]);

    // Populate unique countries from data
    useEffect(() => {
        const uniqueCountries = Array.from(new Set(data.map(item => item.country)));
        setCountryOptions(uniqueCountries);
    }, [data]);

    // Handle multiple selection for countries
    const handleCountryChange = (event) => {
        const selectedCountries = Array.from(event.target.selectedOptions, option => option.value);
        setFilter({ ...filter, country: selectedCountries });
    };

    // Handle multiple selection for metrics
    const handleMetricChange = (event) => {
        const selectedMetrics = Array.from(event.target.selectedOptions, option => option.value);
        setFilter({ ...filter, metrics: selectedMetrics });
    };

    return (
        <div className="filter">
           
            <label> Country:</label>
                <select
                    multiple
                    value={filter.country}
                    onChange={handleCountryChange}
                >
                    <option value="All">All</option>
                    {countryOptions.map((country) => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            

            <label>
                Metrics: </label>
                <select
                    multiple
                    value={filter.metrics}
                    onChange={handleMetricChange}
                >
                    <option value="cases">Cases</option>
                    <option value="deaths">Deaths</option>
                    <option value="recovered">Recovered</option>
                </select>
           

            <label>
                Min Value: 
                <input
                    type="number"
                    placeholder="Enter minimum value"
                    value={filter.minValue}
                    onChange={(e) => setFilter({ ...filter, minValue: e.target.value === '' ? 0 : parseInt(e.target.value, 10) })}
                    min="0"
                />
           </label>
        </div>
    );
};

export default Filter;
