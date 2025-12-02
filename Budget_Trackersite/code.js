// ----- State -----
const STORAGE_PREFIX = "tjBudget:";
const DEFAULT_CATEGORIES = ["Food", "Gas", "Fun", "Eating Out"];

const state = {
  income: 0,
  categories: {}
};

// Name of the budget currently loaded / last saved
let currentBudgetName = null;

// Fill default categories initially
DEFAULT_CATEGORIES.forEach((name) => (state.categories[name] = 0));

// ----- DOM Elements -----
const totalIncomeEl = document.getElementById("total-income");
const totalSpentEl = document.getElementById("total-spent");
const remainingEl = document.getElementById("remaining");

const incomeForm = document.getElementById("income-form");
const incomeAmountInput = document.getElementById("income-amount");

const expenseForm = document.getElementById("expense-form");
const expenseCategorySelect = document.getElementById("expense-category");
const newCategoryInput = document.getElementById("new-category-name");
const addCategoryBtn = document.getElementById("add-category-btn");
const expenseAmountInput = document.getElementById("expense-amount");

const categoriesBody = document.getElementById("categories-body");

const saveForm = document.getElementById("save-form");
const saveNameInput = document.getElementById("save-name");
const savedListEl = document.getElementById("saved-list");

const messageEl = document.getElementById("message");
const clearCurrentBtn = document.getElementById("clear-current-btn");

// ----- Chart.js pie chart -----
let chart;

function createChart() {
  const ctx = document.getElementById("spending-chart");
  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(state.categories),
      datasets: [
        {
          data: Object.values(state.categories),
          backgroundColor: [
            "#f97316",
            "#22c55e",
            "#38bdf8",
            "#eab308",
            "#a855f7",
            "#f43f5e",
            "#2dd4bf",
            "#8b5cf6"
          ]
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: "#e5e7eb"
          }
        }
      }
    }
  });
}

function updateChart() {
  if (!chart) return;
  chart.data.labels = Object.keys(state.categories);
  chart.data.datasets[0].data = Object.values(state.categories);
  chart.update();
}

// ----- UI helpers -----
function showMessage(text, isError = false) {
  messageEl.textContent = text;
  messageEl.classList.toggle("error", isError);
  messageEl.classList.remove("hidden");
  clearTimeout(showMessage._timeout);
  showMessage._timeout = setTimeout(() => {
    messageEl.classList.add("hidden");
  }, 3500);
}

function formatMoney(amount) {
  return "$" + amount.toFixed(2);
}

function updateTotals() {
  const totalSpent = Object.values(state.categories).reduce(
    (sum, v) => sum + v,
    0
  );
  const remaining = state.income - totalSpent;

  totalIncomeEl.textContent = formatMoney(state.income);
  totalSpentEl.textContent = formatMoney(totalSpent);
  remainingEl.textContent = formatMoney(remaining);
}

function refreshCategorySelect() {
  expenseCategorySelect.innerHTML = "";
  Object.keys(state.categories).forEach((name) => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    expenseCategorySelect.appendChild(opt);
  });
}

function refreshCategoryTable() {
  categoriesBody.innerHTML = "";
  Object.entries(state.categories).forEach(([name, amount]) => {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdAmount = document.createElement("td");
    const tdActions = document.createElement("td");

    tdName.textContent = name;
    tdAmount.textContent = formatMoney(amount);
    tdActions.className = "actions-cell";

    const clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.textContent = "Clear";
    clearBtn.className = "mini-btn";
    clearBtn.addEventListener("click", () => clearCategory(name));

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "mini-btn";
    deleteBtn.addEventListener("click", () => deleteCategory(name));

    tdActions.appendChild(clearBtn);
    tdActions.appendChild(deleteBtn);

    tr.appendChild(tdName);
    tr.appendChild(tdAmount);
    tr.appendChild(tdActions);
    categoriesBody.appendChild(tr);
  });
}

function refreshSavedList() {
  savedListEl.innerHTML = "";
  const keys = Object.keys(localStorage)
    .filter((k) => k.startsWith(STORAGE_PREFIX))
    .sort();

  if (keys.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No saved budgets yet.";
    savedListEl.appendChild(li);
    return;
  }

  keys.forEach((key) => {
    const name = key.replace(STORAGE_PREFIX, "");
    const li = document.createElement("li");
    const nameSpan = document.createElement("span");
    nameSpan.textContent = name;

    const btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";

    const loadBtn = document.createElement("button");
    loadBtn.type = "button";
    loadBtn.textContent = "Load";
    loadBtn.addEventListener("click", () => loadBudget(name));

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteBudget(name));

    btnGroup.appendChild(loadBtn);
    btnGroup.appendChild(deleteBtn);

    li.appendChild(nameSpan);
    li.appendChild(btnGroup);
    savedListEl.appendChild(li);
  });
}

// Reset to a fresh blank budget (used when deleting current one or via button)
function resetBudgetToBlank(showMsg = false) {
  state.income = 0;
  state.categories = {};
  DEFAULT_CATEGORIES.forEach((name) => (state.categories[name] = 0));
  currentBudgetName = null;

  refreshCategorySelect();
  refreshCategoryTable();
  updateTotals();
  updateChart();

  if (showMsg) {
    showMessage("Started a new blank budget.");
  }
}

// ----- Core logic -----
function addIncome(amount) {
  if (amount <= 0 || !Number.isFinite(amount)) {
    showMessage("Please enter a positive income amount.", true);
    return;
  }
  state.income += amount;
  updateTotals();
  showMessage("Income added.");
}

function addCategory(name) {
  const trimmed = name.trim();
  if (!trimmed) {
    showMessage("Category name cannot be empty.", true);
    return;
  }
  if (state.categories.hasOwnProperty(trimmed)) {
    showMessage("That category already exists.");
    return;
  }
  state.categories[trimmed] = 0;
  refreshCategorySelect();
  refreshCategoryTable();
  updateChart();
  showMessage(`Category "${trimmed}" added.`);
}

function addExpense(categoryName, amount) {
  if (!state.categories.hasOwnProperty(categoryName)) {
    showMessage("Please choose a valid category.", true);
    return;
  }
  if (amount <= 0 || !Number.isFinite(amount)) {
    showMessage("Please enter a positive expense amount.", true);
    return;
  }
  state.categories[categoryName] += amount;
  refreshCategoryTable();
  updateTotals();
  updateChart();
  showMessage(`Expense added to ${categoryName}.`);
}

// Small-level edits
function clearCategory(name) {
  state.categories[name] = 0;
  refreshCategoryTable();
  updateTotals();
  updateChart();
  showMessage(`Cleared spending for "${name}".`);
}

function deleteCategory(name) {
  const ok = confirm(`Delete category "${name}" and its spending?`);
  if (!ok) return;

  delete state.categories[name];

  // If they delete everything, re-add default categories so UI isn't empty
  if (Object.keys(state.categories).length === 0) {
    DEFAULT_CATEGORIES.forEach((n) => (state.categories[n] = 0));
  }

  refreshCategorySelect();
  refreshCategoryTable();
  updateTotals();
  updateChart();
  showMessage(`Deleted category "${name}".`);
}

// ----- Save / Load / Delete budgets -----
function saveBudget(name) {
  const trimmed = name.trim();
  if (!trimmed) {
    showMessage("Save name cannot be empty.", true);
    return;
  }

  const data = {
    income: state.income,
    categories: state.categories
  };

  localStorage.setItem(STORAGE_PREFIX + trimmed, JSON.stringify(data));
  currentBudgetName = trimmed; // now the current budget
  refreshSavedList();
  showMessage(`Budget "${trimmed}" saved.`);
}

function loadBudget(name) {
  const key = STORAGE_PREFIX + name;
  const raw = localStorage.getItem(key);
  if (!raw) {
    showMessage("Could not load that budget.", true);
    return;
  }

  try {
    const data = JSON.parse(raw);
    state.income = Number(data.income) || 0;
    state.categories = {};
    Object.entries(data.categories || {}).forEach(([k, v]) => {
      state.categories[k] = Number(v) || 0;
    });

    currentBudgetName = name;

    refreshCategorySelect();
    refreshCategoryTable();
    updateTotals();
    updateChart();
    showMessage(`Loaded budget "${name}".`);
  } catch (e) {
    console.error(e);
    showMessage("Error reading saved budget.", true);
  }
}

function deleteBudget(name) {
  const key = STORAGE_PREFIX + name;
  if (!localStorage.getItem(key)) {
    showMessage("Could not find that budget.", true);
    return;
  }
  const ok = confirm(`Delete budget "${name}"? This cannot be undone.`);
  if (!ok) return;

  localStorage.removeItem(key);
  refreshSavedList();

  // If we just deleted the budget that's currently loaded, reset everything
  if (currentBudgetName === name) {
    resetBudgetToBlank(true);
  } else {
    showMessage(`Budget "${name}" deleted.`);
  }
}

// ----- Event listeners -----
incomeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const amount = Number(incomeAmountInput.value);
  addIncome(amount);
  incomeAmountInput.value = "";
});

addCategoryBtn.addEventListener("click", () => {
  if (!newCategoryInput.value.trim()) {
    showMessage("Type a category name first.", true);
    return;
  }
  addCategory(newCategoryInput.value);
  newCategoryInput.value = "";
});

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const category = expenseCategorySelect.value;
  const amount = Number(expenseAmountInput.value);
  addExpense(category, amount);
  expenseAmountInput.value = "";
});

saveForm.addEventListener("submit", (e) => {
  e.preventDefault();
  saveBudget(saveNameInput.value);
  saveNameInput.value = "";
});

clearCurrentBtn.addEventListener("click", () => {
  const ok = confirm(
    "Clear this budget's income and spending? Saved budgets will not be deleted."
  );
  if (!ok) return;
  resetBudgetToBlank(true);
});

// ----- Init -----
(function init() {
  refreshCategorySelect();
  refreshCategoryTable();
  updateTotals();
  createChart();
  refreshSavedList();
})();
