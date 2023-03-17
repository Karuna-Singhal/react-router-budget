import { useLoaderData } from "react-router-dom";

// component
import BudgetItem from "../Components/budgetItem";
import AddExpenseForm from "../Components/addExpenseForm";
import Table from "../Components/table";

// helper
import { getAllMatchingItem, deleteItem, createExpense } from "../helper";

// library
import { toast } from "react-toastify";

// loader
export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItem({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItem({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget you're trying to find doesn't exist");
  }

  return { budget, expenses };
}

// action
export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...value } = Object.fromEntries(data);

  if (_action === "createExpense") {
    try {
      // create budget
      createExpense({
        name: value.newExpense,
        amount: value.newExpenseAmount,
        budgetId: value.newExpenseBudget,
      });
      return toast.success(`Expense ${value.newExpense}created!`);
    } catch (err) {
      throw new Error("There was a problem creating your account");
    }
  }

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

export default function BudgetPage() {
  const { budget, expenses } = useLoaderData();
  return (
    <div
      className="grid-lg"
      style={{
        "--accent": budget.color,
      }}
    >
      <h1 className="h2">
        <span className="accent">{budget.name}</span>
        Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">
              {budget.name}
              Expenses
            </span>
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
}
