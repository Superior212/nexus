"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProjectSummary } from "@/types/project";
import {
  FolderOpen,
  TrendingUp,
  DollarSign,
  Clock,
  Users,
  Target,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface ProjectSummaryProps {
  summary: ProjectSummary;
}

export function ProjectSummaryCards({ summary }: ProjectSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="dark:bg-brand-dark light:bg-gray-50 brand-gray shadow-sm transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium dark:text-brand-light light:text-brand-dark">
            Total Projects
          </CardTitle>
          <FolderOpen className="h-4 w-4 text-brand-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold dark:text-brand-light light:text-brand-dark">
            {summary.totalProjects}
          </div>
          <p className="text-xs text-muted-foreground">
            {summary.activeProjects} active, {summary.completedProjects}{" "}
            completed
          </p>
        </CardContent>
      </Card>

      <Card className="dark:bg-brand-dark light:bg-gray-50 brand-gray shadow-sm transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium dark:text-brand-light light:text-brand-dark">
            Total Budget
          </CardTitle>
          <DollarSign className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">
            ${summary.totalBudget.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            ${summary.totalActualCost.toLocaleString()} spent
          </p>
        </CardContent>
      </Card>

      <Card className="dark:bg-brand-dark light:bg-gray-50 brand-gray shadow-sm transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium dark:text-brand-light light:text-brand-dark">
            Total Hours
          </CardTitle>
          <Clock className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-500">
            {summary.totalHours}
          </div>
          <p className="text-xs text-muted-foreground">
            {summary.totalBillableHours} billable hours
          </p>
        </CardContent>
      </Card>

      <Card className="dark:bg-brand-dark light:bg-gray-50 brand-gray shadow-sm transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium dark:text-brand-light light:text-brand-dark">
            Revenue
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-500">
            ${summary.totalRevenue.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">From billable hours</p>
        </CardContent>
      </Card>
    </div>
  );
}
