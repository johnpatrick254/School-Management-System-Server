import { MessageSquare } from "lucide-react";
import { FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

interface MessageSummaryProps {}

const MessageSummary: FC<MessageSummaryProps> = ({}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <MessageSquare className="cursor-pointer" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end">
        <div>I'm famous</div>
      </PopoverContent>
    </Popover>
  );
};

export default MessageSummary;
