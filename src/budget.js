export const defaultCategories = [
  "Food",
  "Daily goods",
  "Transport",
  "Learning",
  "Fun",
  "Other"
];

export function normalizeAmount(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount < 0) {
    return 0;
  }
  return Math.round(amount);
}

export function createExpense(input) {
  const title = String(input.title || "").trim();
  const category = String(input.category || "Other").trim() || "Other";
  const date = String(input.date || new Date().toISOString().slice(0, 10));

  return {
    id: input.id || `expense-${Date.now()}`,
    title,
    amount: normalizeAmount(input.amount),
    category,
    date,
    note: String(input.note || "").trim()
  };
}

export function totalExpenses(expenses) {
  return expenses.reduce((sum, expense) => sum + normalizeAmount(expense.amount), 0);
}

export function summarizeByCategory(expenses) {
  return expenses.reduce((summary, expense) => {
    const category = expense.category || "Other";
    summary[category] = (summary[category] || 0) + normalizeAmount(expense.amount);
    return summary;
  }, {});
}

export function filterExpenses(expenses, filters = {}) {
  const category = filters.category || "All";
  const month = filters.month || "";

  return expenses.filter((expense) => {
    const categoryMatches = category === "All" || expense.category === category;
    const monthMatches = !month || expense.date.startsWith(month);
    return categoryMatches && monthMatches;
  });
}
