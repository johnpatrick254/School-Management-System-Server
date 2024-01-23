import { GalleryVerticalEnd, Github, Linkedin } from "lucide-react";
import { MemberProps } from "@/lib/types/member";
import { FeatureProps } from "@/lib/types/feature";
import { LinkProps } from "@/lib/types/link";

export const navLinks: LinkProps[] = [
  {
    title: "Home",
    path: "#home",
  },
  {
    title: "Features",
    path: "#features",
  },
  {
    title: "About",
    path: "#about",
  },
  {
    title: "Team",
    path: "#team",
  },
];

export const features: FeatureProps[] = [
  {
    title: "Get Real Time Insights",
    bulletin: "Real Time Insights",
    description:
      "Access instant, comprehensive data analysis and reports for timely decision-making and actionable insights.",
    image: "/assets/feature-insights.svg",
  },
  {
    title: "Manage Staff Seamlessly",
    bulletin: "Staff Management",
    description:
      "Effortlessly handle staff operations, schedules, and tasks for streamlined workflow and efficient team management.",
    image: "/assets/feature-staff.svg",
  },
  {
    title: "Manage Students Effortlessly",
    bulletin: "Student Management",
    description:
      "Effortlessly oversee student records, courses, and progress for a smoother academic administrative process.",
    image: "/assets/feature-students.svg",
  },
  {
    title: "Organize your Academic Careers",
    bulletin: "Career Management",
    description:
      "Efficiently structure and manage academic pathways, courses, and milestones for successful career development.",
    image: "/assets/feature-courses.svg",
  },
];

export const teamMembers: MemberProps[] = [
  {
    fullName: "John Patrick",
    name: "John P",
    role: "FullStack Developer",
    country: "🇰🇪",
    photo: "/images/john-patrick.png",
    about:
      "Dedicated and adaptable professional with a background in research biology, and a strong passion for Full-Stack Web Development, based in Nairobi, Kenya. With a profound appreciation for sleek and user-friendly designs, I bring a unique blend of skills to the tech world.",
    socialNetworks: [
      {
        name: "Portfolio",
        url: "https://john-patrick.vercel.app/",
        logo: GalleryVerticalEnd,
      },
      {
        name: "GitHub",
        url: "https://github.com/johnpatrick254",
        logo: Github,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/john-patrick-254ke/",
        logo: Linkedin,
      },
    ],
  },
  {
    fullName: "Renzo Bocanegra",
    name: "Renzo B",
    role: "FullStack Developer",
    country: "🇵🇪",
    photo: "/images/renzo-bocanegra.png",
    about:
      "Mechanical-Electrical Engineer specialized in Full-Stack Web Development whose passionate about learning new technologies and enhancing my coding skills in terms of clarity and efficiency to facilitate collaboration within other developers and optimize application performance.",
    socialNetworks: [
      {
        name: "Portfolio",
        url: "https://renzobocanegra.vercel.app/",
        logo: GalleryVerticalEnd,
      },
      {
        name: "GitHub",
        url: "https://github.com/RenzoBA",
        logo: Github,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/renzo-bocanegra-dev/",
        logo: Linkedin,
      },
    ],
  },
];
