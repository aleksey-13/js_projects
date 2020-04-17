// Define UI Vars
const selectCurrencyOne = document.getElementById("currency-one");
const selectCurrencyTwo = document.getElementById("currency-two");
const inputAmountOne = document.getElementById('amount-one')
const inputAmountTwo = document.getElementById('amount-two')

const swapBtn = document.getElementById('swap');
const rate = document.getElementById('rate');

async function calculate() {
  const response = await fetch(`https://prime.exchangerate-api.com/v5/49d9c6c591e287fc9d6da757/latest/${selectCurrencyOne.value}`)
  const data = await response.json()

  const calculateResult = (data.conversion_rates[selectCurrencyTwo.value] * Number(inputAmountOne.value)).toFixed(2)
  const rateValue = data.conversion_rates[selectCurrencyTwo.value]

  printRate(rateValue)

  return calculateResult
}

function printRate(rateValue) {
  rate.textContent = `1 ${selectCurrencyOne.value} = ${rateValue} ${selectCurrencyTwo.value}`
}

function printResult() {
  if (inputAmountOne.value > 0) {
    const calcResult = calculate()

    calcResult
        .then(result => inputAmountTwo.value = result)
        .catch(e => {
          inputAmountOne.value = 0
          inputAmountTwo.value = 0
        })
  }
}

document.addEventListener("DOMContentLoaded", printResult);

inputAmountOne.addEventListener('change', printResult)

swapBtn.addEventListener('click', () => {
  const selectOne = selectCurrencyOne.value;
  selectCurrencyOne.value = selectCurrencyTwo.value;
  selectCurrencyTwo.value = selectOne;
  printResult();
})

selectCurrencyOne.addEventListener('change', printResult)
selectCurrencyTwo.addEventListener('change', printResult)
