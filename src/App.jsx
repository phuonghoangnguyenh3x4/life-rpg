import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Test from './pages/Test';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
              path="/home"
              element={<ProtectedRoute element={<Home />} />}
          />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
