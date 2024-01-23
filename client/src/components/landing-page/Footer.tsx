import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { teamMembers } from "./constants";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center bg-[#07102c] mx-auto px-4 pt-12 pb-8 space-y-10">
      <div className="flex gap-2 items-center">
        <Image src="/assets/logo.svg" alt="logo" width={50} height={50} />
        <span className="text-2xl tracking-wider uppercase font-black text-tertiary font-mono">
          Quantum
        </span>
      </div>
      <ul className="flex gap-10 sm:gap-20 justify-center">
        {teamMembers.map((member, i) => (
          <li key={i} className="flex flex-col gap-3 items-center">
            <Image
              src={member.photo!}
              width={80}
              height={80}
              className="rounded-full h-16 w-16 shadow"
              alt={member.name!}
            />
            <div className="flex flex-row gap-4">
              {member.socialNetworks?.map((link, i) => (
                <TooltipProvider key={i} delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        target="_blank"
                        href={link.url}
                        className="bg-[#1d2144] rounded-full p-2 hover:bg-tertiary transition-colors group"
                      >
                        <span className="sr-only">{link.name}</span>
                        <link.logo size={18} className="text-white" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{link.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-white">{member.fullName}</p>
              <p className="text-tertiary text-xs">{member.role}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-8 leading-6 text-xs text-center text-secondary">
        © 2024 Quantum, Inc. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
