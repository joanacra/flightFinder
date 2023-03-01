import { useEffect, useRef, useState } from "react";

import PickFlexMonth from "./PickFlexMonth";
import TripDurationFlex from "./TripDurationFlex";
import PickWeekDayFlex from "./PickWeekDayFlex";
import FlightsCostFlex from "./FlightsCostFlex";

import "./FlexibleScheduler.css";

interface Props {
    roundtrip: boolean;
    onChange: (newFlexScheduler: any) => void;
}

const FlexibleScheduler = (props: Props) => {
    const [flexScheduler, setFlexScheduler] = useState({
        flexMonth: "",
        flexDuration: 0,
        flexWeekDay: "",
        flexFlightCost: 0,
    });
    const [showScheduler, setShowScheduler] = useState(false);
    const flexPopUpRef = useRef(null);
    const flexRef = useRef(null);

    useEffect(() => {
        function handleClicks(event: any) {
            if (
                flexRef?.current &&
                (flexRef.current as HTMLDivElement).contains(event.target)
            ) {
                return;
            }
            if (
                flexPopUpRef?.current &&
                !(flexPopUpRef.current as HTMLDivElement).contains(
                    event.target
                ) &&
                showScheduler
            ) {
                setShowScheduler((previous) => !previous);
            }
        }

        document.addEventListener("mousedown", handleClicks);
        return () => {
            document.removeEventListener("mousedown", handleClicks);
        };
    });

    const handleClick = (e: any) => {
        e.preventDefault();
        setShowScheduler((previous) => !previous);
    };

    const updateFlexMonth = (selectedMonth: any) => {
        const newState = { ...flexScheduler, flexMonth: selectedMonth };
        setFlexScheduler(newState);
        props.onChange(newState);
    };

    const updateFlexDuration = (selectedDuration: any) => {
        const newState = { ...flexScheduler, flexDuration: selectedDuration };
        setFlexScheduler(newState);
        props.onChange(newState);
    };

    const updateFlexWeekDay = (selectedWeekDay: any) => {
        const newState = { ...flexScheduler, flexWeekDay: selectedWeekDay };
        setFlexScheduler(newState);
        props.onChange(newState);
    };

    const updateFlexFlightCost = (selectedCost: any) => {
        const newState = { ...flexScheduler, flexFlightCost: selectedCost };
        setFlexScheduler(newState);
        props.onChange(newState);
    };

    return (
        <div className="flexibleDates">
            <div
                ref={flexRef}
                onClick={handleClick}
                className="divFlexibleDates"
            >
                <label htmlFor="tripDates" className="labelFlex">
                    Trip dates
                </label>
                <button className="labelFlex toggleInputFlex">
                    Choose date
                </button>
            </div>
            {showScheduler && (
                <div className="flexDatesDisplay" ref={flexPopUpRef}>
                    <PickFlexMonth onChange={updateFlexMonth} />

                    {props.roundtrip && (
                        <TripDurationFlex onChange={updateFlexDuration} />
                    )}

                    <PickWeekDayFlex onChange={updateFlexWeekDay} />

                    <FlightsCostFlex onChange={updateFlexFlightCost} />
                </div>
            )}
            {showScheduler && (
                <div className="ep-arrow rmdp-ep-arrow rmdp-ep-shadow scheduler-arrow"></div>
            )}
        </div>
    );
};

export default FlexibleScheduler;
