import React, { useState } from "react";
import { ReactComponent as CarIcon } from "./assets/icons/car.svg";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Tooltip from "./Tooltip";
import "./App.scss";

dayjs.extend(relativeTime);
const maxParkingSpots = 10;
const firstHourPrice = 10;
const secondaryPrice = 5;

function App() {
  const [availableSpots, setAvailableSpots] = useState(10);
  const [spots, setSpots] = useState([]);
  const [carNumber, setCarNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (spots.length < maxParkingSpots) {
      const updatedSpots = [...spots];
      updatedSpots.push({
        id: !spots.length ? 1 : spots[spots.length - 1].id + 1,
        number: carNumber,
        timeEnteredParking: dayjs(),
      });
      setSpots(updatedSpots);
      setAvailableSpots((prevState) => prevState - 1);
    } else {
      alert("All parking spots are occupied!");
    }
    setCarNumber("");
  };

  const handleExitParking = (id) => {
    const updatedSpots = spots.filter((spot) => spot.id !== id);
    setSpots(updatedSpots);

    const selectedSpot = spots.find((spot) => spot.id === id);

    const hoursParked = dayjs().diff(
      selectedSpot.timeEnteredParking,
      "hour",
      true
    );

    let sumToPay;

    if (Math.ceil(hoursParked) === 1) {
      sumToPay = firstHourPrice;
    } else {
      sumToPay = Math.ceil(hoursParked) * secondaryPrice + secondaryPrice;
    }

    alert(
      `Car number: ${selectedSpot.number}\nEntered parking lot at: ${dayjs(
        selectedSpot.timeEnteredParking
      ).format("HH:mm:ss DD-MM-YYYY")}\nLeaved parking lot at: ${dayjs().format(
        "HH:mm:ss DD-MM-YYYY"
      )}\n\nPRICES: 1st hour: 10 RON | Additional hours: 5 RON / hour\nYou have to pay the sum of ${sumToPay} RON for ${Math.ceil(
        hoursParked
      )} ${Math.ceil(hoursParked) === 1 ? "hour" : "hours"}.`
    );
    setAvailableSpots((prevState) => prevState + 1);
  };

  return (
    <div className="App">
      <header>Pay Parking</header>
      <div className="enter-parking">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            placeholder="car number"
            value={carNumber}
            maxLength="10"
            onChange={(e) => setCarNumber(e.target.value.toUpperCase())}
          />
          <button>Enter parking lot</button>
        </form>
      </div>
      <main>
        <div className="spots_container">
          <div className="spots_header">Available spots - {availableSpots}</div>
          <div className="spots">
            {spots.length !== 0 &&
              spots.map((spot) => (
                <div
                  key={spot.id}
                  onClick={() => handleExitParking(spot.id)}
                  className={`spot spot-${spot.id} spot-${
                    spot.id <= 5 ? "left" : "right"
                  }`}
                >
                  <Tooltip content="Exit parking">
                    {spot.number}
                    {spot.id <= 5 ? (
                      <CarIcon />
                    ) : (
                      <CarIcon className="inverse-car" />
                    )}
                  </Tooltip>
                </div>
              ))}
          </div>
        </div>
        <div className="parked-cars">
          <div className="parked-cars_header">Parked cars info</div>
          <div className="parked-cars_wrapper">
            {spots.length !== 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Car Number</th>
                    <th>Parked at</th>
                  </tr>
                </thead>
                <tbody>
                  {spots.map((spot) => (
                    <tr key={spot.id}>
                      <td>{spot.number}</td>
                      <td>
                        <div>
                          {dayjs(spot.timeEnteredParking).format("HH:mm:ss")}
                        </div>
                        <div>
                          {dayjs(spot.timeEnteredParking).format("DD-MM-YYYY")}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>Parking lot is empty.</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
