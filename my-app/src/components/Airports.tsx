import { useEffect, useRef, useState } from "react";
import Airport from "../models/Airport";
import "./Airports.css";
import RyanairService from "../services/RyanairService";

interface Props {
    onChange: (newAirports: any) => void;
}

const Airports = (props: Props) => {
    const [showDepAirports, setShowDepAirports] = useState(false);
    const [showArrAirports, setShowArrAirports] = useState(false);
    const [departureAirport, setDepartureAirport] = useState<Airport | null>();
    const [arrivalAirport, setArrivalAirport] = useState<Airport | null>();
    const [departureAirportsToShow, setDepartureAiportsToShow] = useState<
        Airport[]
    >([]);
    const [arrivalAirportsToShow, setArrivalAiportsToShow] = useState<
        Airport[]
    >([]);
    const [departureAirportFilter, setDepartureAirportFilter] = useState("");
    const [arrivalAirportFilter, setArrivalAirportFilter] = useState("");
    const [totalDepartureAirports, setTotalDepartureAirports] = useState<
        Airport[]
    >([]);
    const [totalArrivalAirports, setTotalArrivalAirports] = useState<Airport[]>(
        []
    );

    const depAirRef = useRef(null);
    const departureAirPopUpRef = useRef(null);
    const departureAirRef = useRef(null);
    const arrAirRef = useRef(null);
    const arrivalAirPopUpRef = useRef(null);
    const arrivalAirRef = useRef(null);

    const service = new RyanairService();

    useEffect(() => {
        function handleClicks(event: any) {
            if (
                departureAirRef?.current &&
                (departureAirRef.current as HTMLDivElement).contains(
                    event.target
                )
            ) {
                return;
            }
            if (
                departureAirPopUpRef?.current &&
                !(departureAirPopUpRef.current as HTMLDivElement).contains(
                    event.target
                )
            ) {
                setShowDepAirports((previous) => !previous);
            }
        }

        document.addEventListener("mousedown", handleClicks);
        return () => {
            document.removeEventListener("mousedown", handleClicks);
        };
    });

    useEffect(() => {
        function handleClicks(event: any) {
            if (
                arrivalAirRef?.current &&
                (arrivalAirRef.current as HTMLDivElement).contains(event.target)
            ) {
                return;
            }
            if (
                arrivalAirPopUpRef?.current &&
                !(arrivalAirPopUpRef.current as HTMLDivElement).contains(
                    event.target
                )
            ) {
                setShowArrAirports((previous) => !previous);
            }
        }

        document.addEventListener("mousedown", handleClicks);
        return () => {
            document.removeEventListener("mousedown", handleClicks);
        };
    });

    useEffect(() => {
        service
            .getDepartureAirports()
            .then((airports) => setTotalDepartureAirports(airports));
    }, []);

    const getArrivalAirports = (airportCode: string) => {
        console.log(airportCode);
        service
            .getArrivalAirports(departureAirport?.airportCode ?? airportCode)
            .then((airports) => setTotalArrivalAirports(airports));
    };

    const focusAirportInput = (airport: string) => (event: any) => {
        event.preventDefault();
        if (airport === "departure") {
            if (depAirRef?.current != null) {
                (depAirRef.current as HTMLInputElement).focus();
            }
            applyDepartureSearchFilter(departureAirportFilter);
            setShowDepAirports((previous) => !previous);
        } else {
            if (arrAirRef?.current != null) {
                (arrAirRef.current as HTMLInputElement).focus();
            }
            applyArrivalSearchFilter(arrivalAirportFilter);
            setShowArrAirports((previous) => !previous);
        }
    };

    const applyDepartureSearchFilter = (searchFilter: any) => {
        const depFilterResults = totalDepartureAirports.filter((airport) =>
            airport.format().toLowerCase().includes(searchFilter.toLowerCase())
        );
        setDepartureAiportsToShow(depFilterResults);
    };

    const applyArrivalSearchFilter = (searchFilter: any) => {
        const arrFilterResults = totalArrivalAirports.filter((airport) =>
            airport.format().toLowerCase().includes(searchFilter.toLowerCase())
        );
        setArrivalAiportsToShow(arrFilterResults);
    };

    const updateDepartureAirport = (event: any) => {
        event.preventDefault();
        if (!showDepAirports) {
            // if input is not focused, focus
            focusAirportInput("departure");
            setShowDepAirports((previous) => !previous);
        }
        if (
            // if departure airport is selected and press backspace, set the airport as null to be able to select another
            event.nativeEvent.inputType == "deleteContentBackward" &&
            departureAirport != null
        ) {
            setDepartureAirport(null);
        }

        const newDepartureFilter = event.target.value;
        setDepartureAirportFilter(newDepartureFilter);
        applyDepartureSearchFilter(newDepartureFilter);
    };

    const updateArrivalAirport = (event: any) => {
        event.preventDefault();
        if (!showArrAirports) {
            // if input is not focused, focus
            focusAirportInput("arrival");
            setShowArrAirports((previous) => !previous);
        }
        if (
            // if arrival airport is selected and press backspace, set the airport as null to be able to select another
            event.nativeEvent.inputType == "deleteContentBackward" &&
            arrivalAirport != null
        ) {
            setArrivalAirport(null);
        }

        const newArrivalFilter = event.target.value;
        setArrivalAirportFilter(newArrivalFilter);
        applyArrivalSearchFilter(newArrivalFilter);
    };

    const handleDepartureSelection = (selectedAirport: Airport) => (e: any) => {
        e.preventDefault();
        setDepartureAirport(selectedAirport);
        setDepartureAirportFilter("");
        setShowDepAirports(false);
        getArrivalAirports(selectedAirport.airportCode);
        props.onChange({
            departureAirport: selectedAirport,
            arrivalAirport: arrivalAirport,
        });
    };

    const handleArrivalSelection = (selectedAirport: Airport) => (e: any) => {
        e.preventDefault();
        setArrivalAirport(selectedAirport);
        setArrivalAirportFilter("");
        setShowArrAirports(false);
        props.onChange({
            departureAirport: departureAirport,
            arrivalAirport: selectedAirport,
        });
    };

    const renderDepartureAirports = () => {
        return departureAirportsToShow.map((airport: Airport) => (
            <div
                key={airport.airportCode}
                className="airportLabel individualAirport"
                onClick={handleDepartureSelection(airport)}
            >
                {airport.format()}
            </div>
        ));
    };

    const renderArrivalAirports = () => {
        return arrivalAirportsToShow.map((airport: Airport) => (
            <div
                key={airport.airportCode}
                className="airportLabel individualAirport"
                onClick={handleArrivalSelection(airport)}
            >
                {airport.format()}
            </div>
        ));
    };

    return (
        <div className="divAirports">
            <div>
                <div
                    ref={departureAirRef}
                    className="airports"
                    onClick={focusAirportInput("departure")}
                >
                    <label htmlFor="departureAirport" className="airportLabel">
                        Departure
                    </label>
                    <input
                        ref={depAirRef}
                        type="text"
                        placeholder="From..."
                        autoComplete="off"
                        name="departureAirport"
                        value={
                            departureAirport != null
                                ? departureAirport.format()
                                : departureAirportFilter
                        }
                        onChange={updateDepartureAirport}
                        className="airportLabel input"
                    />
                </div>
                {showDepAirports && (
                    <div className="listOfAirports" ref={departureAirPopUpRef}>
                        {departureAirportsToShow.length > 0 ? (
                            renderDepartureAirports()
                        ) : (
                            <div className="airportLabel individualAirport">
                                No results found.
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div>
                <div
                    ref={arrivalAirRef}
                    className="airports"
                    onClick={focusAirportInput("arrival")}
                >
                    <label htmlFor="arrivalAirport" className="airportLabel">
                        Destination
                    </label>
                    <input
                        ref={arrAirRef}
                        type="text"
                        placeholder="To..."
                        autoComplete="off"
                        name="arrivalAirport"
                        onChange={updateArrivalAirport}
                        value={
                            arrivalAirport != null
                                ? arrivalAirport.format()
                                : arrivalAirportFilter
                        }
                        className="airportLabel input"
                    />
                </div>
                {showArrAirports && (
                    <div className="listOfAirports" ref={arrivalAirPopUpRef}>
                        {arrivalAirportsToShow.length > 0 ? (
                            renderArrivalAirports()
                        ) : (
                            <div className="airportLabel individualAirport">
                                No results found.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Airports;
