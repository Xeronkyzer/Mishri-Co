import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type UserProfile = {
  name: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  pincode: string;
};

const defaultProfile: UserProfile = {
  name: '',
  phone: '',
  email: '',
  addressLine1: '',
  addressLine2: '',
  city: 'Patna',
  pincode: '',
};

type UserCtx = {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
};

const UserContext = createContext<UserCtx | null>(null);

const USER_STORAGE_KEY = 'mishri_user_v1';

export function UserProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) return { ...defaultProfile, ...JSON.parse(saved) };
    } catch (e) {}
    return defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  return (
    <UserContext.Provider value={{ profile, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserCtx {
  const ctx = useContext(UserContext);
  if (!ctx) {
    // If used outside provider, return default
    return { profile: defaultProfile, updateProfile: () => {} };
  }
  return ctx;
}
