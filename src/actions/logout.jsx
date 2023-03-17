import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helper
import { deleteItem } from "../helper";

export async function logoutAction() {
  // redirect to home page
  deleteItem({
    key: "userName",
  });
  deleteItem({
    key: "expenses",
  });
  deleteItem({
    key: "budgets",
  });
  toast.success("you've deleted your account!");

  return redirect("/");
}
