import { useEffect, useRef, useState } from "react";
import OneWayFare from "../models/OneWayFare";
import RyanairService from "../services/RyanairService";
import Fare from "../models/Fare";
import RoundtripFare from "../models/RoundtripFare";
import { DateObject } from "react-multi-date-picker";
import "./ResultsList.css";

const ResultsList = () => {
    const [fares, setFares] = useState<Fare>();
    const [ready, setReady] = useState(false);
    const didMount = useRef(false);

    useEffect(() => {
        const flights = RyanairService.getInstance().getFlightsResults();
        setFares(flights);
    });

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
            return;
        }
        if (fares != null && fares !== undefined) {
            console.log(fares);
            setReady(true);
        } else {
            setReady(false);
        }
    }, [fares]);

    const renderFareHeader = (fare: OneWayFare) => {
        console.log(fare);
        return (
            <div className="divFromTo">
                <svg
                    width="45"
                    height="45"
                    viewBox="0 0 45 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M41.9095 18.8944C42.0229 18.3946 41.9583 17.8673 41.7284 17.416C41.1414 16.3221 40.3592 15.3634 39.4265 14.595C38.4938 13.8266 37.429 13.2636 36.2933 12.9383C35.1575 12.613 33.9732 12.5318 32.8081 12.6993C31.6431 12.8668 30.5203 13.2798 29.5042 13.9146L25.6106 16.3267L16.5556 11.7554C16.2982 11.6121 16.0125 11.5374 15.7226 11.5374C15.4327 11.5374 15.147 11.6121 14.8895 11.7554L9.45657 15.1207C9.18807 15.287 8.96382 15.5246 8.80528 15.8107C8.64673 16.0968 8.55921 16.4218 8.55108 16.7547C8.54231 17.09 8.61441 17.422 8.76038 17.7185C8.90634 18.0151 9.12122 18.266 9.38413 18.447L15.3604 22.4931L12.2093 24.4384L3.55276 25.5666C3.20477 25.6129 2.87676 25.7666 2.60855 26.0092C2.34034 26.2518 2.14347 26.5728 2.04183 26.9333C1.9402 27.2938 1.93817 27.6782 2.036 28.0399C2.13383 28.4015 2.3273 28.7249 2.59293 28.9708L9.00383 34.9232C9.84783 35.7885 10.9287 36.3389 12.0866 36.493C13.2444 36.6472 14.4177 36.3969 15.4328 35.7792L41.004 20.081C41.2219 19.9595 41.4146 19.7917 41.5702 19.5877C41.7259 19.3837 41.8413 19.1478 41.9095 18.8944ZM13.7848 32.5111C13.437 32.7167 13.0358 32.7939 12.6431 32.7306C12.2505 32.6673 11.8881 32.4672 11.6116 32.161L8.17077 28.9902L13.1148 28.3483C13.3577 28.3149 13.5918 28.2289 13.8029 28.0954L19.8879 24.3411C20.1589 24.1731 20.3849 23.9324 20.5436 23.6426C20.7022 23.3528 20.7883 23.0238 20.7934 22.6877C20.7971 22.3538 20.7207 22.0245 20.5716 21.7315C20.4226 21.4385 20.2058 21.1917 19.9422 21.0147L13.9659 16.9492L15.958 15.7237L25.013 20.2366C25.2704 20.3799 25.5561 20.4547 25.846 20.4547C26.1359 20.4547 26.4216 20.3799 26.6791 20.2366L31.3152 17.3577C32.2652 16.7858 33.3534 16.5338 34.4384 16.6344C35.5235 16.735 36.5553 17.1835 37.4001 17.9218L13.7848 32.5111Z"
                        fill="#002C13"
                    />
                </svg>
                <div className="fromToStyle">
                    {`${fare.departureAirport?.airportName} to ${fare.arrivalAirport?.airportName}`}
                </div>
            </div>
        );
    };

    const renderFareDate = (fare: OneWayFare) => {
        const dateObject = new DateObject(fare.departureDate);
        return (
            <div className="datesInfoFromToStyle">
                <div className="fromToStyle datesInfoFromTo">{`${dateObject.day} ${dateObject.month.name}`}</div>
                <div className="fromToStyle datesInfoFromTo dayOfTheWeekFromTo">
                    {dateObject.weekDay.name}
                </div>
            </div>
        );
    };

    const renderFareGrid = (fare: OneWayFare) => {
        const departureTime = fare.departureDate
            .split("T")[1]
            .replace(/:\d{2}$/g, "");
        const arrivalTime = fare.arrivalDate
            .split("T")[1]
            .replace(/:\d{2}$/g, "");

        return (
            <div className="resultsFrame">
                <div className="divResultsInfo">
                    <span className="fromToStyle timeOfDepartureAndArrival">
                        {departureTime}
                    </span>
                    <span className="fromToStyle airportOfDepartureAndArrival">
                        {fare.departureAirport?.airportName}
                    </span>
                </div>

                <div className="divResultsInfo">
                    <div className="line" />
                </div>

                <div className="divResultsInfo">
                    <span className="fromToStyle timeOfDepartureAndArrival">
                        {arrivalTime}
                    </span>
                    <span className="fromToStyle airportOfDepartureAndArrival">
                        {fare.arrivalAirport?.airportName}
                    </span>
                </div>

                <div className="divResultsInfo">
                    <span className="fromToStyle flightNumber">
                        Flight Number
                    </span>
                    <span className="fromToStyle flightNumber">
                        {fare.flightNumber}
                    </span>
                </div>

                <div className="flightCostInfo">
                    <div className="divResultsInfo fareSelection">
                        <span className="fromToStyle flightCostLabel">
                            Value Fare
                        </span>
                        <span className="fromToStyle flightCost">
                            {`${fare.price.currency} ${fare.price.amount}`}
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    if (ready) {
        return (
            <div>
                <div className="divResults">
                    {renderFareHeader(
                        fares instanceof RoundtripFare
                            ? (fares as RoundtripFare).outboundFares
                            : (fares as OneWayFare)
                    )}
                    {renderFareDate(
                        fares instanceof RoundtripFare
                            ? (fares as RoundtripFare).outboundFares
                            : (fares as OneWayFare)
                    )}
                    {renderFareGrid(
                        fares instanceof RoundtripFare
                            ? (fares as RoundtripFare).outboundFares
                            : (fares as OneWayFare)
                    )}
                </div>

                {fares instanceof RoundtripFare && (
                    <div className="divResults">
                        {renderFareHeader(
                            (fares as RoundtripFare).inboundFares
                        )}
                        {renderFareDate((fares as RoundtripFare).inboundFares)}
                        {renderFareGrid((fares as RoundtripFare).inboundFares)}
                    </div>
                )}
            </div>
        );
    }

    return <div>Hello</div>;
};

export default ResultsList;
