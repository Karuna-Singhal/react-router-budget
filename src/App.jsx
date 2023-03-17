import { createBrowserRouter, RouterProvider } from "react-router-dom";

// library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// actions
import { logoutAction } from "./actions/logout";
import { deleteBudget } from "./actions/deletebudget";

// layouts
import Main, { mainLoader } from "./layouts/Main";

// Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./Pages/Dashboard";
import Error from "./Pages/Error";
import ExpensesPage, {
  expenseAction,
  expensesLoader,
} from "./Pages/ExpensesPage";
import BudgetPage, { budgetLoader, budgetAction } from "./Pages/BudgetPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteBudget,
          },
        ],
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expenseAction,
        errorElement: <Error />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
