import React, { useState } from "react";
import { ReactComponent as CarIcon } from "./assets/icons/car.svg";

import "./App.scss";

function App() {
  const maxParkingSpots = 10;
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
        timeEnteredParking: new Date(),
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
  };

  return (
    <div className="App">
      <header>Pay Parking</header>
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
                  {spot.id <= 5 ? (
                    <CarIcon />
                  ) : (
                    <CarIcon className="inverse-car" />
                  )}
                </div>
              ))}

            {/*<div className="spot left-spot spot-1">*/}
            {/*  <CarIcon />*/}
            {/*</div>*/}
            {/*<div className="spot left-spot spot-2">2</div>*/}
            {/*<div className="spot left-spot spot-3">3</div>*/}
            {/*<div className="spot left-spot spot-4">4</div>*/}
            {/*<div className="spot left-spot spot-5">5</div>*/}
            {/*<div className="spot right-spot spot-6">6</div>*/}
            {/*<div className="spot right-spot spot-7">7</div>*/}
            {/*<div className="spot right-spot spot-8">8</div>*/}
            {/*<div className="spot right-spot spot-9">9</div>*/}
            {/*<div className="spot right-spot spot-10">10</div>*/}
          </div>
        </div>

        <div className="parked-cars-info">
          {spots.length !== 0 && (
            <table>
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Time Spent</th>
                </tr>
              </thead>
              <tbody>
                {spots.map((spot) => (
                  <tr>
                    <td>{spot.number}</td>
                    <td>{spot.timeEnteredParking.getTime()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="enter-parking">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              required
              value={carNumber}
              onChange={(e) => setCarNumber(e.target.value.toUpperCase())}
            />
            <button>Enter parking lot</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
