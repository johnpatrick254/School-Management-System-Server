"use client";

import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface UserPopoverProps {}

const UserPopover: FC<UserPopoverProps> = ({}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex flex-row gap-2 items-center cursor-pointer">
          <div className="hidden sm:flex flex-col gap-0.5 font-normal items-end">
            <p>Renzo Bocanegra</p>
            <p className="text-xs text-secondary">student-001</p>
          </div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end">
        <label className="text-lg flex flex-col gap-2 items-start mb-3">
          My Account
        </label>
        <ul className="space-y-1">
          <li className="flex items-center">
            <User size={15} className="mr-1" />
            Profile
          </li>
          <hr />
          <li className="text-destructive flex items-center">
            <LogOut size={15} className="mr-1" />
            Log out
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default UserPopover;
