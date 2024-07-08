// src/components/AuthWrapper.tsx

"use client"; // This directive ensures this component is treated as a client component

import React from 'react';
import { Authenticated, AuthLoading } from 'convex/react';
import LoadingLogo from '@/components/shared/LoadingLogo'; // Ensure the path is correct

type Props = {
    children: React.ReactNode;
};

const AuthWrapper: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Authenticated>
        {children}
      </Authenticated>
      <AuthLoading>
        <LoadingLogo />
      </AuthLoading>
    </>
  );
};

export default AuthWrapper;
