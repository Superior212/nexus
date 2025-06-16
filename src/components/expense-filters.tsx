"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EXPENSE_CATEGORIES } from "@/lib/expense-categories";
import { Search } from "lucide-react";

interface ExpenseFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

export function ExpenseFilters({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  statusFilter,
  onStatusChange,
}: ExpenseFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 light:text-brand-dark dark:text-brand-light h-4 w-4" />
        <Input
          placeholder="Search expenses..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 dark:bg-brand-dark light:bg-brand-light dark:text-brand-light light:text-brand-dark dark:border-brand-gray light:border-brand-dark text-gray-900 light:placeholder:text-brand-dark dark:placeholder:text-brand-light focus:border-brand-primary focus:ring-brand-primary/20 transition-colors"
        />
      </div>

      <Select value={categoryFilter} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full sm:w-[180px] dark:bg-brand-dark light:bg-brand-light dark:border-brand-gray light:border-brand-dark light:text-brand-dark dark:text-brand-light focus:border-brand-primary focus:ring-brand-primary/20 transition-colors">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent className="dark:bg-brand-dark light:bg-brand-light dark:border-brand-gray light:border-brand-dark">
          <SelectItem
            value="all"
            className="dark:text-brand-light light:text-brand-dark focus:bg-brand-primary focus:text-brand-dark">
            All Categories
          </SelectItem>
          {EXPENSE_CATEGORIES.map((category) => (
            <SelectItem
              key={category}
              value={category}
              className="dark:text-brand-light light:text-brand-dark focus:bg-brand-primary focus:text-brand-dark">
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-[180px] dark:bg-brand-dark light:bg-brand-light dark:border-brand-gray light:border-brand-dark light:text-brand-dark dark:text-brand-light  focus:border-brand-primary focus:ring-brand-primary/20 transition-colors">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent className="dark:bg-brand-dark light:bg-brand-light dark:border-brand-gray light:border-brand-dark">
          <SelectItem
            value="all"
            className="dark:text-brand-light light:text-brand-dark focus:bg-brand-primary focus:text-brand-dark">
            All Status
          </SelectItem>
          <SelectItem
            value="pending"
            className="dark:text-brand-light light:text-brand-dark focus:bg-brand-primary focus:text-brand-dark">
            Pending
          </SelectItem>
          <SelectItem
            value="approved"
            className="dark:text-brand-light light:text-brand-dark focus:bg-brand-primary focus:text-brand-dark">
            Approved
          </SelectItem>
          <SelectItem
            value="rejected"
            className="dark:text-brand-light light:text-brand-dark focus:bg-brand-primary focus:text-brand-dark">
            Rejected
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
