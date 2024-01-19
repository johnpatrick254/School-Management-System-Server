"use client"
import React, { useState } from 'react';
import Sidebar, { MenuItem } from "../shared/SideBar";
import { BookOpenText,Blocks, BookA,FileQuestion, BookOpenCheck, BookText, GraduationCap, Layers2, LayoutDashboard, LibraryIcon, PcCase, User, Users } from 'lucide-react';
import MobileSidebar from '../shared/MobileSideBar';

const teacherMenuItems: MenuItem[] = [
    {
        path: "/dashboard", title: "Dashboard", icon: LayoutDashboard, collapsible: false
    },
    {
        path: "/sections", title: "Sections", icon: Blocks, collapsible: false
    },{
        path: "/courses", title: "Courses", icon: BookText, collapsible: true,
        subMenuItems:[
            {
                path: "/course/1", title: "Course 1", icon: BookOpenText, collapsible: false
            },
            {
                path: "/course/2", title: "Course 2", icon: BookOpenText, collapsible: false
            },
            {
                path: "/course/3", title: "Course 3", icon: BookOpenText, collapsible: false
            },
        ]
    },
    {
        path: "/evaluations", title: "Evaluations", icon: FileQuestion, collapsible: true,
        subMenuItems: [
            {
                path: "/assignment", title: "Assignments", icon: BookA, collapsible: false
            },
            {
                path: "/exam", title: "Exam", icon: BookOpenCheck, collapsible: false
            },
        ]
    },

]
const TeacherSidebar = () => {
    return <div className='w-53 h-[90vh] px-3 pt-4 bg-tertiary-foreground rounded-md'>
        <Sidebar
            menuItems={teacherMenuItems}
        />
        <MobileSidebar
            menuItems={teacherMenuItems}
        />
    </div>

};

export default TeacherSidebar;
