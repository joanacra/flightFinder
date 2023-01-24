import { ChangeEvent, useState } from "react";
import Passengers from "./Passengers";
import RoundtripOrNot from "./RoundtripOrNot";

function SearchForm() {
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
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const getDate = () => {
    const date = new Date();
    const month =
      date.getMonth() + 1 >= 10
        ? date.getMonth() + 1
        : `0${date.getMonth() + 1}`;
    const currentDate = `${date.getFullYear()}-${month}-${date.getDate()}`;
    return currentDate;
  };

  const updatePassengers = (newPassengers: any) => {
    setForm({ ...form, passengers: newPassengers });
  };

  const toggleRoundtrip = () => {
    setForm({ ...form, roundtrip: !form.roundtrip });
  };

  return (
    <>
      <form>
        <RoundtripOrNot initialValue={true} onChange={toggleRoundtrip} />
        <label htmlFor="departureAirport">Departure</label>
        <input
          type="text"
          placeholder="From..."
          name="departureAirport"
          value={form.departureAirport}
          onChange={handleChange}
        />
        <label htmlFor="arrivalAirport">Destination</label>
        <input
          type="text"
          placeholder="To..."
          name="arrivalAirport"
          value={form.arrivalAirport}
          onChange={handleChange}
        />
        <label htmlFor="dateOfDeparture">Depart</label>
        <input
          type="date"
          name="dateOfDeparture"
          value={form.dateOfDeparture}
          min={getDate()}
          max="2025-12-31"
          onChange={handleChange}
        />
        <label htmlFor="dateOfReturn">Return</label>
        <input
          type="date"
          name="dateOfReturn"
          value={form.dateOfReturn}
          min={getDate()}
          max="2025-12-31"
          onChange={handleChange}
        />
        <Passengers onChange={updatePassengers} />
        <button>Search</button>
      </form>
      <div>
        <div>Departure airport: {form.departureAirport}</div>
        <div>Arrival airport: {form.arrivalAirport}</div>
        <div>Date of departure: {form.dateOfDeparture}</div>
        <div>Date of return: {form.dateOfReturn}</div>
        <div>
          Passengers: {form.passengers.adults}, {form.passengers.teens},{" "}
          {form.passengers.children}, {form.passengers.infants}
        </div>
        <div>Roundtrip: {form.roundtrip === true ? "yes" : "no"}</div>
      </div>
    </>
  );
}

export default SearchForm;
