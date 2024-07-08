"use client";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, AuthLoading, Unauthenticated, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import LoadingLogo from "./LoadingLogo";
import "./app.css";


function App({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <AuthLoading>
        <LoadingLogo/>
      </AuthLoading>
      <Authenticated>
       
        {children}
      </Authenticated>
    </main>
  );
}


export default App;
