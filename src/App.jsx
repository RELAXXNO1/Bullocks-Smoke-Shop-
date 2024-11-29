import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import StoreFront from './components/StoreFront';
import THCAFlower from './pages/THCAFlower';
import Disposables from './pages/Disposables';
import Edibles from './pages/Edibles';
import Mushrooms from './pages/Mushrooms';
import CBD from './pages/CBD';
import Kratom from './pages/Kratom';
import ZeroNic from './pages/ZeroNic';
import Accessories from './pages/Accessories';
import Novelties from './pages/Novelties';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminPanel from './components/admin/AdminPanel';
import PrivateRoute from './components/PrivateRoute';
import UserProfile from './components/UserProfile';
import About from './pages/static/About';
import Privacy from './pages/static/Privacy';
import Terms from './pages/static/Terms';
import Contact from './pages/static/Contact';
import Compliance from './pages/static/Compliance';
import ConnectionStatus from './components/ConnectionStatus';
import AgeVerification from './components/AgeVerification';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <ConnectionStatus />
          <AgeVerification />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                }
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                }
              }
            }}
          />
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<StoreFront />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/thca-flower" element={<THCAFlower />} />
              <Route path="/disposables" element={<Disposables />} />
              <Route path="/edibles" element={<Edibles />} />
              <Route path="/mushrooms" element={<Mushrooms />} />
              <Route path="/cbd" element={<CBD />} />
              <Route path="/kratom" element={<Kratom />} />
              <Route path="/zero-nic" element={<ZeroNic />} />
              <Route path="/accessories" element={<Accessories />} />
              <Route path="/novelties" element={<Novelties />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/compliance" element={<Compliance />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <UserProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <PrivateRoute requireAdmin={true}>
                    <AdminPanel />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;