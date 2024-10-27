import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const OutcomeChart = ({ data, metrics }) => {
    // Define colors for each metric
    const metricColors = {
        cases: '#1e90ff',      // Blue for Cases
        deaths: '#ff6347',     // Red for Deaths
        recovered: '#32cd32'   // Green for Recovered
    };

    return (
        <div style={{ width: '100%', padding: '20px 0' }}>
            <h3 style={{ textAlign: 'center' }}>COVID-19 Outcomes Bar Chart</h3>
            <ResponsiveContainer width="95%" height={500}>
                <BarChart
                    data={data}
                    barGap={5}
                    margin={{ top: 20, right: 30, left: 60, bottom: 120 }} // Increased left and bottom margins
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    {/* X-Axis with Country Names, showing every nth label */}
                    <XAxis 
                        dataKey="country" 
                        tick={{ angle: -30, textAnchor: 'end', fontSize: 12 }} // Slightly increased font size
                        interval={8}  // Show every 8th label (adjust as needed for readability)
                        height={100}  // Add height to accommodate rotated labels
                    />

                    {/* Y-Axis with Formatting for Large Numbers */}
                    <YAxis 
                        tickFormatter={(value) => value.toLocaleString()} // Format numbers with commas
                        label={{ value: 'Count', angle: 0, position: 'insideLeft', dy: -150, fontSize: 14 }} // Y-axis label with adjusted font size
                    />

                    <Tooltip formatter={(value) => value.toLocaleString()} /> {/* Tooltip with formatted numbers */}
                    <Legend verticalAlign="top" />

                    {/* Render a bar for each selected metric */}
                    {metrics.map((metric) => (
                        <Bar
                            key={metric}
                            dataKey={metric}
                            fill={metricColors[metric]}
                            name={metric.charAt(0).toUpperCase() + metric.slice(1)} // Capitalize the metric name for legend and tooltip
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default OutcomeChart;
