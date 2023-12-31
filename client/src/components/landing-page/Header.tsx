import { DarkModeToggle } from "../shared/DarkModeToggle";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { NavbarDesktop, NavbarMobile } from "./Navbar";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 h-fit z-10 py-4 inset-x-0 w-full border-b border-border bg-background">
      <div className="max-w-7xl px-4 mx-auto">
        {/* mobile */}
        <div className="flex flex-row justify-between items-center md:hidden">
          <Link href="/">LOGO</Link>
          <div className="flex flex-row items-center">
            <DarkModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent className="flex flex-col">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <NavbarMobile />
                <SheetFooter className="mt-auto">
                  <AuthButtons />
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* desktop */}
        <div className="hidden md:flex flex-row justify-between items-center">
          <NavbarDesktop />
          <Link href="/">LOGO</Link>
          <div className="flex flex-row items-center gap-2">
            <DarkModeToggle />
            <AuthButtons />
          </div>
        </div>
      </div>
    </header>
  );
};

const AuthButtons = () => {
  return (
    <div className="flex flex-col md:flex-row w-full gap-2">
      <Link href="/sign-in" className={buttonVariants({ variant: "outline" })}>
        Sign in
      </Link>
      <Link href="/sign-up" className={buttonVariants({ variant: "default" })}>
        Sign up
      </Link>
    </div>
  );
};

export default Header;
