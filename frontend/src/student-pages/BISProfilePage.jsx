import React, { useEffect, useState, useContext } from 'react';
import BISProfileView from './BISViewPage';
import { useFormApi } from '../forms/BIS/BISApi';
import { AuthContext } from '../context/AuthContext';
import DefaultLayout from '../components/DefaultLayout';

const BISProfilePage = () => {
  const { getFormBundle } = useFormApi();
  const { profileData } = useContext(AuthContext); // Get profile data from AuthContext
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const form_type = "basic-information-sheet"; // Assuming this is static for now

  useEffect(() => {
    const loadData = async () => {
      if (!profileData?.student_number) {
        setError('Student number is not available.');
        setLoading(false);
        return;
      }

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
        privacy_consent: data.privacy_consent,
      };

      console.log(transformedData);
      setFormData(transformedData);
      setLoading(false);
    };

    loadData();
  }, [profileData, form_type, getFormBundle]); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
  <div>
    <DefaultLayout variant='student'>
      <BISProfileView profileData={profileData} formData={formData} />;
    </DefaultLayout>
  </div>
  );
};

export default BISProfilePage;
