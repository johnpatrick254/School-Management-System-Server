import Link from "next/link";
import { navLinks, teamMembers } from "./constants";
import { buttonVariants } from "../ui/button";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="max-w-screen-xl px-4 pt-12 pb-8 mx-auto space-y-10 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2">
          <ul className="flex flex-row">
            {navLinks.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.path}
                  className={buttonVariants({
                    variant: "link",
                    className: "hover:no-underline",
                  })}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex gap-10 justify-center mt-8">
          {teamMembers.map((member, i) => (
            <li key={i} className="flex flex-col gap-3 items-center">
              <Image
                src={member.photo!}
                width={80}
                height={80}
                className="rounded-full h-14 w-14 grayscale shadow"
                alt={member.name!}
              />
              <div className="flex flex-row gap-4">
                {member.socialNetworks?.map((link, i) => (
                  <Link
                    key={i}
                    href={link.url}
                    className="bg-primary rounded-full p-2"
                  >
                    <span className="sr-only">{link.name}</span>
                    <link.logo size={18} className="text-primary-foreground" />
                  </Link>
                ))}
              </div>
              <div className="text-center">
                <p className="uppercase">
                  {member.name}{" "}
                  <span className="text-secondary font-semibold">
                    {member.country}
                  </span>
                </p>
                <p className="text-secondary text-sm tracking-wider">
                  {member.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8 leading-6 text-xs text-center text-primary">
          © 2024 NAME, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
