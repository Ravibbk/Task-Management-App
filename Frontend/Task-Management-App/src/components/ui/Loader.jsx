const Loader = ({ fullPage = false }) => {
  if (fullPage) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
          gap: "16px",
        }}
      >
        <div className="spinner" />
        <p style={{ color: "var(--text-muted)", fontSize: "14px", fontFamily: "'Satoshi', sans-serif" }}>
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
      <div className="spinner" />
    </div>
  );
};

export default Loader;