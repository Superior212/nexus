import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {
  Project,
  Task,
  TimeEntry,
  TeamMember,
  ProjectSummary,
  TaskSummary,
} from "@/types/project";

interface ProjectState {
  // Data
  projects: Project[];
  tasks: Task[];
  timeEntries: TimeEntry[];
  teamMembers: TeamMember[];
  isHydrated: boolean;

  // Actions
  setHydrated: () => void;

  // Project actions
  addProject: (
    project: Omit<Project, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Task actions
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;

  // Time tracking actions
  addTimeEntry: (timeEntry: Omit<TimeEntry, "id" | "createdAt">) => void;
  updateTimeEntry: (id: string, updates: Partial<TimeEntry>) => void;
  deleteTimeEntry: (id: string) => void;

  // Team member actions
  addTeamMember: (member: Omit<TeamMember, "id">) => void;
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;

  // Computed values
  getProjectSummary: () => ProjectSummary;
  getTaskSummary: () => TaskSummary;
  getProjectTasks: (projectId: string) => Task[];
  getTaskTimeEntries: (taskId: string) => TimeEntry[];
  getProjectTimeEntries: (projectId: string) => TimeEntry[];
  getFilteredProjects: (status?: string, client?: string) => Project[];
  getFilteredTasks: (
    status?: string,
    priority?: string,
    assignedTo?: string
  ) => Task[];
}

const initialTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@company.com",
    role: "Project Manager",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@company.com",
    role: "Developer",
  },
  {
    id: "3",
    name: "Mike Davis",
    email: "mike@company.com",
    role: "Designer",
  },
];

const initialProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete redesign of company website",
    client: "TechCorp Inc",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    budget: 25000,
    actualCost: 18000,
    teamMembers: ["1", "2", "3"],
    progress: 65,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "iOS and Android app for client",
    client: "StartupXYZ",
    status: "planning",
    startDate: "2024-02-01",
    endDate: "2024-06-30",
    budget: 50000,
    actualCost: 0,
    teamMembers: ["1", "2"],
    progress: 0,
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
];

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design Homepage",
    description: "Create new homepage design mockups",
    projectId: "1",
    assignedTo: "3",
    status: "completed",
    priority: "high",
    dueDate: "2024-01-10",
    estimatedHours: 16,
    actualHours: 14,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "2",
    title: "Implement Frontend",
    description: "Build homepage using React",
    projectId: "1",
    assignedTo: "2",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-01-25",
    estimatedHours: 40,
    actualHours: 25,
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "3",
    title: "Project Planning",
    description: "Create project timeline and requirements",
    projectId: "2",
    assignedTo: "1",
    status: "todo",
    priority: "medium",
    dueDate: "2024-01-31",
    estimatedHours: 8,
    actualHours: 0,
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
];

const initialTimeEntries: TimeEntry[] = [
  {
    id: "1",
    taskId: "1",
    projectId: "1",
    userId: "3",
    date: "2024-01-08",
    hours: 4,
    description: "Created initial design concepts",
    billable: true,
    rate: 75,
    createdAt: "2024-01-08T00:00:00Z",
  },
  {
    id: "2",
    taskId: "1",
    projectId: "1",
    userId: "3",
    date: "2024-01-09",
    hours: 6,
    description: "Refined designs based on feedback",
    billable: true,
    rate: 75,
    createdAt: "2024-01-09T00:00:00Z",
  },
  {
    id: "3",
    taskId: "2",
    projectId: "1",
    userId: "2",
    date: "2024-01-15",
    hours: 8,
    description: "Implemented homepage components",
    billable: true,
    rate: 60,
    createdAt: "2024-01-15T00:00:00Z",
  },
];

export const useProjectStore = create<ProjectState>()(
  devtools(
    persist(
      (set, get) => ({
        projects: initialProjects,
        tasks: initialTasks,
        timeEntries: initialTimeEntries,
        teamMembers: initialTeamMembers,
        isHydrated: false,

        setHydrated: () => {
          set({ isHydrated: true });
        },

        // Project actions
        addProject: (projectData) => {
          const newProject: Project = {
            ...projectData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          set(
            (state) => ({
              projects: [newProject, ...state.projects],
            }),
            false,
            "addProject"
          );
        },

        updateProject: (id, updates) => {
          set(
            (state) => ({
              projects: state.projects.map((project) =>
                project.id === id
                  ? {
                      ...project,
                      ...updates,
                      updatedAt: new Date().toISOString(),
                    }
                  : project
              ),
            }),
            false,
            "updateProject"
          );
        },

        deleteProject: (id) => {
          set(
            (state) => ({
              projects: state.projects.filter((project) => project.id !== id),
              tasks: state.tasks.filter((task) => task.projectId !== id),
              timeEntries: state.timeEntries.filter(
                (entry) => entry.projectId !== id
              ),
            }),
            false,
            "deleteProject"
          );
        },

        // Task actions
        addTask: (taskData) => {
          const newTask: Task = {
            ...taskData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          set(
            (state) => ({
              tasks: [newTask, ...state.tasks],
            }),
            false,
            "addTask"
          );
        },

        updateTask: (id, updates) => {
          set(
            (state) => ({
              tasks: state.tasks.map((task) =>
                task.id === id
                  ? { ...task, ...updates, updatedAt: new Date().toISOString() }
                  : task
              ),
            }),
            false,
            "updateTask"
          );
        },

        deleteTask: (id) => {
          set(
            (state) => ({
              tasks: state.tasks.filter((task) => task.id !== id),
              timeEntries: state.timeEntries.filter(
                (entry) => entry.taskId !== id
              ),
            }),
            false,
            "deleteTask"
          );
        },

        // Time tracking actions
        addTimeEntry: (timeEntryData) => {
          const newTimeEntry: TimeEntry = {
            ...timeEntryData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
          };
          set(
            (state) => ({
              timeEntries: [newTimeEntry, ...state.timeEntries],
            }),
            false,
            "addTimeEntry"
          );
        },

        updateTimeEntry: (id, updates) => {
          set(
            (state) => ({
              timeEntries: state.timeEntries.map((entry) =>
                entry.id === id ? { ...entry, ...updates } : entry
              ),
            }),
            false,
            "updateTimeEntry"
          );
        },

        deleteTimeEntry: (id) => {
          set(
            (state) => ({
              timeEntries: state.timeEntries.filter((entry) => entry.id !== id),
            }),
            false,
            "deleteTimeEntry"
          );
        },

        // Team member actions
        addTeamMember: (memberData) => {
          const newMember: TeamMember = {
            ...memberData,
            id: Date.now().toString(),
          };
          set(
            (state) => ({
              teamMembers: [newMember, ...state.teamMembers],
            }),
            false,
            "addTeamMember"
          );
        },

        updateTeamMember: (id, updates) => {
          set(
            (state) => ({
              teamMembers: state.teamMembers.map((member) =>
                member.id === id ? { ...member, ...updates } : member
              ),
            }),
            false,
            "updateTeamMember"
          );
        },

        deleteTeamMember: (id) => {
          set(
            (state) => ({
              teamMembers: state.teamMembers.filter(
                (member) => member.id !== id
              ),
            }),
            false,
            "deleteTeamMember"
          );
        },

        // Computed values
        getProjectSummary: () => {
          const { projects, timeEntries } = get();
          const totalProjects = projects.length;
          const activeProjects = projects.filter(
            (p) => p.status === "active"
          ).length;
          const completedProjects = projects.filter(
            (p) => p.status === "completed"
          ).length;
          const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
          const totalActualCost = projects.reduce(
            (sum, p) => sum + p.actualCost,
            0
          );
          const totalHours = timeEntries.reduce(
            (sum, entry) => sum + entry.hours,
            0
          );
          const totalBillableHours = timeEntries
            .filter((entry) => entry.billable)
            .reduce((sum, entry) => sum + entry.hours, 0);
          const totalRevenue = timeEntries
            .filter((entry) => entry.billable)
            .reduce((sum, entry) => sum + entry.hours * entry.rate, 0);

          return {
            totalProjects,
            activeProjects,
            completedProjects,
            totalBudget,
            totalActualCost,
            totalHours,
            totalBillableHours,
            totalRevenue,
          };
        },

        getTaskSummary: () => {
          const { tasks } = get();
          const totalTasks = tasks.length;
          const completedTasks = tasks.filter(
            (t) => t.status === "completed"
          ).length;
          const overdueTasks = tasks.filter((t) => {
            const dueDate = new Date(t.dueDate);
            const today = new Date();
            return dueDate < today && t.status !== "completed";
          }).length;
          const totalEstimatedHours = tasks.reduce(
            (sum, t) => sum + t.estimatedHours,
            0
          );
          const totalActualHours = tasks.reduce(
            (sum, t) => sum + t.actualHours,
            0
          );
          const completionRate =
            totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

          return {
            totalTasks,
            completedTasks,
            overdueTasks,
            totalEstimatedHours,
            totalActualHours,
            completionRate,
          };
        },

        getProjectTasks: (projectId) => {
          const { tasks } = get();
          return tasks.filter((task) => task.projectId === projectId);
        },

        getTaskTimeEntries: (taskId) => {
          const { timeEntries } = get();
          return timeEntries.filter((entry) => entry.taskId === taskId);
        },

        getProjectTimeEntries: (projectId) => {
          const { timeEntries } = get();
          return timeEntries.filter((entry) => entry.projectId === projectId);
        },

        getFilteredProjects: (status, client) => {
          const { projects } = get();
          return projects.filter((project) => {
            const matchesStatus = !status || project.status === status;
            const matchesClient =
              !client ||
              project.client.toLowerCase().includes(client.toLowerCase());
            return matchesStatus && matchesClient;
          });
        },

        getFilteredTasks: (status, priority, assignedTo) => {
          const { tasks } = get();
          return tasks.filter((task) => {
            const matchesStatus = !status || task.status === status;
            const matchesPriority = !priority || task.priority === priority;
            const matchesAssignedTo =
              !assignedTo || task.assignedTo === assignedTo;
            return matchesStatus && matchesPriority && matchesAssignedTo;
          });
        },
      }),
      {
        name: "project-storage",
        partialize: (state) => ({
          projects: state.projects,
          tasks: state.tasks,
          timeEntries: state.timeEntries,
          teamMembers: state.teamMembers,
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.setHydrated();
          }
        },
      }
    ),
    {
      name: "project-store",
    }
  )
);
