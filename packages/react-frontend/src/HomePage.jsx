import './HomePage.css';

const HomePage = () => {
    return (
        <div className="todo-list-home">
            <header>
                <h1>Home</h1>
                <hr />
            </header>
            <main>
                <section className="section">
                    <h2>General</h2>
                    {/* General tasks content goes here */}
                </section>
                <section className="section">
                    <h2>Top 5</h2>
                    {/* Top 5 tasks content goes here */}
                </section>
                <section className="section">
                    <h2>Physics</h2>
                    {/* Physics content goes here */}
                </section>
                {/* Each folder will be a section, can display all tasks */}
            </main>
        </div>
    );
}

export default HomePage;