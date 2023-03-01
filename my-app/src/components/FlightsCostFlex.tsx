import { Box, Slider } from "@mui/material";
import { useState } from "react";

import "./FlexibleScheduler.css";

interface Props {
    onChange: (selectedCost: any) => void;
}

const marksCost = [
    {
        value: 0,
        label: "€0.00",
    },
    {
        value: 500,
        label: "€500.00",
    },
];

const valueTextCost = (value: number) => {
    return `€${value}.00`;
};

const valueLabelCost = (value: number) => {
    return `€${value}.00`;
};

const FlightsCostFlex = (props: Props) => {
    const [selectedCost, setSelectedCost] = useState(0);

    const handleCostSelection = (event: any) => {
        props.onChange(event.target.value);
        setSelectedCost(event.target.value);
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
                    d="M29.8275 5.14495C30.1371 4.75755 30.5205 4.43541 30.9554 4.19717C31.3903 3.95893 31.8682 3.80932 32.3613 3.75701C32.8545 3.70469 33.3531 3.75071 33.8284 3.8924C34.3036 4.03409 34.746 4.26863 35.13 4.58245L47.3625 14.5725C48.0352 15.1217 48.4964 15.8875 48.6674 16.7389C48.8384 17.5904 48.7085 18.4748 48.3 19.2412C47.2305 18.9143 46.1183 18.7488 45 18.75H43.875L44.9925 17.475L38.55 12.2137L33.2362 18.7537H28.4025L35.6438 9.8437L32.7562 7.48495L23.7638 18.75H18.9638L29.8275 5.14495ZM39.375 37.5C38.8777 37.5 38.4008 37.6975 38.0492 38.0491C37.6975 38.4008 37.5 38.8777 37.5 39.375C37.5 39.8722 37.6975 40.3491 38.0492 40.7008C38.4008 41.0524 38.8777 41.25 39.375 41.25H43.125C43.6223 41.25 44.0992 41.0524 44.4508 40.7008C44.8025 40.3491 45 39.8722 45 39.375C45 38.8777 44.8025 38.4008 44.4508 38.0491C44.0992 37.6975 43.6223 37.5 43.125 37.5H39.375ZM11.25 20.625C11.25 20.1277 11.4475 19.6508 11.7992 19.2991C12.1508 18.9475 12.6277 18.75 13.125 18.75H15.2175L18.1988 15H13.125C11.6332 15 10.2024 15.5926 9.14752 16.6475C8.09263 17.7024 7.5 19.1331 7.5 20.625V43.125C7.5 45.6114 8.48772 47.9959 10.2459 49.7541C12.004 51.5122 14.3886 52.5 16.875 52.5H45C46.9891 52.5 48.8968 51.7098 50.3033 50.3033C51.7098 48.8967 52.5 46.9891 52.5 45V30C52.5 28.0108 51.7098 26.1032 50.3033 24.6967C48.8968 23.2901 46.9891 22.5 45 22.5H13.125C12.6277 22.5 12.1508 22.3024 11.7992 21.9508C11.4475 21.5991 11.25 21.1222 11.25 20.625ZM11.25 43.125V25.9312C11.835 26.1375 12.4688 26.25 13.125 26.25H45C45.9946 26.25 46.9484 26.645 47.6516 27.3483C48.3549 28.0516 48.75 29.0054 48.75 30V45C48.75 45.9945 48.3549 46.9483 47.6516 47.6516C46.9484 48.3549 45.9946 48.75 45 48.75H16.875C15.3832 48.75 13.9524 48.1573 12.8975 47.1024C11.8426 46.0475 11.25 44.6168 11.25 43.125Z"
                    fill="white"
                />
            </svg>
            <div className="questionInfo">
                <span className="question">How much do you want to spend?</span>
            </div>
            <Box sx={{ width: 250 }} className="questionAnswers numberOfDays">
                <Slider
                    aria-label="Always visible"
                    min={0}
                    max={500}
                    defaultValue={0}
                    step={10}
                    getAriaValueText={valueTextCost}
                    marks={marksCost}
                    valueLabelDisplay="on"
                    valueLabelFormat={valueLabelCost}
                    onChange={handleCostSelection}
                />
            </Box>
        </div>
    );
};

export default FlightsCostFlex;
