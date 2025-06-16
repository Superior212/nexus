"use client";

import { Button } from "@/components/ui/button";
import type { Expense, ExpenseSummary } from "@/types/expense";
import { exportToCSV, exportToPDF } from "@/lib/export-utils";
import { Download, FileText } from "lucide-react";

interface ExportButtonsProps {
  expenses: Expense[];
  summary: ExpenseSummary;
}

export function ExportButtons({ expenses, summary }: ExportButtonsProps) {
  const handleCSVExport = () => {
    exportToCSV(expenses, "company-expenses");
  };

  const handlePDFExport = () => {
    exportToPDF(expenses, summary, "expense-report");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Button
        onClick={handleCSVExport}
        variant="outline"
        className="flex items-center gap-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-dark"
        disabled={expenses.length === 0}>
        <Download className="h-4 w-4" />
        Export CSV
      </Button>
      <Button
        onClick={handlePDFExport}
        variant="outline"
        className="flex items-center gap-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-dark"
        disabled={expenses.length === 0}>
        <FileText className="h-4 w-4" />
        Export PDF
      </Button>
    </div>
  );
}
