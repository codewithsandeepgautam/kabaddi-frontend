import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/login';
import Signup from './pages/signup';
import ProtectedRoute from "./utils/protectedRoute";
import { AccountProvider } from './utils/accountContext';
import ManageGame from './pages/managegame';
import Editscorecamera from './pages/editscorecamera';
import Editscoreopposite from './pages/editscoreopposite';
import LiveScreen from './pages/liveScreen';
function App() {
  return (
    <AccountProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="" element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/manageGame" element={<ManageGame />} />
            <Route path="/editscorecamera" element={<Editscorecamera />} />
            <Route path="/editscoreopposite" element={<Editscoreopposite />} />
            <Route path="/live" element={<LiveScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AccountProvider>
  );
}


export default App;
