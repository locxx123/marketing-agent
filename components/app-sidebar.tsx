'use client'
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Content editing",
    url: "/dashboard/content-editing",
    icon: Home,
  },
  {
    title: "Repurpose content",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Brainstorm Ideas",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Research Assistant",
    url: "#",
    icon: Search,
  },
  {
    title: "SERP analysis",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
    const pathname = usePathname();
    function handleAbc() {
        console.log(pathname)
    }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url} >
                      <item.icon />
                      <span onClick={handleAbc}>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
