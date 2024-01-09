import SignupForm from "@/components/dashboard/auth/SignupForm";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-row h-screen bg-background-strong">
      <div className="hidden z-10 h-full w-[55%] p-10 text-white border-r border-border relative lg:flex lg:flex-col">
        <Image
          src="/images/director-ai.jpg"
          alt="director-img"
          className="absolute inset-0 object-cover w-full h-full object-top"
          quality={60}
          fill
        />
        <div className="z-20 mt-auto text-primary">
          <blockquote className="space-y-2 bg-background-strong p-2 rounded opacity-90">
            <span className="text-lg p-2 italic font-light">
              &ldquo;As a school director, implementing the Quantum school
              management app has revolutionized the way we operate. The seamless
              integration of Quantum into our daily processes has significantly
              improved efficiency and communication across the board&rdquo;
            </span>
            <footer className="text-sm font-bold text-tertiary">
              Jonathan Mitchell, Director of The Coolest Awesome School.
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="h-full w-full p-6 lg:px-8 lg:w-[45%] flex flex-col items-center justify-center">
        <Link href="/" className="flex gap-2 items-center">
          <Image src="/assets/logo.svg" alt="logo" width={50} height={50} />
          <span className="text-2xl tracking-wider uppercase font-black text-[#8b5cf6] font-mono">
            Quantum
          </span>
        </Link>
        <SignupForm />
      </div>
    </div>
  );
};

export default page;
