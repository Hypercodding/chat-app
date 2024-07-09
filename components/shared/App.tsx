"use client";
import { SignInButton} from "@clerk/clerk-react";
import { Authenticated, AuthLoading, Unauthenticated, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import LoadingLogo from "./LoadingLogo";
import "./app.css";
import { Button } from "../ui/button";


function App({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Unauthenticated>
        <SignInButton />
        <Button>Hammad</Button>
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
