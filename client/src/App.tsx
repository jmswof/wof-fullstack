import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Example from './pages/example';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { packersTheme } from "./theme/PackersTheme";
import WofNavBar from './components/navigation/WofNavBar';
import Product from './pages/product';

const App: React.FC = () => (
  <ThemeProvider theme={packersTheme}>
    <WofNavBar />
      <Routes>
        <Route index={true} element={<Home />} />
        <Route path='/products' element={<Product />} />
        <Route path='/example/:rpname?' element={<Example fcname={'functional component props'}/>} />
        <Route path='/sign-in' element={<Login />} />
        <Route path="*" element={<Home />}/>
      </Routes>
  </ThemeProvider>
);
export default App;