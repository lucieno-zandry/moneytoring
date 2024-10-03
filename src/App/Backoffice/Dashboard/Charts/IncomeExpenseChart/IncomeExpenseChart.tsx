import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { COLOR_DANGER, COLOR_PRIMARY } from '../../../../../core/config/constants/constants';
import Icon from '../../../../../partials/Icon/Icon';

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

export default React.memo(() => {
    return <div className='p-2 bg-dark rounded col-xs-12 col-sm'>
        <h6 className="display-6"><Icon variant='arrow-up-arrow-down' /> Incomes and Expenses</h6>
        <ResponsiveContainer width="100%" height={200}>
            <LineChart width={600} height={200} data={data}>
                <Line type="monotone" dataKey="pv" stroke={COLOR_PRIMARY} strokeWidth={2} />
                <Line type="monotone" dataKey="uv" stroke={COLOR_DANGER} strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    </div>
})