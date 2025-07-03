"use client";

import { useEffect, useState } from "react";
import { useExpenseStore } from "@/stores/expense-store";

interface HydrationProviderProps {
  children: React.ReactNode;
}

export function HydrationProvider({ children }: HydrationProviderProps) {
  const [isClient, setIsClient] = useState(false);
  const isHydrated = useExpenseStore((state) => state.isHydrated);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show loading state while hydrating
  if (!isClient || !isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-gray-500">Loading expenses...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
