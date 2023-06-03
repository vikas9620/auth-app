import { Outlet , Route, Routes } from 'react-router-dom';


import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Layout>
    <Outlet />
    <Routes>
    <Route path="/" element={<HomePage />} exact/>
    <Route path="/auth" element={<AuthPage />} />
    <Route path="/profile" element={<UserProfile />} />
    
    </Routes>
    </Layout>
  );
}

export default App;
