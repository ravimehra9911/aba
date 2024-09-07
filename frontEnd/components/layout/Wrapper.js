const Wrapper = ({ children }) => {
  return (
    // <div className="w-full relative mx-auto xxl:w-[1440px]">{children}</div>
    <div className="w-full h-screen md:flex mx-auto">{children}</div>
  );
};

export default Wrapper;
