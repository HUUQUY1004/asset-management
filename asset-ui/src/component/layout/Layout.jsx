import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';

const Layout = ({ children }) => {
  // Mock user object for the header
  const user = {
    name: 'Nguyễn Văn A',
    role: 'Admin',
    department: 'IT'
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header  />
      
      {/* Main content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;