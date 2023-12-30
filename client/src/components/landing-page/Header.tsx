import { DarkModeToggle } from "../shared/DarkModeToggle";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="fixed top-0 h-fit z-10 py-4 inset-x-0 w-full border-b border-border bg-background">
      <div className="max-w-7xl flex flex-row justify-between items-center mx-auto">
        <Navbar />

        <Link href="/">LOGO</Link>

        <div className="flex flex-row items-center gap-2">
          <DarkModeToggle />
          <Link
            href="/sign-in"
            className={buttonVariants({ variant: "outline" })}
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className={buttonVariants({ variant: "default" })}
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
