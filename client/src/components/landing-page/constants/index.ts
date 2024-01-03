import { Github, Linkedin } from "lucide-react";
import { FeatureCardProps } from "../FeatureCard";

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
export const Features:FeatureCardProps[]=[
  {
    title:'Manage Staff Seamlessly',
    bulletin:"Staff Management",
    desc:"",
    img:""
  }
]
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
