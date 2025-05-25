import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import ToastMessage from '../components/ToastMessage';
import ModalMessage from '../components/ModalMessage';
import DefaultLayout from '../components/DefaultLayout';
import './css_pages/FormPublicPage.css';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/UIButton';

export const FormPublicPage = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({});
  const navigate = useNavigate();
  const { user, profileData, loading } = useContext(AuthContext);

  const handleCardClick = (form) => {
    if (form === 'referral') {
      setToastMessage('Counseling Referral Slip is coming soon!');
      return;
    }

    if (!user) {
      setModalConfig({
        title: 'Access Restricted',
        message: 'You need to log in to access this form.',
        buttons: [
          {
            label: 'Log In',
            onClick: () => {
              setShowModal(false);
              navigate('/login');
            },
            className: 'login-btn',
          },
        ],
        footer: (
          <p className="signup-text">
            Don't have an account yet?{' '}
            <span
              className="signup-link"
              onClick={() => {
                setShowModal(false);
                navigate('/signup');
              }}
            >
              Sign Up
            </span>
            .
          </p>
        ),
      });
      setShowModal(true);
      return;
    }

    if (!loading && (!profileData || !profileData.is_complete)) {
      setModalConfig({
        title: 'Complete Your Profile',
        message:
          'Before accessing this form, please complete your student profile.',
        buttons: [
          {
            label: 'Set Up Profile',
            onClick: () => {
              setShowModal(false);
              navigate('/setup-profile'); 
            },
            className: 'login-btn',
          },
        ],
      });
      setShowModal(true);
      return;
    }

    navigate(`/forms/${form}`);
  };

  const formCards = [
    {
      title: 'Basic Information Sheet',
      desc: 'Brief details for student registration.',
      id: 'basic-information-sheet',
      bg: 'white',
    },
    {
      title: 'Student Cumulative Information Sheet',
      desc: 'Collects cumulative academic and personal data.',
      id: 'student-cumulative-information-file',
      bg: 'white',
    },
    {
      title: 'Counseling Referral Slip',
      desc: 'This form will be available soon.',
      id: 'referral',
      bg: 'maroon',
      comingSoon: true,
    },
  ];

  const formContent = (
    <div className="form-page form-fade">
      <div className="form-body">
        <div className="form-body-content">
          <div className="form-header">
            <div className="form-header-line"></div>
            <div className="form-header-top">
              <h1>Forms</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
            </div>
          </div>

          <div className="form-cards-container">
            {formCards.map((form, index) => (
              <div
                key={form.id}
                className={`form-card ${form.comingSoon ? 'coming-soon' : ''}`}
                onClick={() => handleCardClick(form.id)}
                style={{ animationDelay: `${0.2 + index * 0.2}s` }}
              >
                <div className="circle" />
                <div className="card-content">
                  <div className="card-text">
                    <p className="card-desc">{form.desc}</p>
                  </div>
                  <h3 className="form-card-title">{form.title}</h3>
                  <button className={form.comingSoon ? 'disabled' : 'active'}>
                    {form.comingSoon ? 'Coming Soon' : 'Fill Out'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {toastMessage && (
        <ToastMessage message={toastMessage} onClose={() => setToastMessage('')} />
      )}

      {showModal && (
        <ModalMessage
          title={modalConfig.title}
          message={modalConfig.message}
          onClose={() => setShowModal(false)}
          buttons={modalConfig.buttons}
          footer={modalConfig.footer}
        />
      )}
    </div>
  );

  return user ? (
    <DefaultLayout>{formContent}</DefaultLayout>
  ) : (
    <>
      <Navbar />
      {formContent}
      <Footer />
    </>
  );
};
