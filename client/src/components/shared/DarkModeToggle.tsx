"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";

export function DarkModeToggle() {
  const { setTheme, theme } = useTheme();
  console.log(theme);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-40 flex flex-col items-start px-0"
      >
        <Button
          variant="ghost"
          className={theme === "light" ? "text-tertiary" : ""}
          onClick={() => setTheme("light")}
        >
          <Sun className="mr-2" />
          Light
        </Button>
        <Button
          variant="ghost"
          className={theme === "dark" ? "text-tertiary" : ""}
          onClick={() => setTheme("dark")}
        >
          <Moon className="mr-2" />
          Dark
        </Button>
        <Button
          variant="ghost"
          className={theme === "system" ? "text-tertiary" : ""}
          onClick={() => setTheme("system")}
        >
          <Monitor className="mr-2" />
          System
        </Button>
      </PopoverContent>
    </Popover>
  );
}
