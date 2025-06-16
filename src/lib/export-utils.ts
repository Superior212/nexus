import type { Expense } from "@/types/expense";

export function exportToCSV(expenses: Expense[], filename = "expenses") {
  const headers = [
    "Employee",
    "Date",
    "Category",
    "Description",
    "Amount",
    "Status",
  ];

  const csvContent = [
    headers.join(","),
    ...expenses.map((expense) =>
      [
        `"${expense.employee}"`,
        expense.date,
        `"${expense.category}"`,
        `"${expense.description || ""}"`,
        expense.amount.toFixed(2),
        expense.status,
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `${filename}-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function exportToPDF(
  expenses: Expense[],
  summary: any,
  filename = "expenses-report"
) {
  // Create a simple HTML structure for PDF generation
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Expense Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .summary { display: flex; justify-content: space-around; margin-bottom: 30px; }
        .summary-card { text-align: center; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .status-pending { color: #d97706; }
        .status-approved { color: #059669; }
        .status-rejected { color: #dc2626; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Company Expense Report</h1>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
      </div>
      
      <div class="summary">
        <div class="summary-card">
          <h3>Total Expenses</h3>
          <p>$${summary.total.toFixed(2)}</p>
        </div>
        <div class="summary-card">
          <h3>Pending</h3>
          <p>$${summary.pending.toFixed(2)}</p>
        </div>
        <div class="summary-card">
          <h3>Approved</h3>
          <p>$${summary.approved.toFixed(2)}</p>
        </div>
        <div class="summary-card">
          <h3>Rejected</h3>
          <p>$${summary.rejected.toFixed(2)}</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${expenses
            .map(
              (expense) => `
            <tr>
              <td>${expense.employee}</td>
              <td>${new Date(expense.date).toLocaleDateString()}</td>
              <td>${expense.category}</td>
              <td>${expense.description || "No description"}</td>
              <td>$${expense.amount.toFixed(2)}</td>
              <td class="status-${expense.status}">${
                expense.status.charAt(0).toUpperCase() + expense.status.slice(1)
              }</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </body>
    </html>
  `;

  // Create a new window and print
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();

    // Wait for content to load then print
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  }
}
