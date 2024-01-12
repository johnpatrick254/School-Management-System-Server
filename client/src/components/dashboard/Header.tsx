import { FC } from "react";
import { DarkModeToggle } from "../shared/DarkModeToggle";
import Link from "next/link";
import Image from "next/image";
import UserPopover from "../shared/UserPopover";
import MessageSummary from "./MessageSummary";
import NotificationSummary from "./NotificationSummary";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className="fixed top-0 h-fit z-10 py-3 inset-x-0 w-full border-b border-border backdrop-blur">
      <div className="max-w-7xl px-4 mx-auto flex flex-row justify-between items-center">
        <Link href="/">
          <Image src="/assets/logo.svg" alt="logo" width={40} height={40} />
        </Link>
        <div className="flex flex-row items-center gap-4">
          <div>
            <DarkModeToggle />
            <NotificationSummary />
            <MessageSummary />
          </div>
          <UserPopover />
        </div>
      </div>
    </header>
  );
};

export default Header;
