import { FC } from "react";
import { DarkModeToggle } from "../shared/DarkModeToggle";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <div>
      dashboard Header <DarkModeToggle />
    </div>
  );
};

export default Header;
