// "use client"
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
export default async function Home() {
  // const session = useSession()
  // console.log(session)
  let session;
  try {
    session = await getServerSession();
    console.log(session); // You can access session details here
  } catch (error) {
    console.error("Error retrieving session:", error);
  }
  
  
  return (
   "This is Home page Everyone can view this page"
  );
}