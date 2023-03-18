import { useLoaderData, Link } from "react-router-dom";

// helper
import {
  createExpense,
  createBudget,
  fetchData,
  wait,
  deleteItem,
} from "../helper";

// components
import Intro from "../Components/intro";
import AddBudgetForm from "../Components/addBudgetForm";
import AddExpenseForm from "../Components/addExpenseForm";
import BudgetItem from "../Components/budgetItem";
import Table from "../Components/table";

// library
import { toast } from "react-toastify";

// action
export async function dashboardAction({ request }) {
  await wait();
  const data = await request.formData();

  const { _action, ...value } = Object.fromEntries(data);
  console.log(value);
  // new user submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(value.userName));
      return toast.success(`Welcome ,${value.userName}`);
    } catch (err) {
      throw new Error("There was a problem creating your account");
    }
  }

  // user create budget action
  if (_action === "createBudget") {
    try {
      // create budget
      createBudget({
        name: value.newBudget,
        amount: value.newBudgetAmount,
      });
      return toast.success("Budget created!");
    } catch (err) {
      throw new Error("There was a problem creating your account");
    }
  }

  // user create budget expense action

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

  // delte expenses
  if (_action === "deleteExpense") {
    try {
      // delete expenses
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

// Loader
export const dashboardLoader = () => {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");

  return { userName, budgets, expenses };
};

export default function Dashboard() {
  const { userName, budgets, expenses } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budget</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>
                    <Table
                      expenses={expenses.sort(
                        (a, b) => b.createdAt - a.createdAt
                      )}
                    />
                    {expenses.length > 8 && (
                      <Link to="expenses" className="btn btn--dark">
                        View all expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
}
