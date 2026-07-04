export default function ExpenseForm({refresh}){
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [type, setType] = useState("expense");

    const addExpense = async() => {
        await api.post("/expenses", {
            title,
            amount,
            category,
            type,
        });

        refresh();
    };

    return(
        <div>
            <h3>Add Expense</h3>

            <input placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
            <input placeholder="Amount" onChange={(e) => setAmount(e.target.value)}/>
            <input placeholder="Category" onChange={(e) => setCategory(e.target.value)}/>

            <select onChange={(e) => setType(e.target.value)}>
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
            </select>

            <button onClick={addExpense}>Add</button>
        </div>
    );
}