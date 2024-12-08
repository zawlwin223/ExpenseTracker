export const state = {
  category: ['food', 'transport', 'entertainment', 'other'],
  expense: JSON.parse(localStorage.getItem('expense')) || [],
}
export const addExpense = function (expense) {
  state.expense.push(expense)
  localStorage.setItem('expense', JSON.stringify(state.expense))
  console.log(state.expense)
}
