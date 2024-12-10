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
  view.addPrice(model.state.expense)
  view.updateChart(model.state)
}
const filterControl = function (date) {
  model.addUserSelectedDate(date)
  view.updateChart(model.state)
  // view.getChart(model.state.category, [10, 5, 7, 9])
}

const removeSelectOption = function () {
  view.removeSelectOption()
}

const delExpense = function (id) {
  const deletedId = id
  model.deleteExpense(deletedId)
  view.updateChart(model.state)
}

function init() {
  render()
  view.deleteHandler(delExpense)
  view.submitExpenseHandler(addExpenseTomodel)
  view.filterDateHandler(filterControl)
  view.categoryChangeHandler(removeSelectOption)
}
init()
