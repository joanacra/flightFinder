import { Box, Slider } from "@mui/material";
import { useState } from "react";

import "./FlexibleScheduler.css";

interface Props {
    value: number | null;
    onChange: (selectedDuration: any) => void;
}

const marksDays = [
    {
        value: 1,
        label: "1 day",
    },
    {
        value: 15,
        label: "15 days",
    },
];

const valueTextDays = (value: number) => {
    return `${value} days`;
};

const valueLabelDays = (value: number) => {
    return `${value} day(s), ${value - 1} night(s)`;
};

const TripDurationFlex = (props: Props) => {
    const [selectedDuration, setSelectedDuration] = useState(props.value);

    const handleDurationSelection = (event: any) => {
        props.onChange(event.target.value);
        setSelectedDuration(event.target.value);
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
                    d="M32.5 32.5H37.5C38.1631 32.5 38.799 32.7634 39.2678 33.2322C39.7366 33.7011 40 34.337 40 35C40 35.663 39.7366 36.2989 39.2678 36.7678C38.799 37.2366 38.1631 37.5 37.5 37.5H30C29.6715 37.501 29.3459 37.437 29.0422 37.3117C28.7384 37.1864 28.4624 37.0023 28.2301 36.77C27.9977 36.5376 27.8136 36.2616 27.6883 35.9579C27.563 35.6541 27.4991 35.3286 27.5 35V25C27.5 24.337 27.7634 23.7011 28.2323 23.2322C28.7011 22.7634 29.337 22.5 30 22.5C30.6631 22.5 31.299 22.7634 31.7678 23.2322C32.2366 23.7011 32.5 24.337 32.5 25V32.5ZM14.6725 22.1525C14.1013 21.8876 13.606 21.4831 13.2323 20.9763C12.8585 20.4696 12.6184 19.8769 12.5341 19.2529C12.4497 18.6289 12.5239 17.9937 12.7497 17.4059C12.9754 16.8181 13.3456 16.2967 13.826 15.8896C14.3064 15.4825 14.8815 15.203 15.4984 15.0767C16.1153 14.9505 16.754 14.9816 17.3557 15.1672C17.9574 15.3528 18.5026 15.6869 18.9412 16.1387C19.3797 16.5906 19.6975 17.1455 19.865 17.7525C20.766 17.2227 21.7072 16.7646 22.68 16.3825C21.5867 15.6228 20.7645 14.5337 20.3334 13.2741C19.9022 12.0144 19.8845 10.65 20.283 9.37959C20.6814 8.10921 21.4751 6.99926 22.5485 6.21148C23.6218 5.4237 24.9186 4.99926 26.25 5H33.75C35.0814 4.99926 36.3783 5.4237 37.4516 6.21148C38.5249 6.99926 39.3187 8.10921 39.7171 9.37959C40.1155 10.65 40.0979 12.0144 39.6667 13.2741C39.2355 14.5337 38.4134 15.6228 37.32 16.3825C38.295 16.7675 39.2375 17.225 40.135 17.7525C40.3026 17.1455 40.6203 16.5906 41.0589 16.1387C41.4974 15.6869 42.0427 15.3528 42.6444 15.1672C43.2461 14.9816 43.8848 14.9505 44.5017 15.0767C45.1186 15.203 45.6937 15.4825 46.1741 15.8896C46.6545 16.2967 47.0246 16.8181 47.2504 17.4059C47.4762 17.9937 47.5503 18.6289 47.466 19.2529C47.3816 19.8769 47.1415 20.4696 46.7678 20.9763C46.3941 21.4831 45.8988 21.8876 45.3275 22.1525C47.7722 25.0696 49.3338 28.6237 49.8289 32.3975C50.3239 36.1712 49.7319 40.0078 48.1224 43.4568C46.5128 46.9058 43.9525 49.8238 40.7422 51.8683C37.5319 53.9129 33.8049 54.9989 29.9988 54.9989C26.1927 54.9989 22.4657 53.9129 19.2554 51.8683C16.0451 49.8238 13.4848 46.9058 11.8752 43.4568C10.2657 40.0078 9.67364 36.1712 10.1687 32.3975C10.6638 28.6237 12.2278 25.0696 14.6725 22.1525ZM30 50C33.9783 50 37.7936 48.4197 40.6066 45.6066C43.4197 42.7936 45 38.9782 45 35C45 31.0218 43.4197 27.2064 40.6066 24.3934C37.7936 21.5804 33.9783 20 30 20C26.0218 20 22.2065 21.5804 19.3934 24.3934C16.5804 27.2064 15 31.0218 15 35C15 38.9782 16.5804 42.7936 19.3934 45.6066C22.2065 48.4197 26.0218 50 30 50ZM26.25 10C25.9185 10 25.6006 10.1317 25.3662 10.3661C25.1317 10.6005 25 10.9185 25 11.25C25 11.5815 25.1317 11.8995 25.3662 12.1339C25.6006 12.3683 25.9185 12.5 26.25 12.5H33.75C34.0816 12.5 34.3995 12.3683 34.6339 12.1339C34.8683 11.8995 35 11.5815 35 11.25C35 10.9185 34.8683 10.6005 34.6339 10.3661C34.3995 10.1317 34.0816 10 33.75 10H26.25Z"
                    fill="white"
                />
            </svg>
            <div className="questionInfo">
                <span className="question">How long is your trip?</span>
                <span className="question mandatory">Mandatory</span>
            </div>
            <Box sx={{ width: 200 }} className="questionAnswers numberOfDays">
                <Slider
                    aria-label="Always visible"
                    min={1}
                    max={15}
                    defaultValue={selectedDuration ?? 1}
                    getAriaValueText={valueTextDays}
                    step={1}
                    marks={marksDays}
                    valueLabelDisplay="on"
                    valueLabelFormat={valueLabelDays}
                    onChange={handleDurationSelection}
                />
            </Box>
        </div>
    );
};

export default TripDurationFlex;