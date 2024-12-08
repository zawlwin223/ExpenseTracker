import Chart, { DoughnutController } from 'chart.js/auto'
import { TabulatorFull as Tabulator } from 'tabulator-tables'
const ctx = document.getElementById('myChart')
const submit = document.querySelector('.submit')
const expenseName = document.querySelector('.expenseName')
const amount = document.querySelector('.amount')
const category = document.querySelector('.category')
const date = document.querySelector('.date')
const filterDate = document.querySelector('.filterDate')
const myTable = document.querySelector('#example-table')
let myChart

export const addExpenseToTable = function (tableData = 'No Data Yet') {
  new Tabulator(myTable, {
    data: tableData,
    autoColumns: true,
    layout: 'fitColumns', // Optional, ensures proper layout
    columns: [
      {
        title: 'ExpenseName',
        field: 'expenseName',
      },
      { title: 'Amount', field: 'amount' },
      { title: 'category', field: 'category' },
      { title: 'date', field: 'date' },
    ],
  })
}

export const getChart = function (category) {
  const initialExpense = category.map((_) => 0)
  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: category,
      datasets: [
        {
          label: '# of Votes',
          data: initialExpense, //state.expense.count,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })
}

export const addCategory = function (categoryOptions) {
  categoryOptions.forEach((el) => {
    category.innerHTML += `<option value=${el}>${el}</option>`
    // categoryFilter.innerHTML += `<option value=${el}>${el}</option>`
  })
}

export const submitExpenseHandler = function (control) {
  submit.addEventListener('click', function (e) {
    e.preventDefault()
    const expense = {
      expenseName: expenseName.value,
      amount: amount.value,
      category: category.value,
      date: date.value,
    }
    expenseName.value = ''
    amount.value = ''
    category.value = ''
    date.value = ''
    control(expense)
  })
}

export const filterDateHandler = function (control) {
  filterDate.addEventListener('change', function () {
    control(myChart, this.value)
  })
}

export const updateChart = function (state, chart, date) {
  const initialExpense = state.category.reduce((arr, cete) => {
    console.log(cete)
    arr[cete] = 0
    return arr
  }, {})

  const expenseSortByDate = state.expense
    .filter((expense) => expense.date === date)
    .map((expense) => expense.category)
    .reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1
      return acc
    }, {})

  Object.entries(expenseSortByDate).forEach((expense) => {
    initialExpense[expense[0]] = expense[1]
  })

  const finalArray = Object.values(initialExpense)
  chart.data.datasets[0].data = finalArray
  myChart.update()
}
