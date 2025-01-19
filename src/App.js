import './styles/App.scss';
import './styles/Bootstrap.scss';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import EventsPage from './pages/EventsPage';
import Promotions from './pages/Promotions';
import AboutUs from './pages/AboutUs';
import LoginCustomer from './pages/LoginCustomer.js';
import LoginStaff from './pages/LoginStaff.js';
import RegisterCustomer from './pages/RegisterCustomer.js';
import StaffDashboard from './pages/StaffDashboard';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCanceled from './pages/PaymentCanceled';
import AuthSuccess from './components/AuthSuccess';
import { AuthProvider } from './context/authContext.js';
import { ShoppingCartProvider } from './context/ShoppingCartContext.js';
import ManagementLayout from './layouts/ManagementLayout';
import CustomerDashboard from './pages/CustomerDashboard';
import { Outlet } from 'react-router-dom';

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route element={<Outlet />}>
                    <Route element={<ShoppingCartProvider><MainLayout /></ShoppingCartProvider>}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/order/checkout" element={<Checkout />} />
                        <Route path="/order/success" element={<PaymentSuccess />} />
                        <Route path="/order/cancel" element={<PaymentCanceled />} />
                        <Route path="/events" element={<EventsPage />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/promotions" element={<Promotions />} />
                        <Route path="/about-us" element={<AboutUs />} />
                    </Route>

                    <Route path="/customer" element={<CustomerDashboard />} />
                    <Route path="/customer/login" element={<LoginCustomer />} />
                    <Route path="/customer/register" element={<RegisterCustomer />} />
                </Route>

                <Route element={<ManagementLayout />}>
                    <Route path="/staff" element={<StaffDashboard />} />
                    <Route path="/staff/login" element={<LoginStaff />} />
                    <Route path="/staff/*" element={<StaffDashboard />} />
                </Route>

                {/* Przeniesienie catch-all poza ścieżki */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
