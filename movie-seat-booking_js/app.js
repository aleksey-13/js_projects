const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

container.addEventListener("click", selectSeat);

function updateSelectedCount() {
  const ticketPrice = Number(movieSelect.value);
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  setMovieData(seatsIndex)

  count.textContent = selectedSeatsCount;
  total.textContent = selectedSeatsCount * ticketPrice;
}

function setMovieData(movieIndex) {
  localStorage.setItem("selectedSeats", JSON.stringify(movieIndex));
}

function populateUI() {
  const seatsIndex = JSON.parse(localStorage.getItem("selectedSeats"));
  if (seatsIndex !== null && seatsIndex.length > 0) {
    seatsIndex.forEach((seat) => seats[seat].classList.add("selected"));
    updateSelectedCount();
  }
}
document.addEventListener("DOMContentLoaded", populateUI);

movieSelect.addEventListener("change", () => {
  updateSelectedCount();
});

function selectSeat(e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
}
