import React from 'react';
import SimpleHeader from './SimpleHeader';

interface SimpleLayoutProps {
  children: React.ReactNode;
}

const SimpleLayout: React.FC<SimpleLayoutProps> = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SimpleHeader />
      <main style={{ flexGrow: 1 }}>
        {children}
      </main>
      <footer style={{ 
        background: 'var(--gray-900)', 
        color: 'var(--gray-300)', 
        textAlign: 'center', 
        padding: '2rem',
        marginTop: 'auto'
      }}>
        <p>&copy; 2025 ShopMart. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SimpleLayout;
