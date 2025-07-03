"use client";

import { useEffect, useState, useMemo } from "react";
import { useProjectStore } from "@/stores/project-store";

export function useProjects() {
  const [isClient, setIsClient] = useState(false);

  // Always call these hooks in the same order
  const isHydrated = useProjectStore((state) => state.isHydrated);
  const projects = useProjectStore((state) => state.projects);
  const tasks = useProjectStore((state) => state.tasks);
  const timeEntries = useProjectStore((state) => state.timeEntries);
  const teamMembers = useProjectStore((state) => state.teamMembers);

  const addProject = useProjectStore((state) => state.addProject);
  const updateProject = useProjectStore((state) => state.updateProject);
  const deleteProject = useProjectStore((state) => state.deleteProject);

  const addTask = useProjectStore((state) => state.addTask);
  const updateTask = useProjectStore((state) => state.updateTask);
  const deleteTask = useProjectStore((state) => state.deleteTask);

  const addTimeEntry = useProjectStore((state) => state.addTimeEntry);
  const updateTimeEntry = useProjectStore((state) => state.updateTimeEntry);
  const deleteTimeEntry = useProjectStore((state) => state.deleteTimeEntry);

  const addTeamMember = useProjectStore((state) => state.addTeamMember);
  const updateTeamMember = useProjectStore((state) => state.updateTeamMember);
  const deleteTeamMember = useProjectStore((state) => state.deleteTeamMember);

  const getProjectSummary = useProjectStore((state) => state.getProjectSummary);
  const getTaskSummary = useProjectStore((state) => state.getTaskSummary);
  const getProjectTasks = useProjectStore((state) => state.getProjectTasks);
  const getTaskTimeEntries = useProjectStore(
    (state) => state.getTaskTimeEntries
  );
  const getProjectTimeEntries = useProjectStore(
    (state) => state.getProjectTimeEntries
  );
  const getFilteredProjects = useProjectStore(
    (state) => state.getFilteredProjects
  );
  const getFilteredTasks = useProjectStore((state) => state.getFilteredTasks);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Compute summaries only when hydrated
  const projectSummary = useMemo(() => {
    if (!isClient || !isHydrated) {
      return {
        totalProjects: 0,
        activeProjects: 0,
        completedProjects: 0,
        totalBudget: 0,
        totalActualCost: 0,
        totalHours: 0,
        totalBillableHours: 0,
        totalRevenue: 0,
      };
    }
    return getProjectSummary();
  }, [isClient, isHydrated, getProjectSummary]);

  const taskSummary = useMemo(() => {
    if (!isClient || !isHydrated) {
      return {
        totalTasks: 0,
        completedTasks: 0,
        overdueTasks: 0,
        totalEstimatedHours: 0,
        totalActualHours: 0,
        completionRate: 0,
      };
    }
    return getTaskSummary();
  }, [isClient, isHydrated, getTaskSummary]);

  // Return appropriate values based on hydration state
  if (!isClient || !isHydrated) {
    return {
      projects: [],
      tasks: [],
      timeEntries: [],
      teamMembers: [],
      projectSummary,
      taskSummary,
      addProject: () => {},
      updateProject: () => {},
      deleteProject: () => {},
      addTask: () => {},
      updateTask: () => {},
      deleteTask: () => {},
      addTimeEntry: () => {},
      updateTimeEntry: () => {},
      deleteTimeEntry: () => {},
      addTeamMember: () => {},
      updateTeamMember: () => {},
      deleteTeamMember: () => {},
      getProjectTasks: () => [],
      getTaskTimeEntries: () => [],
      getProjectTimeEntries: () => [],
      getFilteredProjects: () => [],
      getFilteredTasks: () => [],
    };
  }

  return {
    projects,
    tasks,
    timeEntries,
    teamMembers,
    projectSummary,
    taskSummary,
    addProject,
    updateProject,
    deleteProject,
    addTask,
    updateTask,
    deleteTask,
    addTimeEntry,
    updateTimeEntry,
    deleteTimeEntry,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    getProjectTasks,
    getTaskTimeEntries,
    getProjectTimeEntries,
    getFilteredProjects,
    getFilteredTasks,
  };
}
