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
}
const filterControl = function (myChart, date) {
  view.updateChart(model.state, myChart, date)
  // view.getChart(model.state.category, [10, 5, 7, 9])
}

function init() {
  render()
  view.submitExpenseHandler(addExpenseTomodel)
  view.filterDateHandler(filterControl)
  view.categoryChangeHandler()
}
init()
