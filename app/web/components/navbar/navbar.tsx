import { useState } from "react";
import TabButton from "./navbar-button";
import { useMe } from "@/services/api/auth/auth.api";
import { LogoButton, PhotoButton } from "./photo-button";
const Navbar = () => {
  const { data } = useMe();
  const [activeTab, setActiveTab] = useState("");
  return (
    // main
    <div className="m-1 rounded-b-xxl bg-white flex flex-col shadow-sm ">
      {/* Logo and utils */}
      <div className="border-neutral-200 p-1.5 flex justify-between">
        <div className="relative flex gap-2">
          <LogoButton
            imageUrl="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/money/dollar-minimalistic-7sr3wyd3gc9je4re2y9b8l.png/dollar-minimalistic-zumyt8yqlccd6959i5l29.png?_a=DATAiZAAZAA0"
            size={55}
          />
          <h1 className="absolute bottom-3 left-15 text-2xl">Finsights</h1>
        </div>
        <div className="flex gap-12">
          <PhotoButton
            imageUrl="https://iconape.com/wp-content/files/cy/368009/svg/notifications-outline-logo-icon-png-svg.png"
            size={28}
          />
          <PhotoButton
            imageUrl={
              data?.profilePicUrl ??
              "https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000"
            }
            size={40}
          />
        </div>
      </div>
      <div className="mt-0.5 h-[2px] w-full bg-neutral-100"></div>
      {/* navigation */}
      <div className="p-1.5 mt-1 flex start-0.5 gap-4 border-neutral-600">
        <TabButton
          label="Home"
          active={activeTab === "Home"}
          onClick={() => setActiveTab("Home")}
        />
        <TabButton
          label="Accounts"
          active={activeTab === "Accounts"}
          onClick={() => setActiveTab("Accounts")}
        />
        <TabButton
          label="Transactions"
          active={activeTab === "Transactions"}
          onClick={() => setActiveTab("Transactions")}
        />
        <TabButton
          label="Analytics"
          active={activeTab === "Analytics"}
          onClick={() => setActiveTab("Analytics")}
        />
        <TabButton
          label="Taxes"
          active={activeTab === "Taxes"}
          onClick={() => setActiveTab("Taxes")}
        />
      </div>
    </div>
  );
};

export default Navbar;
