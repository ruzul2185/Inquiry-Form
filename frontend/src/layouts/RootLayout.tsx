import { Outlet } from "react-router";
import Header from "@/components/custom/Header";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* renders child routes */}
      </main>
      {/* <footer>My App Footer</footer> */}
    </>
  );
}

export default RootLayout;