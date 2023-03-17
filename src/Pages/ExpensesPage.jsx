import { useLoaderData } from "react-router-dom";
import { fetchData, deleteItem } from "../helper";

// library
import { toast } from "react-toastify";

// componenet
import Table from "../Components/table";

// action
export async function expenseAction({ request }) {
  const data = await request.formData();
  const { _action, ...value } = Object.fromEntries(data);
  if (_action === "deleteExpense") {
    try {
      // create budget
      deleteItem({
        key: "expenses",
        id: value.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (err) {
      throw new Error("There was a problem creating your account");
    }
  }
}

// loader
export async function expensesLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
}

export default function ExpensesPage() {
  const { expenses } = useLoaderData();
  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No Expenses to show</p>
      )}
    </div>
  );
}
