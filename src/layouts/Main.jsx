import { useLoaderData, Outlet } from "react-router-dom";

// components
import Nav from "../Components/Nav";

// assets
import wave from "../assets/wave.svg";

// helper function
import { fetchData } from "../helper";

// Loader
export const mainLoader = () => {
  const userName = fetchData("userName");

  return { userName };
};

export default function Main() {
  const { userName } = useLoaderData();
  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  );
}
