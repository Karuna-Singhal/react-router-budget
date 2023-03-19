import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

// helper
import { deleteItem, getAllMatchingItem } from "../helper";

export async function deleteBudget({ params }) {
  // redirect to home page
  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });

    const asscoiatedExpenses = getAllMatchingItem({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });

    asscoiatedExpenses.forEach((expense) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });

    toast.success("you've deleted your budget!");
  } catch (err) {
    throw new Error("There was a problem deleting your budget.");
  }

  return redirect("/");
}
