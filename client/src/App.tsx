import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Example from './pages/example';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { packersTheme } from "./theme/PackersTheme";
import WofNavBar from './components/navigation/WofNavBar';
import Product from './pages/product';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/route/ProtectedRoute';
import Admin from './pages/admin';
import Tracking from './pages/tracking';
import Reports from './pages/reports';
import Error from './pages/error';
import { auth } from './firebase';
import WofAuth from './components/authentication/WofAuth';

const App: React.FC = () => {
  return <ThemeProvider theme={packersTheme}>
    <AuthProvider>
      <WofAuth />
      <WofNavBar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route index={true} element={<Home />} />
          <Route path='/products' element={<Product />} />
          <Route path='/example/:rpname?' element={<Example fcname={'functional component props'}/>} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/tracking' element={<Tracking />} />
          <Route path='/reports' element={<Reports />} />
        </Route>

        <Route path='/sign-in' element={<Login />} />
        <Route path="*" element={<Error />}/>
      </Routes>
    </AuthProvider>
  </ThemeProvider>
};
export default App;