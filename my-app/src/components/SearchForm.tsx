import { useState } from "react";
import DatePickers from "./DatePickers";
import Passengers from "./Passengers";
import RoundtripOrNot from "./RoundtripOrNot";
import FlexibleDates, { DateType } from "./FlexibleDates";
import FlexibleScheduler from "./FlexibleScheduler";
import Airports from "./Airports";
import Airport from "../models/Airport";
import RyanairService from "../services/RyanairService";
import ResultsList from "./ResultsList";
import "./SearchForm.css";

type State = {
    departureAirport: Airport | null;
    arrivalAirport: Airport | null;
    dateOfDeparture: string;
    dateOfReturn: string;
    passengers: {
        adults: number;
        teens: number;
        children: number;
        infants: number;
    };
    roundtrip: boolean;
    dateType: DateType;
    flexibleScheduling: {
        flexMonth: string;
        flexDuration: number | null;
        flexWeekDay: string;
        flexFlightCost: number | null;
    };
};

const SearchForm = () => {
    const [form, setForm] = useState<State>({
        departureAirport: null,
        arrivalAirport: null,
        dateOfDeparture: "",
        dateOfReturn: "",
        passengers: {
            adults: 1,
            teens: 0,
            children: 0,
            infants: 0,
        },
        roundtrip: true,
        dateType: DateType.EXACT,
        flexibleScheduling: {
            flexMonth: "",
            flexDuration: null,
            flexWeekDay: "",
            flexFlightCost: null,
        },
    });
    const [search, setSearch] = useState(false);
    const [showFares, setShowFares] = useState(false);

    const updateAirports = (selectedAirports: any) => {
        setForm({ ...form, ...selectedAirports });
    };

    const updateDates = (newDates: any) => {
        setForm({ ...form, ...newDates });
    };

    const updatePassengers = (newPassengers: any) => {
        setForm({ ...form, passengers: newPassengers });
    };

    const toggleRoundtrip = () => {
        setForm({ ...form, roundtrip: !form.roundtrip });
    };

    const updateDateType = (newDateType: any) => {
        setForm({ ...form, dateType: newDateType });
    };

    const updateFlexScheduler = (newFlexScheduler: any) => {
        setForm({ ...form, flexibleScheduling: newFlexScheduler });
    };

    const searchFlights = (event: any) => {
        event.preventDefault();
        setSearch(true);

        setShowFares(false);
        if (form.roundtrip) {
            RyanairService.getInstance()
                .getExactRoundtripFlights(
                    (form.departureAirport as Airport).airportCode,
                    (form.arrivalAirport as Airport).airportCode,
                    form.dateOfDeparture
                        .replace(/\//g, "-")
                        .split("-")
                        .reverse()
                        .join("-"),
                    form.dateOfReturn
                        .replace(/\//g, "-")
                        .split("-")
                        .reverse()
                        .join("-")
                )
                .then((_) => {
                    setShowFares(true);
                });
        } else {
            RyanairService.getInstance()
                .getExactOneWayFlights(
                    (form.departureAirport as Airport).airportCode,
                    (form.arrivalAirport as Airport).airportCode,
                    form.dateOfDeparture
                        .replace(/\//g, "-")
                        .split("-")
                        .reverse()
                        .join("-")
                )
                .then((_) => {
                    setShowFares(true);
                });
        }
    };

    return (
        <>
            <div className="frame">
                <form className="form">
                    <div className="divFlexDatesAndRoundTrip">
                        <RoundtripOrNot
                            initialValue={true}
                            onChange={toggleRoundtrip}
                        />

                        <FlexibleDates onChange={updateDateType} />
                    </div>

                    <Airports onChange={updateAirports} />

                    <div className="divOtherInfo">
                        {form.dateType === DateType.EXACT ? (
                            <DatePickers
                                roundtrip={form.roundtrip}
                                onChange={updateDates}
                            />
                        ) : (
                            <FlexibleScheduler
                                roundtrip={form.roundtrip}
                                onChange={updateFlexScheduler}
                            />
                        )}
                        <Passengers onChange={updatePassengers} />
                        <button
                            className="elements label searchButton"
                            onClick={searchFlights}
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>

            {search && showFares && (
                <div>
                    <ResultsList />
                </div>
            )}
        </>
    );
};

export default SearchForm;
