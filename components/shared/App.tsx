"use client";
import { SignInButton } from "@clerk/clerk-react";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import LoadingLogo from "./LoadingLogo";
import "./app.css";
import { Card } from "../ui/card";
import { SignIn, SignUp, SignUpButton } from "@clerk/nextjs";

function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Unauthenticated><div className="flex items-center justify-center min-h-screen w-full gap-4">
        <Card className="flex items-center justify-center bg-secondary p-4">
        <SignUpButton />
        </Card>
        <Card className="flex items-center justify-center bg-secondary p-4">
        <SignInButton />
        </Card>
        </div>
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
