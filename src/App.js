import React, { useState } from "react";
import { ReactComponent as CarIcon } from "./assets/icons/car.svg";

import "./App.scss";

function App() {
  const [availableSpots, setAvailableSpots] = useState(10);
  const [spots, setSpots] = useState([
    { id: 0, occupied: false, parkingTime: 2 },
    { id: 1, occupied: false },
    { id: 2, occupied: false },
    { id: 3, occupied: false },
    { id: 4, occupied: false },
    { id: 5, occupied: false },
    { id: 6, occupied: false },
    { id: 7, occupied: false },
    { id: 8, occupied: false },
    { id: 9, occupied: false },
    { id: 10, occupied: false },
  ]);

  return (
    <div className="App">
      <header>Pay Parking</header>
      <main>
        <div className="spots_container">
          <div className="spots_header">Available spots - {availableSpots}</div>
          <div className="spots">
            <div className="spot left-spot spot-1">
              <CarIcon />
            </div>
            <div className="spot left-spot spot-2">2</div>
            <div className="spot left-spot spot-3">3</div>
            <div className="spot left-spot spot-4">4</div>
            <div className="spot left-spot spot-5">5</div>
            <div className="spot right-spot spot-6">6</div>
            <div className="spot right-spot spot-7">7</div>
            <div className="spot right-spot spot-8">8</div>
            <div className="spot right-spot spot-9">9</div>
            <div className="spot right-spot spot-10">10</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
