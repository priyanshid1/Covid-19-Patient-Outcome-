import React from 'react';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';

const DataTable = ({ data, setData }) => {
    const settings = {
        data,
        colHeaders: ['Country', 'Cases', 'Deaths', 'Recovered', 'Active', 'Critical'],
        columns: [
            { data: 'country', type: 'text' },
            { data: 'cases', type: 'numeric', validator: (value, callback) => callback(value >= 0) },
            { data: 'deaths', type: 'numeric', validator: (value, callback) => callback(value >= 0) },
            { data: 'recovered', type: 'numeric', validator: (value, callback) => callback(value >= 0) },
            { data: 'active', type: 'numeric', validator: (value, callback) => callback(value >= 0) },
            { data: 'critical', type: 'numeric', validator: (value, callback) => callback(value >= 0) },
        ],
        columnSorting: true,
        contextMenu: true,
        afterChange: (changes) => {
            if (changes) {
                setData([...data]);
            }
        },
        licenseKey: 'non-commercial-and-evaluation',
    };

    return <HotTable settings={settings} />;
};

export default DataTable;
