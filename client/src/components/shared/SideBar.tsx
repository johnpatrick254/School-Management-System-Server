"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Url } from "next/dist/shared/lib/router/router";

export interface MenuItem {
    title: string;
    icon: any,
    path: string;
    collapsible: boolean;
    subMenuItems?: MenuItem[];
}

const Sidebar = ({ menuItems }: { menuItems: MenuItem[] }) => {
    const [expandedItem, setExpandedItem] = useState<string>('');
    const router = useRouter();

    const handleItemClick = (path: string) => {
        router.push(path);
    };
    const defaultValue: string[] = menuItems.map(item => item.title)

    return (
        <Accordion type="multiple" className="w-full h-full hidden md:flex flex-col rounded-md text-white text-base gap-y-1 " defaultValue={defaultValue}>
            {menuItems.map((item) => (
                <AccordionItem key={item.title} value={item.title}>
                    <AccordionTrigger isCollapsible={item.collapsible} subMenuItems={item.subMenuItems}>
                        <item.icon />
                        {item.collapsible ? (
                            <p className="text-white">{item.title}</p>
                        ) : (
                            <Link className="text-white" href={item.path}>{item.title}</Link>
                        )}
                    </AccordionTrigger>
                    {item.collapsible && (
                        <AccordionContent>
                            <ul className="flex flex-col gap-4 ">
                                {item.subMenuItems?.map((subItem) => (
                                    <li key={subItem.title} className="w-[80%] hover:bg-tertiary hover:text-tertiary-foreground text-sm p-1 rounded-sm  ml-auto">
                                        <Link className="flex items-center gap-x-2" href={subItem.path} onClick={() => handleItemClick(subItem.path)}>
                                            <subItem.icon />
                                            <p className="text-white">{subItem.title}</p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                    )}
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default Sidebar;
