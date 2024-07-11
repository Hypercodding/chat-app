"use client";
import { SignInButton } from "@clerk/clerk-react";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import LoadingLogo from "./LoadingLogo";
import "./app.css";
import { Card } from "../ui/card";
import { SignIn } from "@clerk/nextjs";

function App({ children }: { children: React.ReactNode }) {
  return (
   <>
      <Unauthenticated>
        <SignIn/>
      </Unauthenticated>
      <AuthLoading>
        <LoadingLogo />
      </AuthLoading>
      <Authenticated>
        {children}
      </Authenticated>
      </>
  );
}

export default App;
