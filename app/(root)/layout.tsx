import Navbar from "@/components/Navbar";
import React from "react";
import { Toaster } from "@/components/ui/sonner";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main>
      <Navbar />
      {children}
      <Toaster richColors/>
    </main>
  );
};

export default layout;
