import React from 'react';
import Navbar from './NavBar';
import Footer from './Footer';
import SideNav from './SideNav';
import './css/DefaultLayout.css';

const DefaultLayout = ({ children, variant = 'student' }) => {
  return (
    <>
        <Navbar />
            <div className="default-layout">
                <div className="main-section">
                    <aside className="side-nav">
                    <SideNav variant={variant} />
                    </aside>

                    <main className="main-content">
                    {children}
                    </main>
                </div>
            </div>
        <Footer />
    </>
  );
};

export default DefaultLayout;
