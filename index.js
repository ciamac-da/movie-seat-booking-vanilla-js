const container = document.querySelector(".container")
const seats = document.querySelectorAll(".row .seat:not(.occupied)")
const count = document.getElementById("count")
const total = document.getElementById("total")
const movieSelect = document.getElementById("movie")
let ticketPrice = +movieSelect.value


// Save selected movie and price
const setMovieData = (movieIndex, moviePrice) => {
localStorage.setItem("selectMovieIndex", movieIndex)
localStorage.setItem("selectMoviePrice", moviePrice)

}


// Update total and count
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected")

 const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))
 localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex))

  const selectedSeatsCount = selectedSeats.length
  count.innerText = selectedSeatsCount
  total.innerText = selectedSeatsCount * ticketPrice
}

// Get data from localstorage and populate UI
const populateIU = () => {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"))
  if(selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected")
      }
    })
  }
  const selectedMovieIndex = localStorage.getItem("selectMovieIndex")
  if(selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex
  }
}
populateIU()

// Movie select event
movieSelect.addEventListener("change", (e) => {
ticketPrice = +e.target.value
setMovieData(e.target.selectedIndex, e.target.value)
updateSelectedCount()
})


// Seat click event
container.addEventListener("click", (e) => {
if(
  e.target.classList.contains("seat") &&
  !e.target.classList.contains("occupied")
) {
  e.target.classList.toggle("selected")
  updateSelectedCount()
}
})
updateSelectedCount()
