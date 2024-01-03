"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { SheetClose } from "../ui/sheet";
import { useState } from "react";
import { navLinks } from "./constants";

const NavbarMobile = () => {
  const currentHash = typeof window !== "undefined" ? window.location.hash : "";

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
  const [currentHash, setCurrentHash] = useState<string>(
    typeof window !== "undefined" ? window.location.hash : ""
  );

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
