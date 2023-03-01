import { ChangeEvent, useRef, useState } from "react";
import DatePickers from "./DatePickers";
import Passengers from "./Passengers";
import RoundtripOrNot from "./RoundtripOrNot";
import FlexibleDates, { DateType } from "./FlexibleDates";
import FlexibleScheduler from "./FlexibleScheduler";
import "./SearchForm.css";

const SearchForm = () => {
    const [form, setForm] = useState({
        departureAirport: "",
        arrivalAirport: "",
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
            month: "",
            duration: 0,
            weekDay: "",
            cost: 0,
        },
    });
    const depAirRef = useRef(null);
    const arrAirRef = useRef(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value });
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

    const focusAirportInput = (airport: string) => (event: any) => {
        if (airport === "departure") {
            if (depAirRef?.current != null) {
                (depAirRef.current as HTMLInputElement).focus();
            }
        } else {
            if (arrAirRef?.current != null) {
                (arrAirRef.current as HTMLInputElement).focus();
            }
        }
    };

    return (
        <div className="frame">
            <form className="form">
                <div className="divDatesAndRoundTrip">
                    <RoundtripOrNot
                        initialValue={true}
                        onChange={toggleRoundtrip}
                    />

                    <FlexibleDates onChange={updateDateType} />
                </div>

                <div className="divAirports">
                    <div
                        className="elements"
                        onClick={focusAirportInput("departure")}
                    >
                        <label htmlFor="departureAirport" className="label">
                            Departure
                        </label>
                        <input
                            ref={depAirRef}
                            type="text"
                            placeholder="From..."
                            name="departureAirport"
                            value={form.departureAirport}
                            onChange={handleChange}
                            className="label input"
                        />
                    </div>

                    <div
                        className="elements"
                        onClick={focusAirportInput("arrival")}
                    >
                        <label htmlFor="arrivalAirport" className="label">
                            Destination
                        </label>
                        <input
                            ref={arrAirRef}
                            type="text"
                            placeholder="To..."
                            name="arrivalAirport"
                            value={form.arrivalAirport}
                            onChange={handleChange}
                            className="label input"
                        />
                    </div>
                </div>

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
                    <button className="elements label searchButton">
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchForm;
