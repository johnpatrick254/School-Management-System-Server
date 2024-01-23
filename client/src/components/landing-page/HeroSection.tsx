import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

const HeroSection = () => {
  return (
    <section id="home">
      <div className="container min-h-screen flex flex-col-reverse items-center justify-center gap-8 px-12 py-20 mx-auto lg:flex-row lg:justify-between">
        <div className="flex flex-col justify-center text-center lg:max-w-xl lg:text-left">
          <h1 className="text-5xl font-bold sm:text-6xl font-sans">
            Made Easy With
            <span className="text-tertiary"> Quantum</span>.
          </h1>
          <p className="mt-6 mb-8 text-lg sm:mb-12">
            Create and manage classes, assignments, schedules and more. Quantum
            is simple, short and attractive. Try it today and see the
            difference!
          </p>
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <Link
              href="/demo"
              className={buttonVariants({ variant: "default", size: "xl" })}
            >
              Free Demo
            </Link>
            <Link
              href="/sign-in"
              className={buttonVariants({ variant: "outline", size: "xl" })}
            >
              Sign In
            </Link>
          </div>
        </div>
        <div>
          <Image
            src="assets/hero.svg"
            width={520}
            height={520}
            alt="hero-section"
            className="pt-10"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
