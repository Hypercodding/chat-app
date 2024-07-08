import App from "@/components/shared/App";
import { UserButton } from "@clerk/nextjs";
import "./globals.css";

export default function Page() {
  return(
    <>
     <UserButton />
     {/* <Content /> */}
    </>
  );
}
