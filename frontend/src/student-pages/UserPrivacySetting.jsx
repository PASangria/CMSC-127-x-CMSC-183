import React from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { ChangePassword } from '../pages/ChangePassword';  // adjust the path accordingly

export const UserPrivacySetting = () => {
  return (
    <DefaultLayout variant="student">
      <ChangePassword />
    </DefaultLayout>
  );
};
