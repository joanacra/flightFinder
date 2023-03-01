import { Radio } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import { useState } from "react";
import "./FlexibleDates.css";

export enum DateType {
    EXACT,
    FLEXIBLE,
}

interface Props {
    onChange: (newDateType: any) => void;
}

const FlexibleDates = (props: Props) => {
    const [dateType, setDateType] = useState(DateType.EXACT);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const newDateType =
            (event.target as HTMLInputElement).value === "1"
                ? DateType.FLEXIBLE
                : DateType.EXACT;
        props.onChange(newDateType);
        setDateType(newDateType);
    };

    return (
        <RadioGroup
            name="dates"
            value={dateType}
            onChange={handleChange}
            className="wrapper"
        >
            <FormControlLabel
                key="exact"
                value={DateType.EXACT}
                control={<Radio />}
                label="Exact dates"
                className="typeSelected"
            />
            <FormControlLabel
                key="flexible"
                value={DateType.FLEXIBLE}
                control={<Radio />}
                label="Flexible dates"
                className="typeSelected"
            />
        </RadioGroup>
    );
};

export default FlexibleDates;
