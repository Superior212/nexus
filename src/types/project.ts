export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assignedTo: string; // TeamMember ID
  status: "todo" | "in-progress" | "review" | "completed";
  priority: "low" | "medium" | "high" | "urgent";
  dueDate: string;
  estimatedHours: number;
  actualHours: number;
  createdAt: string;
  updatedAt: string;
}

export interface TimeEntry {
  id: string;
  taskId: string;
  projectId: string;
  userId: string;
  date: string;
  hours: number;
  description: string;
  billable: boolean;
  rate: number;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  client: string;
  status: "planning" | "active" | "on-hold" | "completed" | "cancelled";
  startDate: string;
  endDate: string;
  budget: number;
  actualCost: number;
  teamMembers: string[]; // TeamMember IDs
  progress: number; // 0-100
  createdAt: string;
  updatedAt: string;
}

export interface ProjectSummary {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalBudget: number;
  totalActualCost: number;
  totalHours: number;
  totalBillableHours: number;
  totalRevenue: number;
}

export interface TaskSummary {
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  totalEstimatedHours: number;
  totalActualHours: number;
  completionRate: number;
}
