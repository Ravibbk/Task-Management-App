const MainLayout = ({ children }) => {
  return (
    <div
      className="gradient-bg"
      style={{ minHeight: "100vh", position: "relative", zIndex: 0 }}
    >
      {children}
    </div>
  );
};

export default MainLayout;