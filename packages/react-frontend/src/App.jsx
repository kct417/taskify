import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "./Sidebar";
import HomePage from "./HomePage";

function App() {
  return (
    <div className="d-flex">
      <Sidebar />
      <HomePage />
    </div>
  );
}

export default App;