document.querySelector("#loan-form").addEventListener("submit", function (e) {
  const inputAmount = document.querySelector("#amount");
  const inputInterest = document.querySelector("#interest");
  const inputYears = document.querySelector("#years");
  const loader = document.querySelector("#loading");
  const resultsContainer = document.querySelector("#results");
  const monthlyPaymentField = document.querySelector("#monthly-payment");
  const totalPaymentField = document.querySelector("#total-payment");
  const totalInterestField = document.querySelector("#total-interest");

  e.preventDefault();

  resultsContainer.style.display = "none";
  loader.style.display = "block";

  setTimeout(function () {
    const result = calculateLoan(
      inputAmount.value,
      inputInterest.value,
      inputYears.value
    );

    loader.style.display = "none";

    if (Object.keys(result).length == 0) {
      resultsContainer.style.display = "none";
      showError("Please check your numbers!");
    } else {
      monthlyPaymentField.value = result.monthlyPayment;
      totalPaymentField.value = result.totalPayment;
      totalInterestField.value = result.totalInterest;

      resultsContainer.style.display = "block";
    }

  }, 500);
});

function calculateLoan(amount, interest, years) {
  const principal = parseFloat(amount);
  const calculateInterest = parseFloat(interest) / 100 / 12;
  const calculatePayments = parseFloat(years) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculateInterest, calculatePayments);
  const monthly = (principal * x * calculateInterest) / (x - 1);

  if (isFinite(monthly)) {
    return {
      monthlyPayment: monthly.toFixed(2),
      totalPayment: (monthly * calculatePayments).toFixed(2),
      totalInterest: (monthly * calculatePayments - principal).toFixed(2),
    };
  } else {
    return {};
  }
}

function showError(error) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(error));

  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  card.insertBefore(errorDiv, heading);

  // Clear error after 3s
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
