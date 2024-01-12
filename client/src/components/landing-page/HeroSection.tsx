import Image from "next/image";
import { FC } from "react";
import homeBG from "../../../public/images/homepage-svg.svg";
import Link from "next/link";

interface HeroSectionProps { }

const HeroSection: FC<HeroSectionProps> = ({ }) => {
  return (
    <div id="home" className="
    h-screen px-5 flex flex-col gap-y-7 py-8 bg-gradient-to-r from-backgroundPrimaryGradient to-backgroundSecondaryGradient rounded-[20px]
    lg:flex-row lg:h-[600px] lg:justify-between lg:items-center
    xl:h-[700px]
    ">
      <div id="home_text" className='
      flex flex-col gap-y-2  justify-start font-light wordspace-lg 
      lg:flex-col lg:w-2/4 lg:pl-11  lg:font-light lg:justify-between lg:items-center lg:gap-y-5
      '
      >
        <p className='text-5xl font-bold'>School Management Made Easy
        </p>
        <p>Seamlessly integrating administrative tasks, academic excellence, and enhanced communication, our intuitive platform redefines efficiency and empowerment in educational institutions</p>
        <div className="cta flex gap-x-4  items-center w-full  text-lg pt-10">
          <a
            href='/'
            className='py-2 px-4 bg-tertiary hover:bg-tertiary-foreground cursor-pointer text-white rounded-sm'
          >
            Demo
          </a>
          <a
            href='/'
            className='py-2 px-4 bg-tertiary hover:bg-tertiary-foreground cursor-pointer text-white rounded-sm'
          >
            Read More
          </a>
        </div>
      </div>


      <div className={`
    relative w-full h-1/2 
    lg:w-1/2 lg:h-3/4
    `}>
        <Image
          src={homeBG}
          fill={true}
          alt="School Image"
        />
      </div>
    </div>
  );
};

export default HeroSection;
