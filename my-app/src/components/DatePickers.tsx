import { useRef, useState } from "react";
import { DateObject } from "react-multi-date-picker";
import DatePicker from "react-multi-date-picker";
import "./DatePickers.css";

interface Props {
    roundtrip: boolean;
    onChange: (newDates: any) => void;
}

type DateType = "dateOfDeparture" | "dateOfReturn";

const DatePickers = (props: Props) => {
    const [departureDate, setDepartureDate] = useState<DateObject>();
    const [returnDate, setReturnDate] = useState<DateObject>();
    const [isDepCalendarOpen, setIsDepCalendarOpen] = useState(false);
    const [isRetCalendarOpen, setIsRetCalendarOpen] = useState(false);
    const depDateRef = useRef(null);
    const retDateRef = useRef(null);

    const handleChange = (dateType: DateType) => (e: any) => {
        const newDepDate = props.roundtrip
            ? (e[0] as DateObject)
            : (e as DateObject);
        const newRetDate = props.roundtrip
            ? e.length > 1
                ? (e[1] as DateObject)
                : (e[0] as DateObject)
            : (e as DateObject);
        if (dateType === "dateOfDeparture") {
            const newDates = {
                dateOfDeparture: newDepDate?.format("DD/MM/YYYY"),
                dateOfReturn: returnDate?.format("DD/MM/YYYY"),
            };
            props.onChange(newDates);
            setDepartureDate(newDepDate);
            if (props.roundtrip) {
                toggleCalendar("dateOfReturn");
            }
        } else {
            const newDates = {
                dateOfDeparture: departureDate?.format("DD/MM/YYYY"),
                dateOfReturn: newRetDate?.format("DD/MM/YYYY"),
            };
            props.onChange(newDates);
            setReturnDate(newRetDate);
        }
        toggleCalendar(dateType);
    };

    const toggleCalendar = (dateType: DateType) => {
        const dateref =
            dateType === "dateOfDeparture" ? depDateRef : retDateRef;
        const calendarisOpen =
            dateType === "dateOfDeparture"
                ? isDepCalendarOpen
                : isRetCalendarOpen;

        if (dateref?.current != null) {
            if (!calendarisOpen) {
                (dateref.current as any).openCalendar();
            } else {
                (dateref.current as any).closeCalendar();
            }
        }
    };

    const handleDateClick = (dateType: DateType) => (event: any) => {
        event.preventDefault();
        toggleCalendar(dateType);
    };

    const getDateValues = () => {
        if (!props.roundtrip) {
            return departureDate;
        }
        let ret = [];
        if (departureDate) {
            ret.push(departureDate);
        }
        if (returnDate) {
            ret.push(returnDate);
        }
        return ret;
    };

    return (
        <>
            <div
                className={
                    props.roundtrip
                        ? "divDates divDateOfDepart"
                        : "divDates oneWayDate"
                }
            >
                <div
                    className="dateButton"
                    onClick={handleDateClick("dateOfDeparture")}
                >
                    <label htmlFor="dateOfDeparture" className="labelDates">
                        Depart
                    </label>
                    <div className="labelDates formattedDate">
                        {departureDate
                            ? departureDate?.format("ddd, DD MMMM YYYY")
                            : "Choose date"}
                    </div>
                </div>
                <DatePicker
                    name="dateOfDeparture"
                    ref={depDateRef}
                    onChange={handleChange("dateOfDeparture")}
                    numberOfMonths={2}
                    value={getDateValues()}
                    range={props.roundtrip}
                    minDate={new DateObject()}
                    maxDate={new DateObject().add(2, "years")}
                    style={{ display: "none" }}
                    onOpen={() => setIsDepCalendarOpen(true)}
                    onClose={() => setIsDepCalendarOpen(false)}
                    calendarPosition={"bottom-start"}
                    fixMainPosition={true}
                    fixRelativePosition={true}
                    offsetY={2}
                />
            </div>
            {props.roundtrip && (
                <div className="divDates divDateOfReturn">
                    <div
                        className="dateButton"
                        onClick={handleDateClick("dateOfReturn")}
                    >
                        <label htmlFor="dateOfReturn" className="labelDates">
                            Return
                        </label>
                        <div className="labelDates formattedDate">
                            {returnDate
                                ? returnDate?.format("ddd, DD MMMM YYYY")
                                : "Choose date"}
                        </div>
                    </div>
                    <DatePicker
                        name="dateOfReturn"
                        ref={retDateRef}
                        onChange={handleChange("dateOfReturn")}
                        numberOfMonths={2}
                        value={getDateValues()}
                        range={props.roundtrip}
                        minDate={new DateObject()}
                        maxDate={new DateObject().add(2, "years")}
                        style={{ display: "none" }}
                        onOpen={() => setIsRetCalendarOpen(true)}
                        onClose={() => setIsRetCalendarOpen(false)}
                        calendarPosition={"bottom-end"}
                        fixMainPosition={true}
                        fixRelativePosition={true}
                        offsetY={2}
                    />
                </div>
            )}
        </>
    );
};

export default DatePickers;
