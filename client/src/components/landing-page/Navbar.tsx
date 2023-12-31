"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { SheetClose } from "../ui/sheet";
import { useState } from "react";

const navLinks = [
  {
    title: "Home",
    path: "#home",
  },
  {
    title: "Features",
    path: "#features",
  },
  {
    title: "About",
    path: "#about",
  },
  {
    title: "Team",
    path: "#team",
  },
];

const NavbarMobile = () => {
  const currentHash = window.location.hash;

  return (
    <nav>
      <ul className="flex flex-col">
        {navLinks.map((link, i) => (
          <li key={i}>
            <SheetClose asChild>
              <Link
                href={link.path}
                className={cn(buttonVariants({ variant: "link" }), {
                  underline: currentHash === link.path,
                })}
              >
                {link.title}
              </Link>
            </SheetClose>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const NavbarDesktop = () => {
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash);

  return (
    <nav>
      <ul className="flex flex-row">
        {navLinks.map((link, i) => (
          <li key={i}>
            <Link
              href={link.path}
              onClick={() => {
                setCurrentHash(link.path);
              }}
              className={cn(buttonVariants({ variant: "link" }), {
                underline: currentHash === link.path,
              })}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { NavbarMobile, NavbarDesktop };
