export type MemberProps = {
  fullName: string;
  name: string;
  role: string;
  country: string;
  photo: string;
  about: string;
  socialNetworks: {
    name: string;
    url: string;
    logo: LucideIcon;
  }[];
};
