import { ChangeEvent, useState } from "react";
import "./RoundtripOrNot.css";

interface Props {
  initialValue: boolean;
  onChange: () => void;
}

function RoundtripOrNot(props: Props) {
  const [value, setValue] = useState(props.initialValue);
  
  const handleChange = (_: ChangeEvent<HTMLInputElement>) => {
    props.onChange();
    setValue(!value)
  }

  return (
    <div className="wrapper">
      <div>One way</div>
      <label className="switch">
        <input type="checkbox" onChange={handleChange} checked={value} />
        <span className="slider round"></span>
      </label>
      <div>Round trip</div>
    </div>
    
  );
}

export default RoundtripOrNot;
