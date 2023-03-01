import { useEffect, useRef, useState } from "react";
import "./Passengers.css";

type PassengerType = "adults" | "teens" | "children" | "infants";

interface Props {
    onChange: (newPassengers: any) => void;
}

const Passengers = (props: Props) => {
    const [showPassengers, setShowPassengers] = useState(false);
    const [passengers, setPassengers] = useState({
        adults: 1,
        teens: 0,
        children: 0,
        infants: 0,
    });
    const passPopUpRef = useRef(null);
    const passRef = useRef(null);

    useEffect(() => {
        function handleClicks(event: any) {
            if (
                passRef?.current &&
                (passRef.current as HTMLDivElement).contains(event.target)
            ) {
                return;
            }
            if (
                passPopUpRef?.current &&
                !(passPopUpRef.current as HTMLDivElement).contains(
                    event.target
                ) &&
                showPassengers
            ) {
                setShowPassengers((previous) => !previous);
            }
        }

        document.addEventListener("mousedown", handleClicks);
        return () => {
            document.removeEventListener("mousedown", handleClicks);
        };
    });

    const handleClick = (e: any) => {
        e.preventDefault();
        setShowPassengers((previous) => !previous);
    };

    const handlePlus = (e: any) => {
        e.preventDefault();
        const targetName = e.target.name as PassengerType;
        if (
            (targetName === "infants" &&
                passengers.infants < passengers.adults) ||
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
        <div className="divPassengers">
            <div
                ref={passRef}
                onClick={handleClick}
                className="passengersButtonContainer"
            >
                <label className="labelPassengers">Passengers</label>
                <button className="labelPassengers togglePassengersDisplay">
                    {renderPassengers()}
                </button>
            </div>
            {showPassengers && (
                <div ref={passPopUpRef} className="passengerDisplay">
                    <div className="passengerEntry">
                        <div className="passengerInfo">
                            <span className="labelPassengers passengerSpan">
                                Adults
                            </span>
                            <span className="labelPassengers passengerSpan detailSpan">
                                18+ years old
                            </span>
                        </div>
                        <div className="passengerCount">
                            <button
                                className="labelPassengers minusAndPlusButton"
                                name="adults"
                                onClick={handleMinus}
                            >
                                -
                            </button>
                            <span className="labelPassengers passengerSpan quantitySpan">
                                {passengers.adults}
                            </span>
                            <button
                                className="labelPassengers minusAndPlusButton"
                                name="adults"
                                onClick={handlePlus}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="passengerEntry">
                        <div className="passengerInfo">
                            <span className="labelPassengers passengerSpan">
                                Teens
                            </span>
                            <span className="labelPassengers passengerSpan detailSpan">
                                12-17 years old
                            </span>
                        </div>
                        <div className="passengerCount">
                            <button
                                className="labelPassengers minusAndPlusButton"
                                name="teens"
                                onClick={handleMinus}
                            >
                                -
                            </button>
                            <span className="labelPassengers passengerSpan quantitySpan">
                                {passengers.teens}
                            </span>
                            <button
                                className="labelPassengers minusAndPlusButton"
                                name="teens"
                                onClick={handlePlus}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="passengerEntry">
                        <div className="passengerInfo">
                            <span className="labelPassengers passengerSpan">
                                Children
                            </span>
                            <span className="labelPassengers passengerSpan detailSpan">
                                2-11 years old
                            </span>
                        </div>
                        <div className="passengerCount">
                            <button
                                className="labelPassengers minusAndPlusButton"
                                name="children"
                                onClick={handleMinus}
                            >
                                -
                            </button>
                            <span className="labelPassengers passengerSpan quantitySpan">
                                {passengers.children}
                            </span>
                            <button
                                className="labelPassengers minusAndPlusButton"
                                name="children"
                                onClick={handlePlus}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="passengerEntry">
                        <div className="passengerInfo">
                            <span className="labelPassengers passengerSpan">
                                Infants
                            </span>
                            <span className="labelPassengers passengerSpan detailSpan">
                                Under 2 years old
                            </span>
                        </div>
                        <div className="passengerCount">
                            <button
                                className="labelPassengers minusAndPlusButton"
                                name="infants"
                                onClick={handleMinus}
                            >
                                -
                            </button>
                            <span className="labelPassengers passengerSpan quantitySpan">
                                {passengers.infants}
                            </span>
                            <button
                                className="labelPassengers minusAndPlusButton"
                                name="infants"
                                onClick={handlePlus}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Passengers;
