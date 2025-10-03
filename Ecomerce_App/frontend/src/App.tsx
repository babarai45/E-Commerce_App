import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import SimpleLayout from './components/layout/SimpleLayout';
import SimpleHome from './pages/SimpleHome';
import SimpleLogin from './pages/auth/SimpleLogin';
import SimpleRegister from './pages/auth/SimpleRegister';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <SimpleLayout>
              <Routes>
                <Route path="/" element={<SimpleHome />} />
                <Route path="/login" element={<SimpleLogin />} />
                <Route path="/register" element={<SimpleRegister />} />
                {/* Add more routes as needed */}
              </Routes>
            </SimpleLayout>
          </Router>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
