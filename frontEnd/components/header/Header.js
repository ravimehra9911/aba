import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import MainMenu from "./MainMenu";
import Menu from "./Menu";
import MenuTitle from "./MenuTitle";
import ContactUs from "./ContactUs";
import fetchData from "@/utils/api";

const Header = () => {
  const [category, setCategory] = useState();

  useEffect(() => {
    categoryMenu();
  }, []);

  const categoryMenu = async () => {
    const { data } = await fetchData(
      "/api/categories?populate[courses][populate][0]=*"
    );
    setCategory(data);
  };

  return (
    <>
      {/* <header className="relative md:max-w-[478px] md:w-1/4 md:fixed md:border-x md:border-black md:h-screen md:flex md:justify-between md:flex-col md:overflow-y-auto"> */}
      {/* <header className="md:border-x md:border-black"> */}
      <header className="max-w-[478px] md:w-1/4 md:fixed md:border-x md:border-black md:h-screen md:flex md:justify-between md:flex-col md:overflow-y-auto">
        <div>
          <Logo />
          <MainMenu />
          <MenuTitle />
          <Menu category={category} />
        </div>
        <div className="hidden md:block">
          <ContactUs />
        </div>
      </header>
    </>
  );
};

export default Header;
