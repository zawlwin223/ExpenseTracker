export const state = {
  category: ['food', 'transport', 'entertainment', 'other'],
  expense: [],
}

export const addExpense = function (expense) {
  state.expense.push(expense)
}
