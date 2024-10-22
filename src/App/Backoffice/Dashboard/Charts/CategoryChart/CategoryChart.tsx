import React from "react";
import { Cell, Pie, PieChart } from "recharts";
import { COLORS, MODELS_DATA } from "../../../../../core/config/constants/constants";
import Icon from "../../../../../partials/Icon/Icon";

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

export default React.memo(() => {
    return <div className="bg-dark rounded p-2 col-xs-12 col-sm">
        <h6 className="display-6"><Icon variant={MODELS_DATA.categories.icon} /> Categories</h6>
        <div className="d-flex justify-content-center">
            <PieChart width={200} height={200}>
                <Pie
                    data={data}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value">
                    {data.map((entry, index) => {
                        entry;
                        return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    })}
                </Pie>
            </PieChart>
        </div>
    </div>
});