import api from "../api/axios";

export default function ExpenseList({expenses, refesh}){

    const deleteExpense = async(id) => {
        await api.delete(`/expenses/${id}`);
        refresh();
    };

    return(
        <div>
            <h3>Expenses</h3>

            {expenses.map((exp) => (
                <div key={exp._id}>
                    <p>
                        {exp.title} - ${exp.amount}
                    </p>

                    <button onClick={() => deleteExpense(exp._id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}