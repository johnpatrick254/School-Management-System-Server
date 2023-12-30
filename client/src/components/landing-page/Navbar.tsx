"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

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

const Navbar = () => {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <nav>
      <ul className="flex flex-row">
        {navLinks.map((link, i) => (
          <li key={i}>
            <Link
              href={link.path}
              className={cn(buttonVariants({ variant: "link" }), {
                "text-red-400": pathname === link.path,
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

export default Navbar;
