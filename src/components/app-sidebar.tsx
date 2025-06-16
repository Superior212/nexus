"use client";

import type * as React from "react";
import {
  BarChart3,
  Building2,
  CreditCard,
  Home,
  Receipt,
  Settings,
  Users,
  Wallet,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

// Navigation items
const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
    isActive: false,
  },
  {
    title: "Expenses",
    url: "/expenses",
    icon: Receipt,
    isActive: true,
  },
  {
    title: "Budget",
    url: "/budget",
    icon: Wallet,
    isActive: false,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: BarChart3,
    isActive: false,
  },
  {
    title: "Employees",
    url: "/employees",
    icon: Users,
    isActive: false,
  },
  {
    title: "Cards",
    url: "/cards",
    icon: CreditCard,
    isActive: false,
  },
];

const settingsItems = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="border-r border-sidebar-border">
      <div className="h-full dark:bg-brand-dark light:bg-brand-light flex flex-col">
        <SidebarHeader className="border-b border-sidebar-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
                <Building2 className="h-6 w-6 text-sidebar-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-sidebar-foreground">
                  NEXUS
                </h2>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </SidebarHeader>

        <SidebarContent className="px-4 dark:bg-brand-dark light:bg-brand-light flex-1">
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs uppercase tracking-wider mb-2">
              Main Menu
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.isActive}
                      className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground transition-colors">
                      <a href={item.url} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="mt-8">
            <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs uppercase tracking-wider mb-2">
              System
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {settingsItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
                      <a href={item.url} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border p-4 bg-sidebar mt-auto">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center">
              <span className="text-sm font-medium text-sidebar-primary-foreground">
                JD
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground">
                John Doe
              </p>
              <p className="text-xs text-sidebar-foreground/70">
                Administrator
              </p>
            </div>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </div>
    </Sidebar>
  );
}
