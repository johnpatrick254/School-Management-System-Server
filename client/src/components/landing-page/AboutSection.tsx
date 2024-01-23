import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

const AboutSection = () => {
  return (
    <section id="about">
      <div className="container min-h-screen mx-auto max-w-7xl text-center px-12 py-24 space-y-14">
        <div className="relative flex flex-col gap-2 items-center">
          <Image
            src="/assets/bg-dots.svg"
            alt="bg-dots"
            width={200}
            height={200}
            className="absolute lg:block hidden top-0 -right-20 rotate-90"
          />
          <p className="inline-block px-3 py-px text-xs font-semibold tracking-wider text-white uppercase rounded-full bg-tertiary w-fit">
            Brand new
          </p>
          <h2 className="mb-6 font-sans text-4xl font-bold leading-none tracking-tight sm:text-5xl md:mx-auto">
            Modern solutions to management
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:justify-between">
          <Image
            src="/assets/about.svg"
            width={520}
            height={520}
            alt="about-section"
          />
          <div className="space-y-5">
            <p className="leading-relaxed text-lg">
              <span className="font-bold">Welcome to Quantum!</span> A School
              Management System aims to streamline administrative tasks, enhance
              communication between staff, students, and parents, and provide
              valuable insights for efficient school operation. Our goal is to
              provide quality education, foster a conducive learning
              environment, and empower students with knowledge and skills for
              their future We aim to be a leading institution in shaping young
              minds, promoting innovation, and nurturing future leaders.
            </p>
            <div className="space-y-1">
              <Link
                href="/demo"
                className={buttonVariants({ variant: "default", size: "xl" })}
              >
                Free Demo
              </Link>
              <p className="text-xs italic font-light">
                Note: This Demo uses a fake data
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
