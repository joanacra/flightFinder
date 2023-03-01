import { useRef, useState } from "react";
import { DateObject } from "react-multi-date-picker";

import "./FlexibleScheduler.css";

const MONTH_SCROLL_SIZE = 53;

interface Props {
    value: string;
    onChange: (selectedMonth: any) => void;
}

const PickFlexMonth = (props: Props) => {
    const [monthOffset, setMonthOffset] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(props.value);
    const monthsRef = useRef(null);

    const months = () => {
        const months = [
            new DateObject(),
            new DateObject().add(1, "months"),
            new DateObject().add(2, "months"),
            new DateObject().add(3, "months"),
            new DateObject().add(4, "months"),
            new DateObject().add(5, "months"),
            new DateObject().add(6, "months"),
            new DateObject().add(7, "months"),
            new DateObject().add(8, "months"),
            new DateObject().add(9, "months"),
            new DateObject().add(10, "months"),
            new DateObject().add(11, "months"),
        ];

        return months;
    };

    const renderMonths = () => {
        return months().map((date) => (
            <div
                key={date.month.name}
                className={
                    selectedMonth === date.month.name
                        ? "roundedMonth selectedMonth"
                        : "roundedMonth"
                }
                id={date.month.name}
                onClick={handleMonthSelection}
            >
                {date.month.shortName}
            </div>
        ));
    };

    const slide = (dir: string) => (_: any) => {
        const newMonthOffset = monthOffset + (dir === "left" ? 1 : -1);
        setMonthOffset(newMonthOffset);
        (monthsRef.current as any).scrollLeft =
            MONTH_SCROLL_SIZE * newMonthOffset;
    };

    const handleMonthSelection = (e: any) => {
        e.preventDefault();
        props.onChange(e.target.id);
        setSelectedMonth(e.target.id);
    };

    return (
        <div className="questionEntry">
            <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12.5 55C11.125 55 9.9475 54.5108 8.9675 53.5325C7.98917 52.5525 7.5 51.375 7.5 50V15C7.5 13.625 7.98917 12.4483 8.9675 11.47C9.9475 10.49 11.125 10 12.5 10H15V5H20V10H40V5H45V10H47.5C48.875 10 50.0525 10.49 51.0325 11.47C52.0108 12.4483 52.5 13.625 52.5 15V50C52.5 51.375 52.0108 52.5525 51.0325 53.5325C50.0525 54.5108 48.875 55 47.5 55H12.5ZM12.5 50H47.5V25H12.5V50ZM12.5 20H47.5V15H12.5V20ZM30 35C29.2917 35 28.6983 34.76 28.22 34.28C27.74 33.8017 27.5 33.2083 27.5 32.5C27.5 31.7917 27.74 31.1975 28.22 30.7175C28.6983 30.2392 29.2917 30 30 30C30.7083 30 31.3025 30.2392 31.7825 30.7175C32.2608 31.1975 32.5 31.7917 32.5 32.5C32.5 33.2083 32.2608 33.8017 31.7825 34.28C31.3025 34.76 30.7083 35 30 35ZM20 35C19.2917 35 18.6975 34.76 18.2175 34.28C17.7392 33.8017 17.5 33.2083 17.5 32.5C17.5 31.7917 17.7392 31.1975 18.2175 30.7175C18.6975 30.2392 19.2917 30 20 30C20.7083 30 21.3025 30.2392 21.7825 30.7175C22.2608 31.1975 22.5 31.7917 22.5 32.5C22.5 33.2083 22.2608 33.8017 21.7825 34.28C21.3025 34.76 20.7083 35 20 35ZM40 35C39.2917 35 38.6983 34.76 38.22 34.28C37.74 33.8017 37.5 33.2083 37.5 32.5C37.5 31.7917 37.74 31.1975 38.22 30.7175C38.6983 30.2392 39.2917 30 40 30C40.7083 30 41.3017 30.2392 41.78 30.7175C42.26 31.1975 42.5 31.7917 42.5 32.5C42.5 33.2083 42.26 33.8017 41.78 34.28C41.3017 34.76 40.7083 35 40 35ZM30 45C29.2917 45 28.6983 44.76 28.22 44.28C27.74 43.8017 27.5 43.2083 27.5 42.5C27.5 41.7917 27.74 41.1983 28.22 40.72C28.6983 40.24 29.2917 40 30 40C30.7083 40 31.3025 40.24 31.7825 40.72C32.2608 41.1983 32.5 41.7917 32.5 42.5C32.5 43.2083 32.2608 43.8017 31.7825 44.28C31.3025 44.76 30.7083 45 30 45ZM20 45C19.2917 45 18.6975 44.76 18.2175 44.28C17.7392 43.8017 17.5 43.2083 17.5 42.5C17.5 41.7917 17.7392 41.1983 18.2175 40.72C18.6975 40.24 19.2917 40 20 40C20.7083 40 21.3025 40.24 21.7825 40.72C22.2608 41.1983 22.5 41.7917 22.5 42.5C22.5 43.2083 22.2608 43.8017 21.7825 44.28C21.3025 44.76 20.7083 45 20 45ZM40 45C39.2917 45 38.6983 44.76 38.22 44.28C37.74 43.8017 37.5 43.2083 37.5 42.5C37.5 41.7917 37.74 41.1983 38.22 40.72C38.6983 40.24 39.2917 40 40 40C40.7083 40 41.3017 40.24 41.78 40.72C42.26 41.1983 42.5 41.7917 42.5 42.5C42.5 43.2083 42.26 43.8017 41.78 44.28C41.3017 44.76 40.7083 45 40 45Z"
                    fill="white"
                />
            </svg>
            <div className="questionInfo">
                <span className="question">
                    Select the month you want to travel
                </span>
                <span className="question mandatory">Mandatory</span>
            </div>

            <div className="questionAnswers">
                <svg
                    className={monthOffset === 0 ? "hidden" : "arrow"}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={slide("right")}
                >
                    <path
                        d="M9.12494 21.1L0.699942 12.7C0.599942 12.6 0.528942 12.4917 0.486942 12.375C0.444942 12.2584 0.424276 12.1334 0.424942 12C0.424942 11.8667 0.445942 11.7417 0.487942 11.625C0.529942 11.5084 0.600609 11.4 0.699942 11.3L9.12494 2.87502C9.35828 2.64169 9.64994 2.52502 9.99994 2.52502C10.3499 2.52502 10.6499 2.65002 10.8999 2.90002C11.1499 3.15002 11.2749 3.44169 11.2749 3.77502C11.2749 4.10836 11.1499 4.40002 10.8999 4.65002L3.54994 12L10.8999 19.35C11.1333 19.5834 11.2499 19.871 11.2499 20.213C11.2499 20.555 11.1249 20.8507 10.8749 21.1C10.6249 21.35 10.3333 21.475 9.99994 21.475C9.66661 21.475 9.37494 21.35 9.12494 21.1Z"
                        fill="white"
                    />
                </svg>
                <div ref={monthsRef} className="months">
                    {renderMonths()}
                </div>
                <svg
                    className={monthOffset === 7 ? "hidden" : "arrow"}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={slide("left")}
                >
                    <path
                        d="M7.15002 21.1C6.90002 20.85 6.77502 20.554 6.77502 20.212C6.77502 19.8707 6.90002 19.575 7.15002 19.325L14.475 12L7.12502 4.65C6.89169 4.41667 6.77502 4.125 6.77502 3.775C6.77502 3.425 6.90002 3.125 7.15002 2.875C7.40002 2.625 7.69602 2.5 8.03802 2.5C8.37936 2.5 8.67502 2.625 8.92502 2.875L17.325 11.3C17.425 11.4 17.496 11.5083 17.538 11.625C17.5794 11.7417 17.6 11.8667 17.6 12C17.6 12.1333 17.5794 12.2583 17.538 12.375C17.496 12.4917 17.425 12.6 17.325 12.7L8.90002 21.125C8.66669 21.3583 8.37936 21.475 8.03802 21.475C7.69602 21.475 7.40002 21.35 7.15002 21.1Z"
                        fill="white"
                    />
                </svg>
            </div>
        </div>
    );
};

export default PickFlexMonth;
