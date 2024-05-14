const HomePage = () => {
  const sidebarButtonColor = '#F38D8D'; // Define the sidebar button color as a variable

  return (
    <div className="d-flex flex-column flex-grow-1 bg-light p-3" style={{ backgroundColor: '#FFF5F5' }}>
      <header className="sticky-top bg-white mb-4 p-3 rounded" style={{ borderBottom: `4px solid ${sidebarButtonColor}` }}>
        <h1>Home</h1>
        <hr />
      </header>
      <main>
        <section className="mb-5 p-3 bg-white rounded">
          <h2 className="text-decoration-underline mb-3" style={{ color: sidebarButtonColor }}>General</h2>
          {/* General tasks content goes here */}
        </section>
        <section className="mb-5 p-3 bg-white rounded">
          <h2 className="text-decoration-underline mb-3" style={{ color: sidebarButtonColor }}>Top 5</h2>
          {/* Top 5 tasks content goes here */}
        </section>
        <section className="mb-5 p-3 bg-white rounded">
          <h2 className="text-decoration-underline mb-3" style={{ color: sidebarButtonColor }}>Physics</h2>
          {/* Physics content goes here */}
        </section>
        {/* Each folder will be a section, can display all tasks */}
      </main>
    </div>
  );
};

export default HomePage;