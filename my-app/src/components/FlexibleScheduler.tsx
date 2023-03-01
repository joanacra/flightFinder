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
        flexDuration: null,
        flexWeekDay: "",
        flexFlightCost: null,
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

    const renderInformation = () => {
        let ret = "";
        if (props.roundtrip) {
            if (
                flexScheduler.flexMonth &&
                flexScheduler.flexDuration &&
                flexScheduler.flexWeekDay
            ) {
                ret = `${flexScheduler.flexDuration} day(s) in ${flexScheduler.flexMonth}, leaving on a ${flexScheduler.flexWeekDay}`;
            }
        } else {
            if (flexScheduler.flexMonth && flexScheduler.flexWeekDay) {
                ret = `Going in ${flexScheduler.flexMonth}, leaving on ${flexScheduler.flexWeekDay}`;
            }
        }

        if (ret) {
            if (flexScheduler.flexFlightCost) {
                ret += ` for less than €${flexScheduler.flexFlightCost}`;
            }
        } else {
            ret = "Choose duration and other information";
        }
        return ret;
    };

    return (
        <div className="flexibleDates">
            <div
                ref={flexRef}
                onClick={handleClick}
                className="divFlexibleDates"
            >
                <label htmlFor="tripDates" className="labelFlex">
                    Trip information
                </label>
                <button className="labelFlex toggleInputFlex">
                    {renderInformation()}
                </button>
            </div>
            {showScheduler && (
                <div className="flexDatesDisplay" ref={flexPopUpRef}>
                    <PickFlexMonth
                        value={flexScheduler.flexMonth}
                        onChange={updateFlexMonth}
                    />

                    {props.roundtrip && (
                        <TripDurationFlex
                            value={flexScheduler.flexDuration}
                            onChange={updateFlexDuration}
                        />
                    )}

                    <PickWeekDayFlex
                        value={flexScheduler.flexWeekDay}
                        onChange={updateFlexWeekDay}
                    />

                    <FlightsCostFlex
                        value={flexScheduler.flexFlightCost}
                        onChange={updateFlexFlightCost}
                    />
                </div>
            )}
            {showScheduler && (
                <div className="ep-arrow rmdp-ep-arrow rmdp-ep-shadow scheduler-arrow"></div>
            )}
        </div>
    );
};

export default FlexibleScheduler;
