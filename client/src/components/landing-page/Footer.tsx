import Link from "next/link";
import { teamMembers } from "./constants";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-background-strong">
      <div className="max-w-screen-xl px-4 pt-12 pb-8 mx-auto space-y-10 overflow-hidden sm:px-6 lg:px-8">
        <div>
          <p className="text-center text-secondary text-sm tracking-wider">
            Created by:
          </p>
          <ul className="flex gap-10 justify-center mt-8">
            {teamMembers.map((member, i) => (
              <li key={i} className="flex flex-col gap-3 items-center">
                <Image
                  src={member.photo!}
                  width={80}
                  height={80}
                  className="rounded-full h-14 w-14 shadow"
                  alt={member.name!}
                />
                <div className="flex flex-row gap-4">
                  {member.socialNetworks?.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      className="bg-primary rounded-full p-2 hover:bg-tertiary transition-colors group"
                    >
                      <span className="sr-only">{link.name}</span>
                      <link.logo
                        size={18}
                        className="text-primary-foreground group-hover:text-white"
                      />
                    </a>
                  ))}
                </div>
                <div className="text-center">
                  <p className="uppercase text-tertiary-foreground">
                    {member.name}{" "}
                    <span className="text-tertiary font-semibold">
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
        </div>
        <p className="mt-8 leading-6 text-xs text-center text-secondary">
          © 2024 NAME, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
