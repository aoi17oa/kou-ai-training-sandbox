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

export const EXPENSES_STORAGE_KEY = "kou-budget-expenses";

// localStorageから読み込んだ文字列を安全に支出配列へ変換する。
// 未保存(null)や壊れたデータのときは空配列を返す。
export function parseStoredExpenses(raw) {
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// "YYYY-MM" を基準に、その月から過去n ヶ月ぶんの "YYYY-MM" を新しい順で返す。
export function recentMonths(asOfMonth, n = 3) {
  const [year, month] = String(asOfMonth).split("-").map(Number);
  const result = [];
  for (let i = 0; i < n; i += 1) {
    const date = new Date(Date.UTC(year, month - 1 - i, 1));
    const ym = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
    result.push(ym);
  }
  return result;
}

// 直近nヶ月のカテゴリ別「月平均」と、一番多いカテゴリを減らす節約提案を作る。
// 中身は平均・比較の算数のみ（AI・外部送信なし）。データが無ければ空の結果を返す。
export function buildSavingsInsight(expenses, options = {}) {
  const months = options.months || 3;
  const reduceRate = options.reduceRate || 0.2;

  if (!expenses.length) {
    return { months: [], averages: [], suggestion: null };
  }

  const latestMonth = expenses
    .map((expense) => String(expense.date).slice(0, 7))
    .sort()
    .at(-1);
  const targetMonths = recentMonths(latestMonth, months);
  const inRange = expenses.filter((expense) =>
    targetMonths.includes(String(expense.date).slice(0, 7))
  );

  const totals = summarizeByCategory(inRange);
  const averages = Object.entries(totals)
    .map(([category, total]) => ({ category, monthlyAverage: Math.round(total / months) }))
    .sort((a, b) => b.monthlyAverage - a.monthlyAverage);

  if (averages.length === 0) {
    return { months: targetMonths, averages: [], suggestion: null };
  }

  const top = averages[0];
  const targetAmount = Math.round(top.monthlyAverage * (1 - reduceRate));
  const monthlySaving = top.monthlyAverage - targetAmount;

  return {
    months: targetMonths,
    averages,
    suggestion: {
      category: top.category,
      currentAverage: top.monthlyAverage,
      targetAmount,
      monthlySaving,
      yearlySaving: monthlySaving * 12,
      reduceRate
    }
  };
}

// 同じidの支出を更新後の内容に置き換えた新しい配列を返す（件数は増えない）。
export function replaceExpense(expenses, updated) {
  return expenses.map((expense) => (expense.id === updated.id ? updated : expense));
}
