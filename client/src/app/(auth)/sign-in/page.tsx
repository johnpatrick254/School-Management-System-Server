import LoginForm from "@/components/dashboard/auth/LoginForm";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-row h-screen bg-background-strong">
      <div className="hidden z-10 h-full w-[55%] p-10 text-white border-r border-border relative lg:flex lg:flex-col">
        <Image
          src="/images/students.jpg"
          alt="students-teachers-img"
          className="absolute inset-0 object-cover w-full h-full object-top"
          quality={60}
          fill
        />
        <div className="z-20 mt-auto text-primary">
          <blockquote className="space-y-2 bg-background-strong p-2 rounded opacity-90">
            <span className="text-lg p-2 italic font-light">
              &ldquo;Quantum has revolutionized my approach to classroom
              management. This user-friendly school management system ensures
              seamless communication with students and provides valuable
              insights into their performance. Quantum has truly elevated my
              teaching experience, making administrative tasks efficient and
              allowing me to focus more on what matters most - teaching.&rdquo;
            </span>
            <footer className="text-sm font-bold text-tertiary">
              Ms. Anderson, Teacher of The Coolest Awesome School.
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="h-full w-full lg:px-8 lg:w-[45%] flex flex-col items-center justify-center">
        <Link href="/" className="flex gap-2 items-center">
          <Image src="/assets/logo.svg" alt="logo" width={50} height={50} />
          <span className="text-2xl tracking-wider uppercase font-black text-[#8b5cf6] font-mono">
            Quantum
          </span>
        </Link>
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
