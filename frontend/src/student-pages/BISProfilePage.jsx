import React, { useEffect, useState, useContext } from 'react';
import BISProfileView from './BISViewPage';
import { useFormApi } from '../forms/BIS/BISApi';
import { AuthContext } from '../context/AuthContext';
import DefaultLayout from '../components/DefaultLayout';
import Loader from '../components/Loader';

const BISProfilePage = () => {
  const { getFormBundle } = useFormApi(); 
  const { profileData } = useContext(AuthContext); 
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      if (!profileData?.student_number) {
        setError('Student number is not available.');
        setLoading(false);
        return;
      }

      try {
        const data = await getFormBundle(profileData.student_number);
        if (!data) {
          setError('Failed to load form data.');
          setLoading(false);
          return;
        }

        const transformedData = {
          student_support: data.student_support,
          socio_economic_status: data.socio_economic_status,
          preferences: data.preferences,
          scholastic_status: data.scholastic_status,
          submission: data.submission,
          privacy_consent: data.privacy_consent,
        };

        setFormData(transformedData);
      } catch (err) {
        setError('An error occurred while loading the form.');
      } finally {
        setLoading(false);
      }
    };

    loadData();

  }, [profileData?.student_number]); 

  if (loading) return <Loader />;
  if (error) return <div className="error">{error}</div>;

  return (
    <DefaultLayout variant="student">
      <BISProfileView profileData={profileData} formData={formData} />
    </DefaultLayout>
  );
};

export default BISProfilePage;
