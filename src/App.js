import React, { useState, useEffect } from 'react';
import DataTable from './components/DataTable';
import OutcomeChart from './components/OutcomeChart';
import Filter from './components/Filter';
import Navbar from './components/Navbar';
import './App.css';

const App = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({
        country: ['All'],
        metrics: ['cases'],  // Default to "Cases"
        minValue: 0          // Minimum value for the selected metric
    });
    const [activeTab, setActiveTab] = useState('data');

    const API_URL = 'https://disease.sh/v3/covid-19/countries';

    // Fetch data from the API on component mount
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(API_URL);
            const outcomes = await response.json();
            
            const transformedData = outcomes.map((outcome) => ({
                country: outcome.country,
                cases: outcome.cases,
                deaths: outcome.deaths,
                recovered: outcome.recovered || 0, // Default to 0 if null
                active: outcome.active,
                critical: outcome.critical
            }));
            setData(transformedData);
        };

        fetchData();
    }, []);

    // Filter data based on selected country, metrics, and minimum value
    const filteredData = data.filter((item) => {
        const countryMatch = filter.country.includes('All') || filter.country.includes(item.country);
        
        // Apply the minimum value filter across all selected metrics
        const metricMatch = filter.metrics.every(metric => item[metric] >= filter.minValue);
        
        return countryMatch && metricMatch;
    });

    return (
        <>
            <Navbar />
            <div className="App">
                <h1>COVID-19 Patient Outcome Dashboard</h1>
                <div className="filter-container">
                {/* Pass the data and filter state to the Filter component */}
                <Filter filter={filter} setFilter={setFilter} data={data} />
                </div>

                {/* Tab Navigation for Data and Chart Views */}
                <div className="tab-navigation">
                    <button 
                        className={activeTab === 'data' ? 'tab active' : 'tab'}
                        onClick={() => setActiveTab('data')}
                    >
                        Data
                    </button>
                    <button 
                        className={activeTab === 'chart' ? 'tab active' : 'tab'}
                        onClick={() => setActiveTab('chart')}
                    >
                        Chart
                    </button>
                </div>

                {/* Display DataTable or OutcomeChart based on active tab */}
                <div className="chart-container">
                    {activeTab === 'data' ? (
                         <div className="data-table-container">
                        <DataTable data={filteredData} setData={setData} /> </div>
                    ) : (
                        <OutcomeChart data={filteredData} metrics={filter.metrics} />
                    )}
                </div>
            </div>
        </>
    );
};

export default App;
