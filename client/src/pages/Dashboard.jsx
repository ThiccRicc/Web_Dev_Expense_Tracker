import ExpenseList from "../components/ExpenseList";
import ExpenseForm from "../components/ExpenseForm";
import Chart from "../components/Chart";

export default function Dashboard(){
    const [expenses, setExpenses] = useState([]);

    const fetchExpenses = async() => {
        const res = await api.get("/expenses");
        setExpenses(res.data);
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return(
        <div>
            <h1>Expense Dashboard</h1>

            <ExpenseForm refresh={fetchExpenses}/>
            <Chart expenses={expenses}/>
            <ExpenseList expenses={expenses} refresh={fetchExpenses}/>
        </div>
    );
}