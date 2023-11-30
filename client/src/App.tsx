import { packersTheme } from './theme/PackersTheme';
import { AuthContext, AuthType } from './context/AuthContext';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

import Home from './pages/home';
import Login from './pages/login';
import Example from './pages/example';
import WofNavBar from './components/navigation/WofNavBar';
import ProtectedRoute from './components/route/ProtectedRoute';
import Product from './pages/product';

import Admin from './pages/admin';
import Tracking from './pages/tracking';
import Reports from './pages/reports';
import Error from './pages/error';
import CommandCenter from './pages/admin/command-center';
import FirebaseUsers from './pages/admin/firebase-users';
import NewAppointment from './pages/admin/appointment/new-appointment';
import DelegateAppointment from './pages/admin/appointment/delegate-appointment';
import SiteOption from './pages/configure/site-option';
import SaleAgent from './pages/admin/sales-agent';
import CancelAppointment from './pages/admin/appointment/cancel-appointment';
import ListAppointment from './pages/admin/appointment/list-appointment';
import ManageAppointment from './pages/admin/appointment/manage-appointment';
import CostRate from './pages/configure/cost-rate';
import ContractorRate from './pages/configure/contractor-rate';
import LaborRate from './pages/configure/pricing/labor-rate';
import JobService from './pages/configure/option/job-service';
import ProductCost from './pages/admin/product-cost';
import RetailPrice from './pages/admin/retail-price';

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
          <Route path='/admin/firebase-users' element={<FirebaseUsers />} />
          <Route path='/admin/new-appointment' element={<NewAppointment />} />
          <Route path='/admin/cancel-appointment' element={<CancelAppointment />} />
          <Route path='/admin/delegate-appointment' element={<DelegateAppointment />} />
          <Route path='/admin/list-appointment' element={<ListAppointment />} />
          <Route path='/admin/appointment/:appointmentId?' element={<ManageAppointment />} />
          <Route path='/config/site-option' element={<SiteOption />} />
          <Route path='/config/product-cost' element={<ProductCost />} />
          <Route path='/config/retail-price' element={<RetailPrice />} />
          <Route path='/config/cost-rate' element={<CostRate />} />
          <Route path='/config/labor-rate' element={<LaborRate />} />
          <Route path='/config/job-service' element={<JobService />} />
          <Route path='/config/sale-agent' element={<SaleAgent />} />
          <Route path='/config/contractor-rate' element={<ContractorRate />} />
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
