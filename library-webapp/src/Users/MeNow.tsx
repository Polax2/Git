import React, { useEffect, useState } from 'react';
import { useApi } from '../api/ApiProvider';
import './Me.css';
import { useTranslation } from 'react-i18next';
import { CurrentUser } from '../api/current_user';

const MeNow: React.FC = () => {
  const { t } = useTranslation();
  const apiClient = useApi();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await apiClient.getCurrentUser();
      if (response && response.data) {
        setCurrentUser(response as CurrentUser);
      }
    };

    fetchCurrentUser();
  }, [apiClient]);

  if (!currentUser || !currentUser.data) {
    return <div>{t('noUserLoggedIn')}</div>;
  }

  return (
    <div>
      <h2>
        {t('username')}: {currentUser.data.username}
      </h2>
      <h2>
        {t('name')}: {currentUser.data.name}
      </h2>
      <h2>
        {t('lastName')}: {currentUser.data.lastName}
      </h2>
      <h2>
        {t('email')}: {currentUser.data.email}
      </h2>
    </div>
  );
};

export default MeNow;
