import { Outlet } from "react-router-dom";
import { Header } from "./components";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
