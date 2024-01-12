import { Github, Linkedin } from "lucide-react";
import { FeatureCardProps } from "../FeatureCard";
import insightIMG from "../../../../public/images/insights-svg.svg"
import staffIMG from "../../../../public/images/staff-svg.svg"
import studentIMG from "../../../../public/images/students-svg.svg"
import courseMG from "../../../../public/images/courses-svg.svg"

export const navLinks = [
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
export const features: Pick<FeatureCardProps,"bulletin" | "desc" | "title" | "img">[] = [
  {
    title: 'Get Real Time Insights',
    bulletin: 'Real Time Insights',
    desc: 'Access instant, comprehensive data analysis and reports for timely decision-making and actionable insights.',
    img: insightIMG,
  }, {
    title: 'Manage Staff Seamlessly',
    bulletin: 'Staff Management',
    desc: 'Effortlessly handle staff operations, schedules, and tasks for streamlined workflow and efficient team management.',
    img: staffIMG,
  },
  {
    title: 'Manage Students Effortlessly',
    bulletin: 'Student Management',
    desc: 'Effortlessly oversee student records, courses, and progress for a smoother academic administrative process.',
    img: studentIMG,
  },
  {
    title: 'Organize your Academic Careers',
    bulletin: 'Career Management',
    desc: 'Efficiently structure and manage academic pathways, courses, and milestones for successful career development.',
    img: courseMG,
  },

];
export const teamMembers = [
  {
    name: "John P",
    role: "FullStack Developer",
    country: "🇰🇪",
    photo: "/images/john-patrick.png",
    about: "hello world",
    socialNetworks: [
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
    name: "Renzo B",
    role: "FullStack Developer",
    country: "🇵🇪",
    photo: "/images/renzo-bocanegra.png",
    about: "hello world",
    socialNetworks: [
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
