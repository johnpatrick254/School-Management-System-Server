import Image from "next/image";
import { FC } from "react";
import { teamMembers } from "./constants";
import TransitionContainer from "../shared/TransitionContainer";

interface TeamSectionProps { }

const TeamSection: FC<TeamSectionProps> = ({ }) => {
  return (
    <TransitionContainer variant="TOP" id="team" className="min-h-max w-full py-16 px-8 flex flex-col gap-y-5 ">

      <h1 className="text-tertiary-foreground pb-2 text-center text-2xl font-bold rounded-sm">Team</h1>

      <ul className={`
      flex gap-10 flex-col justify-center mt-8
      lg:flex-row
      `}>
        {teamMembers.map((member, i) => (
          <li key={i} className="flex flex-col gap-3 items-center">

            <div className="w-full flex justify-between gap-x-5">
              <Image
                src={member.photo!}
                width={130}
                height={130}
                className="rounded-full h-full shadow"
                alt={member.name!}
              />
              <div className="flex flex-col w-3/4 gap-y-2 justify-center "  >
                <h2 className=" text-left text-2xl font-bold rounded-sm">{i == 0 ? 'John Onyango':"Renzo Bocanegra"}</h2>
                <div className="text-left">
                  <p className=" text-sm tracking-wider">
                    {member.role}
                  </p>
                </div>
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

              </div>
            </div>

            {i == 0
              ?
              <>
                <p className="text-secondary text-center">
                  I am a dedicated and adaptable professional with a background in research biology, and a strong passion for full-stack web development, based in Nairobi, Kenya. With a profound appreciation for sleek and user-friendly designs, I bring a unique blend of skills to the tech world.
                </p>
              </>
              :
              <>

                <p className="text-secondary text-center">
                  Mechanical-Electrical Engineer specialized in Full-Stack software development whose passionate about learning new technologies and enhancing my coding skills in terms of clarity and efficiency to facilitate collaboration within other developers and optimize application performance        </p>


              </>
            }

          </li>

        ))}
      </ul>
     
    </TransitionContainer>
  );
};

export default TeamSection;
