"use client";

import { useState } from "react";
import { ProjectSummaryCards } from "@/components/cards/project-summary";
import { ProjectTable } from "@/components/tables/project-table";
import { ProjectFormModal } from "@/components/modals/project-form-modal";
import { useProjects } from "@/hooks/use-projects";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FolderOpen, Search, Filter } from "lucide-react";
import type { Project } from "@/types/project";

export default function ProjectsPage() {
  const {
    projects,
    teamMembers,
    projectSummary,
    addProject,
    updateProject,
    deleteProject,
    getFilteredProjects,
  } = useProjects();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [clientFilter, setClientFilter] = useState("all");
  const [editingProject, setEditingProject] = useState<Project | undefined>();

  // Get filtered projects
  const filteredProjects = getFilteredProjects(
    statusFilter === "all" ? undefined : statusFilter,
    clientFilter === "all" ? undefined : clientFilter
  ).filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
  };

  const handleSaveProject = (
    projectData: Omit<Project, "id" | "createdAt" | "updatedAt">
  ) => {
    if (editingProject) {
      updateProject(editingProject.id, projectData);
      setEditingProject(undefined);
    } else {
      addProject(projectData);
    }
  };

  const handleDeleteProject = (id: string) => {
    if (
      confirm(
        "Are you sure you want to delete this project? This action cannot be undone."
      )
    ) {
      deleteProject(id);
    }
  };

  const getUniqueClients = () => {
    const clients = projects.map((p) => p.client);
    return Array.from(new Set(clients));
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-brand-dark light:bg-brand-light">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border dark:bg-brand-dark light:bg-brand-white shadow-sm px-6">
        <SidebarTrigger className="-ml-1 text-gray-600 hover:text-gray-900" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2">
          <FolderOpen className="h-5 w-5 text-brand-primary" />
          <h1 className="text-xl font-semibold dark:text-brand-light light:text-brand-dark">
            Projects
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <ProjectFormModal
            project={editingProject}
            teamMembers={teamMembers}
            onSave={handleSaveProject}
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        <ProjectSummaryCards summary={projectSummary} />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={clientFilter} onValueChange={setClientFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clients</SelectItem>
                {getUniqueClients().map((client) => (
                  <SelectItem key={client} value={client}>
                    {client}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setClientFilter("all");
              }}>
              Clear
            </Button>
          </div>
        </div>

        {/* Projects Table */}
        <ProjectTable
          projects={filteredProjects}
          teamMembers={teamMembers}
          onEditProject={handleEditProject}
          onDeleteProject={handleDeleteProject}
        />
      </div>
    </div>
  );
}
