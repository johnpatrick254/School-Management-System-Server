import Image from "next/image";
import img from "../../../public/images/about.svg"
import { FC } from "react";
import TransitionContainer from "../shared/TransitionContainer";

interface AboutSectionProps { }

const AboutSection: FC<AboutSectionProps> = ({ }) => {
  return <TransitionContainer variant="TOP" id="about" key='about'className="mx-auto min-h-max w-full px-5">
    <h1 className="text-tertiary-foreground text-center pb-2 text-2xl font-bold rounded-sm">About</h1>
    <div className='w-full h-98 p-2 flex flex-col gap-6 items-left 
    lg:flex-row lg:justify-between
    '>
      <div className='relative w-full h-full '>
        <Image
          src={img}
          width={80}
          height={80}
          alt="Feature Image"
          className=' w-full h-full'
        />
      </div>
      <div className={`w-full flex flex-col justify-center gap-y-2 text-left
        lg:flex-col'}
        `}>
        <p>Welcome to our school management system. Our system aims to streamline administrative tasks, enhance communication between staff, students, and parents, and provide valuable insights for efficient school operation.</p>
        <p>Our goal is to provide quality education, foster a conducive learning environment, and empower students with knowledge and skills for their future</p>
        <p>We aim to be a leading institution in shaping young minds, promoting innovation, and nurturing future leaders</p>
      </div>

    </div >


  </TransitionContainer>;
};

export default AboutSection;
