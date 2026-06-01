import test from "node:test";
import assert from "node:assert/strict";
import {
  createExpense,
  filterExpenses,
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

test("createExpense requires a title", () => {
  assert.throws(() => createExpense({ title: "", amount: 100 }), /title is required/);
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
