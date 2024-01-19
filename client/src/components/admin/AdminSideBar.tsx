"use client"
import React, { useState } from 'react';
import Sidebar, { MenuItem } from "../shared/SideBar";
import { Blocks, BookA,FileQuestion, BookOpenCheck, BookText, GraduationCap, Layers2, LayoutDashboard, LibraryIcon, PcCase, User, Users } from 'lucide-react';
import MobileSidebar from '../shared/MobileSideBar';

const adminMenuItems: MenuItem[] = [
    {
        path: "/dashboard", title: "Dashboard", icon: LayoutDashboard, collapsible: false
    },
    {
        path: "/administration", title: "Administration", icon: User, collapsible: true,
        subMenuItems: [
            {
                path: "/staff", title: "Staff", icon: Users, collapsible: false
            },
            {
                path: "/students", title: "Students", icon: GraduationCap, collapsible: false
            },
            {
                path: "/cohorts", title: "Cohorts", icon: PcCase, collapsible: false
            },
            {
                path: "/sections", title: "Sections", icon: Blocks, collapsible: false
            },
        ]
    },
    {
        path: "/academics", title: "Academics", icon: Layers2, collapsible: true,
        subMenuItems: [
            {
                path: "/careers", title: "Careers", icon: LibraryIcon, collapsible: false
            },
            {
                path: "/courses", title: "Courses", icon: BookText, collapsible: false
            },
        ]
    },
    {
        path: "/evaluations", title: "Evaluations", icon: FileQuestion, collapsible: true,
        subMenuItems: [
            {
                path: "/assignments", title: "Assignments", icon: BookA, collapsible: false
            },
            {
                path: "/exam", title: "Exam", icon: BookOpenCheck, collapsible: false
            },
        ]
    },

]
const AdminSidebar = () => {
    return <div className='w-53 h-[calc(100dvh-75px)] px-3 pt-4 bg-tertiary-foreground rounded-md'>
        <Sidebar
            menuItems={adminMenuItems}
            />
        <MobileSidebar
            menuItems={adminMenuItems}
        />
    </div>

};

export default AdminSidebar;
