'use strict'
import * as view from './view'
import * as model from './model'

const render = function () {
  //render chart
  view.getChart(model.state.category)
  //add category
  view.addCategory(model.state.category)

  view.addExpenseToTable(model.state.expense)

  view.addPrice(model.state.expense)
}

const addExpenseTomodel = function (expense) {
  model.addExpense(expense)

  view.addExpenseToTable(model.state.expense)
  view.addPrice(model.state.expenseSortByDate || model.state.expense)
  view.updateChart(model.state)
}
const filterControl = function (date) {
  model.addUserSelectedDate(date)
  view.updateChart(model.state)
  view.addPrice(model.state)
}

const removeSelectOption = function () {
  view.removeSelectOption()
}

const delExpense = function (id) {
  const deletedId = id
  model.deleteExpense(deletedId)
  view.updateChart(model.state)
  view.addPrice(model.state, deletedId)
}

function init() {
  render()
  view.submitExpenseHandler(addExpenseTomodel)
  view.filterDateHandler(filterControl)
  view.categoryChangeHandler(removeSelectOption)
  view.deleteHandler(delExpense)
}
init()
