// src/provider/ConvexClerkProvider.tsx

"use client"; // This directive indicates that this file is a client component

import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import React from 'react';

type Props = {
    children: React.ReactNode;
};

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || "";

const convex = new ConvexReactClient(CONVEX_URL);

const ConvexClerkProvider: React.FC<Props> = ({ children }) => {
  return (
    <ClerkProvider publishableKey='pk_test_a25vd24td2FzcC0xMS5jbGVyay5hY2NvdW50cy5kZXYk'>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default ConvexClerkProvider;
