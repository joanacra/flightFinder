import { useState } from "react";
import "./Passengers.css";

type PassengerType = "adults" | "teens" | "children" | "infants";

interface Props {
  onChange: (newPassengers: any) => void;
}

function Passengers(props: Props) {
  const [showPassengers, setShowPassengers] = useState(false);
  const [passengers, setPassengers] = useState({
    adults: 1,
    teens: 0,
    children: 0,
    infants: 0,
  });

  const handleClick = (e: any) => {
    e.preventDefault();
    setShowPassengers((previous) => !previous);
  };

  const handlePlus = (e: any) => {
    e.preventDefault();
    const targetName = e.target.name as PassengerType;
    if (
      (targetName === "infants" && passengers.infants < passengers.adults) ||
      targetName !== "infants"
    ) {
      const newPassengers = { ...passengers };
      newPassengers[targetName] = passengers[targetName] + 1;
      props.onChange(newPassengers);
      setPassengers(newPassengers);
    }
  };

  const handleMinus = (e: any) => {
    e.preventDefault();
    const targetName = e.target.name as PassengerType;
    if (
      (targetName === "adults" &&
        passengers.adults > 1 &&
        passengers.adults > passengers.infants) ||
      (targetName !== "adults" && passengers[targetName] > 0)
    ) {
      const newPassengers = { ...passengers };
      newPassengers[targetName] = passengers[targetName] - 1;
      props.onChange(newPassengers);
      setPassengers(newPassengers);
    }
  };

  const renderPassengers = () => {
    const sum = Object.values(passengers).reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
    return `${sum} ${sum === 1 ? "Adult" : "Passengers"}`;
  };

  return (
    <div>
      <label>Passengers</label>
      <button onClick={handleClick}>{renderPassengers()}</button>
      {showPassengers && (
        <div className="passengerEntry">
          <div className="passengerInfo">
            <span>Adults</span>
            <span>18+ years old</span>
          </div>
          <div className="passengerCount">
            <button name="adults" onClick={handleMinus}>
              -
            </button>
            <span>{passengers.adults}</span>
            <button name="adults" onClick={handlePlus}>
              +
            </button>
          </div>

          <div className="passengerInfo">
            <span>Teens</span>
            <span>12-17 years old</span>
          </div>
          <div className="passengerCount">
            <button name="teens" onClick={handleMinus}>
              -
            </button>
            <span>{passengers.teens}</span>
            <button name="teens" onClick={handlePlus}>
              +
            </button>
          </div>

          <div className="passengerInfo">
            <span>Children</span>
            <span>2-11 years old</span>
          </div>
          <div className="passengerCount">
            <button name="children" onClick={handleMinus}>
              -
            </button>
            <span>{passengers.children}</span>
            <button name="children" onClick={handlePlus}>
              +
            </button>
          </div>

          <div className="passengerInfo">
            <span>Infants</span>
            <span>Under 2 years old</span>
          </div>
          <div className="passengerCount">
            <button name="infants" onClick={handleMinus}>
              -
            </button>
            <span>{passengers.infants}</span>
            <button name="infants" onClick={handlePlus}>
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Passengers;
