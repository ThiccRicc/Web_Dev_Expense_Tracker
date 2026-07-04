import{
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import {Pie} from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart({expenses}){
    const income = expenses.filter((e) => e.type === "income").reduce((a,b) => a + b.amount, 0);
    const expense = expenses.filter((e) => e.type === "expense").reduce((a,b) => a + b.amount, 0);

    const data = {
        labels: ['Income', 'Expense'],
        datasets: [
            {
                data: [income, expense],
            },
        ],
    };

    return <Pie data={data}/>;
}