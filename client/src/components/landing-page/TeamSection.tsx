import { FC } from "react";

interface TeamSectionProps {}

const TeamSection: FC<TeamSectionProps> = ({}) => {
  return (
    <div id="team" className="h-screen pt-12 relative">
      TeamSection
      {/* close sections wave - transition to footer */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute -bottom-0.5 fill-background-strong stroke-background-strong"
      >
        <path d="M0,256L80,261.3C160,267,320,277,480,261.3C640,245,800,203,960,181.3C1120,160,1280,160,1360,160L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
      </svg>
    </div>
  );
};

export default TeamSection;
