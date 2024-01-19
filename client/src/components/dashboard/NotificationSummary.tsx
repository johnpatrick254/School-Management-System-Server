import { Bell } from "lucide-react";
import { FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

interface NotificationSummaryProps {}

const NotificationSummary: FC<NotificationSummaryProps> = ({}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end">
        <div>hello mom</div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationSummary;
