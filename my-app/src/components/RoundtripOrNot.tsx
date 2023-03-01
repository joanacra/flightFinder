import { ChangeEvent, useState } from "react";
import "./RoundtripOrNot.css";

interface Props {
    initialValue: boolean;
    onChange: () => void;
}

const RoundtripOrNot = (props: Props) => {
    const [value, setValue] = useState(props.initialValue);

    const handleChange = (_: ChangeEvent<HTMLInputElement>) => {
        props.onChange();
        setValue(!value);
    };

    return (
        <div className="wrapper">
            <div
                className={
                    !value
                        ? "roundtripLabel"
                        : "roundtripLabel labelNotSelected"
                }
            >
                One way
            </div>
            <label className="switch">
                <input
                    type="checkbox"
                    onChange={handleChange}
                    checked={value}
                />
                <span className="slider round"></span>
            </label>
            <div
                className={
                    value ? "roundtripLabel" : "roundtripLabel labelNotSelected"
                }
            >
                Round trip
            </div>
        </div>
    );
};

export default RoundtripOrNot;
