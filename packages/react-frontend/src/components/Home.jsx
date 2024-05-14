const HomePage = () => {
  const sidebarButtonColor = "#F38D8D";

  return (
    <div className="d-flex flex-column bg-light" style={{ 
        backgroundColor: "#FFF5F5", 
        paddingLeft: "20px", 
        flex: 1,
        paddingTop: "20px",
        paddingRight: "20px"
        }}>
      <header className="sticky-top bg-white mb-4 p-3 rounded" style={{ borderBottom: `4px solid ${sidebarButtonColor}`}}>
        <h1>Home</h1>
        <hr />
      </header>
      <main className="container-fluid">
        <div className="row">
          <div className="col-12">
            <section className="mb-5 p-3 bg-white rounded">
              <h2 className="text-decoration-underline mb-3" style={{ color: sidebarButtonColor }}>General</h2>
              {/* General tasks content goes here */}
            </section>
          </div>
          <div className="col-12">
            <section className="mb-5 p-3 bg-white rounded">
              <h2 className="text-decoration-underline mb-3" style={{ color: sidebarButtonColor }}>Top 5</h2>
              {/* Top 5 tasks content goes here */}
            </section>
          </div>
          <div className="col-12">
            <section className="mb-5 p-3 bg-white rounded">
              <h2 className="text-decoration-underline mb-3" style={{ color: sidebarButtonColor }}>Physics</h2>
              {/* Physics content goes here */}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};
  
  export default HomePage;