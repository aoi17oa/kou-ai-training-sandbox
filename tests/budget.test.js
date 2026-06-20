import test from "node:test";
import assert from "node:assert/strict";
import {
  buildSavingsInsight,
  createExpense,
  filterExpenses,
  parseStoredExpenses,
  recentMonths,
  summarizeByCategory,
  totalExpenses
} from "../src/budget.js";

const expenses = [
  { id: "1", title: "Lunch", amount: 900, category: "Food", date: "2026-06-01" },
  { id: "2", title: "Book", amount: 1800, category: "Learning", date: "2026-06-02" },
  { id: "3", title: "Train", amount: 420, category: "Transport", date: "2026-05-30" }
];

test("createExpense trims title and normalizes amount", () => {
  assert.deepEqual(createExpense({
    id: "expense-test",
    title: "  Coffee  ",
    amount: "380.4",
    category: "Food",
    date: "2026-06-02"
  }), {
    id: "expense-test",
    title: "Coffee",
    amount: 380,
    category: "Food",
    date: "2026-06-02",
    note: ""
  });
});

test("createExpense allows an empty title", () => {
  const expense = createExpense({
    id: "no-title",
    amount: 100,
    category: "Food",
    date: "2026-06-02"
  });
  assert.equal(expense.title, "");
  assert.equal(expense.amount, 100);
});

test("totalExpenses returns the sum of amounts", () => {
  assert.equal(totalExpenses(expenses), 3120);
});

test("summarizeByCategory returns category totals", () => {
  assert.deepEqual(summarizeByCategory(expenses), {
    Food: 900,
    Learning: 1800,
    Transport: 420
  });
});

test("filterExpenses filters by category and month", () => {
  assert.deepEqual(
    filterExpenses(expenses, { category: "Food", month: "2026-06" }).map((expense) => expense.id),
    ["1"]
  );
});

test("parseStoredExpenses returns the saved array", () => {
  const raw = JSON.stringify(expenses);
  assert.deepEqual(parseStoredExpenses(raw), expenses);
});

test("parseStoredExpenses returns empty array for null or broken data", () => {
  assert.deepEqual(parseStoredExpenses(null), []);
  assert.deepEqual(parseStoredExpenses(""), []);
  assert.deepEqual(parseStoredExpenses("not json"), []);
  assert.deepEqual(parseStoredExpenses("{}"), []);
});

test("recentMonths returns months newest-first", () => {
  assert.deepEqual(recentMonths("2026-06", 3), ["2026-06", "2026-05", "2026-04"]);
});

test("recentMonths handles year boundaries", () => {
  assert.deepEqual(recentMonths("2026-01", 3), ["2026-01", "2025-12", "2025-11"]);
});

test("buildSavingsInsight averages 3 months and suggests the biggest category", () => {
  const threeMonths = [
    { id: "a1", title: "外食", amount: 12000, category: "Fun", date: "2026-04-10" },
    { id: "a2", title: "外食", amount: 18000, category: "Fun", date: "2026-05-10" },
    { id: "a3", title: "外食", amount: 24000, category: "Fun", date: "2026-06-10" },
    { id: "b1", title: "ランチ", amount: 3000, category: "Food", date: "2026-06-01" }
  ];
  const insight = buildSavingsInsight(threeMonths);
  assert.deepEqual(insight.months, ["2026-06", "2026-05", "2026-04"]);
  assert.equal(insight.averages[0].category, "Fun");
  assert.equal(insight.averages[0].monthlyAverage, 18000);
  assert.equal(insight.suggestion.category, "Fun");
  assert.equal(insight.suggestion.targetAmount, 14400);
  assert.equal(insight.suggestion.monthlySaving, 3600);
  assert.equal(insight.suggestion.yearlySaving, 43200);
});

test("buildSavingsInsight returns no suggestion when there is no data", () => {
  const insight = buildSavingsInsight([]);
  assert.equal(insight.suggestion, null);
  assert.deepEqual(insight.averages, []);
});
