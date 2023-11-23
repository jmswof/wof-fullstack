import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Example from './pages/example';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { packersTheme } from "./theme/PackersTheme";
import WofNavBar from './components/navigation/WofNavBar';
import Product from './pages/product';
import { AuthContext, AuthType } from './context/AuthContext';
import ProtectedRoute from './components/route/ProtectedRoute';
import Admin from './pages/admin';
import Tracking from './pages/tracking';
import Reports from './pages/reports';
import Error from './pages/error';
import { useState } from 'react';
import CommandCenter from './pages/admin/command-center';
import ManageUsers from './pages/admin/manage-users';
import FloorType from './pages/configure/floor-type';


// https://reactrouter.com/en/main/routers/picking-a-router
// TODO: Update to use createBrowserRouter
const App: React.FC = () => {
  const [user, setUser] = useState<AuthType['user']>(undefined);

  return <ThemeProvider theme={packersTheme}>
    <AuthContext.Provider value={{user, setUser}}>
      <WofNavBar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route index={true} element={<Home />} />
          <Route path='/products' element={<Product />} />
          <Route path='/example/:rpname?' element={<Example fcname={'functional component props'}/>} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/admin/command-center' element={<CommandCenter />} />
          <Route path='/admin/manage-users' element={<ManageUsers />} />
          <Route path='/config/floor-type' element={<FloorType />} />
          <Route path='/tracking' element={<Tracking />} />
          <Route path='/reports' element={<Reports />} />
        </Route>

        <Route path='/sign-in' element={<Login />} />
        <Route path="*" element={<Error />}/>
      </Routes>
    </AuthContext.Provider>
  </ThemeProvider>
};
export default App;