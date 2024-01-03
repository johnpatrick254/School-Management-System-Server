import Image from "next/image";
import { FC } from "react";
import homeBG from "../../assets/homepage-img.png";
import Link from "next/link";

interface HeroSectionProps { }

const HeroSection: FC<HeroSectionProps> = ({ }) => {
  return (
    <div id="home" className="h-[80vh] flex flex-col gap-y-2 mx-3 py-8 px-10 bg-gradient-to-r from-fuchsia-100 to-blue-100 rounded-[20px]">
      <div id="home_text" className='flex flex-col gap-y-2  justify-start font-light wordspace-md'>
        <p className='text-xl '>Discover the pinnacle of education management with our <span className='text-2xl font-bold'>School Management System.</span></p>
        <p>Seamlessly integrating administrative tasks, academic excellence, and enhanced communication</p>
      </div>
      <div className="cta">
        <a
          href='/'
          className='py-2 px-4 bg-fuchsia-600 rounded-sm'
        >
          Demo
        </a>
      </div>
      <div className='relative w-full h-3/4'>
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
