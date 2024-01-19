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

const MobileSidebar = ({ menuItems }: { menuItems: MenuItem[] }) => {
    const [expandedItem, setExpandedItem] = useState(false);
    const router = useRouter();

    const handleItemClick = (path: string) => {
        router.push(path);
        setExpandedItem(false);
    };
    const handleExpand = () => {
        setExpandedItem(!expandedItem);

    }
    const defaultValue: string[] = menuItems.map(item => item.title)

    return (
        <Accordion type="multiple" className="w-full md:hidden h-full flex flex-col rounded-md text-white text-base gap-y-1 " onMouseEnter={handleExpand} onMouseLeave={handleExpand} defaultValue={defaultValue}>
            {menuItems.map((item) => (
                <AccordionItem key={item.title} value={item.title} title={item.title} >
                    <AccordionTrigger isCollapsible={item.collapsible} subMenuItems={item.subMenuItems}>
                        <item.icon />
                        {expandedItem && (item.collapsible ? (
                            <p className="text-white" >{item.title}</p>
                        ) : (
                            <Link className="text-white" href={item.path}>{item.title}</Link>
                        ))}
                    </AccordionTrigger>
                    {(expandedItem && item.collapsible) && (
                        <AccordionContent>
                            <ul className="flex flex-col gap-4 ">
                                {item.subMenuItems?.map((subItem) => (
                                    <li key={subItem.title} className="w-[80%] text-sm hover:bg-tertiary hover:text-tertiary-foreground p-1 rounded-sm  ml-auto">
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

export default MobileSidebar;
