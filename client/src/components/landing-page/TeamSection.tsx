import Image from "next/image";
import { teamMembers } from "./constants";
import { MemberProps } from "@/lib/types/member";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";

const TeamSection = () => {
  return (
    <section id="team">
      <div className="container min-h-screen mx-auto max-w-7xl text-center px-12 py-24 space-y-14">
        <div className="relative flex flex-col gap-2 items-center">
          <Image
            src="/assets/bg-star.svg"
            alt="bg-dots"
            width={100}
            height={100}
            className="absolute lg:block hidden -top-16 -left-10"
          />
          <h2 className="mb-6 font-sans text-4xl font-bold leading-none tracking-tight sm:text-5xl md:mx-auto">
            Our Team
          </h2>
          <p className="text-base md:text-lg">
            Quantum is a reality thanks to our team&apos;s efforts. Meet us.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:justify-between">
          {teamMembers.map((member, i) => (
            <TeamMember key={i} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TeamMember = ({ member }: { member: MemberProps }) => {
  return (
    <div className="grid sm:grid-cols-3 text-left shadow pb-5 sm:pb-0">
      <div className="relative w-full h-48 max-h-full rounded shadow sm:h-auto">
        <Image
          width={500}
          height={500}
          className="absolute object-cover w-full h-full rounded"
          src={member.photo}
          alt={member.fullName}
        />
      </div>
      <div className="flex flex-col justify-center mt-5 sm:mt-0 sm:p-5 sm:col-span-2">
        <p className="text-lg font-bold">
          {member.fullName} <span className="ml-1">{member.country}</span>
        </p>
        <p className="mb-4 text-xs text-tertiary">{member.role}</p>
        <p className="mb-4 text-sm tracking-wide leading-relaxed">
          {member.about}
        </p>
        <div className="flex items-center space-x-3 justify-center sm:justify-end">
          {member.socialNetworks?.map((link, i) => (
            <TooltipProvider key={i} delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    target="_blank"
                    href={link.url}
                    className="bg-background rounded-full p-2 hover:bg-tertiary transition-colors group"
                  >
                    <span className="sr-only">{link.name}</span>
                    <link.logo
                      size={20}
                      className="text-primary group-hover:text-white"
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{link.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
