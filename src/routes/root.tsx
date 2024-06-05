import { Outlet } from "react-router-dom";
import { Header } from "../components/header/header";
//import App from "../app/App";

export const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
