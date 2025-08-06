import { Outlet } from "react-router-dom";
import { MobileNavbar } from "../components/navbar-driver";

export const MotoristaLayout = () => {
  return (
    <div>
      <header>
        <MobileNavbar/>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

