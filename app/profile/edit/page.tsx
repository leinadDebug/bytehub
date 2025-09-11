import Profile_header from "@/app/components/Header/Profile_header";
import React from "react";
import Footer from "@/app/components/Footer/Footer";
import { getCurrentUser } from "@/lib/auth";
import EditSection from "./component/editSection";

type Props = {};

export const metadata = {
  title: "Edit Profile",
};

export default async function ({}: Props) {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen text-white flex flex-col">
      <Profile_header />
      <EditSection />
      <Footer />
    </div>
  );
}
