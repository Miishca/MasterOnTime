import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProfile, getToken } from '../services/auth/authApi';
import type { UserProfile } from '../types';

export function useUserProfile() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      const token = getToken();
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const profileData = await getMyProfile();
        setUserProfile(profileData);
      } catch (err) {
        setError('Failed to load profile');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  return { userProfile, setUserProfile, loading, error };
}
