import { ReactNode } from "react";
import { Navbar } from "./_components/navbar";

function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default MarketingLayout;