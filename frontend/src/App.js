import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // ✅ new import
import EntertainersList from './pages/EntertainersList';
import EntertainerDetails from './pages/EntertainerDetails';
import AddEntertainer from './pages/AddEntertainer';
import EditEntertainer from './pages/EditEntertainer';
import Navbar from './components/Navbar'; // ✅ already included

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* ✅ New landing page */}
        <Route path="/entertainers" element={<EntertainersList />} />
        <Route path="/entertainers/:id" element={<EntertainerDetails />} />
        <Route path="/add" element={<AddEntertainer />} />
        <Route path="/edit/:id" element={<EditEntertainer />} />
      </Routes>
    </Router>
  );
}

export default App;
