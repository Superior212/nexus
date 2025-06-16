"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Expense } from "@/types/expense";
import { CheckCircle, XCircle, Clock, Trash2 } from "lucide-react";

interface ExpenseTableProps {
  expenses: Expense[];
  onUpdateStatus: (id: string, status: Expense["status"]) => void;
  onDeleteExpense: (id: string) => void;
}

export function ExpenseTable({
  expenses,
  onUpdateStatus,
  onDeleteExpense,
}: ExpenseTableProps) {
  const getStatusBadge = (status: Expense["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="text-yellow-600 bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="secondary" className="text-green-600 bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="secondary" className="text-red-600 bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
    }
  };

  if (expenses.length === 0) {
    return (
      <Card className="light:bg-brand-light dark:bg-brand-dark dark:border-brand-gray light:border-brand-dark shadow-sm">
        <CardContent className="flex items-center justify-center py-8">
          <p className="text-gray-500">No expenses found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="light:bg-brand-light dark:bg-brand-dark dark:border-brand-gray light:border-brand-dark shadow-sm transition-colors">
      <CardHeader>
        <CardTitle className="dark:text-brand-light light:text-brand-dark">
          Expense Records
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="dark:border-brand-gray light:border-brand-dark">
                <TableHead className="dark:text-brand-light light:text-brand-dark ">
                  Employee
                </TableHead>
                <TableHead className="dark:text-brand-light light:text-brand-dark ">
                  Date
                </TableHead>
                <TableHead className="dark:text-brand-light light:text-brand-dark ">
                  Category
                </TableHead>
                <TableHead className="dark:text-brand-light light:text-brand-dark ">
                  Description
                </TableHead>
                <TableHead className="dark:text-brand-light light:text-brand-dark ">
                  Amount
                </TableHead>
                <TableHead className="dark:text-brand-light light:text-brand-dark ">
                  Status
                </TableHead>
                <TableHead className="dark:text-brand-light light:text-brand-dark ">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow
                  key={expense.id}
                  className="dark:border-brand-gray light:border-brand-dark  hover:bg-gray-50 dark:hover:bg-brand-gray light:hover:bg-brand-gray  transition-colors">
                  <TableCell className="font-medium dark:text-brand-light light:text-brand-dark">
                    {expense.employee}
                  </TableCell>
                  <TableCell className="dark:text-brand-light light:text-brand-dark">
                    {new Date(expense.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="dark:text-brand-light light:text-brand-dark">
                    {expense.category}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate dark:text-brand-light light:text-brand-dark">
                    {expense.description || "No description"}
                  </TableCell>
                  <TableCell className="font-medium dark:text-brand-light light:text-brand-dark">
                    ${expense.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>{getStatusBadge(expense.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {expense.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              onUpdateStatus(expense.id, "approved")
                            }
                            className="text-green-600 hover:text-green-700 border-green-600/20 hover:bg-green-50">
                            <CheckCircle className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              onUpdateStatus(expense.id, "rejected")
                            }
                            className="text-red-600 hover:text-red-700 border-red-600/20 hover:bg-red-50">
                            <XCircle className="w-3 h-3" />
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDeleteExpense(expense.id)}
                        className="text-red-600 hover:text-red-700 border-red-600/20 hover:bg-red-50">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
