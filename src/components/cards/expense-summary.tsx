"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ExpenseSummary } from "@/types/expense";
import { DollarSign, Clock, CheckCircle, XCircle } from "lucide-react";

interface ExpenseSummaryProps {
  summary: ExpenseSummary;
}

export function ExpenseSummaryCards({ summary }: ExpenseSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className=" dark:dark:bg-brand-dark light:bg-gray-50 brand-gray shadow-sm transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium dark:text-brand-light light:text-brand-dark">
            Total Expenses
          </CardTitle>
          <DollarSign className="h-4 w-4 text-brand-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold dark:text-brand-light light:text-brand-dark">
            ${summary.total.toFixed(2)}
          </div>
        </CardContent>
      </Card>

      <Card className="dark:dark:bg-brand-dark light:bg-gray-50 brand-gray shadow-sm transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium dark:text-brand-light light:text-brand-dark">
            Pending
          </CardTitle>
          <Clock className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-500">
            ${summary.pending.toFixed(2)}
          </div>
        </CardContent>
      </Card>

      <Card className="dark:dark:bg-brand-dark light:bg-gray-50 brand-gray shadow-sm transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium dark:text-brand-light light:text-brand-dark">
            Approved
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-brand-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-brand-primary">
            ${summary.approved.toFixed(2)}
          </div>
        </CardContent>
      </Card>

      <Card className="dark:dark:bg-brand-dark light:bg-gray-50 brand-gray shadow-sm transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium dark:text-brand-light light:text-brand-dark">
            Rejected
          </CardTitle>
          <XCircle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500">
            ${summary.rejected.toFixed(2)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
