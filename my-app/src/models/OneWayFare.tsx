import Airport from "./Airport";
import Price from "./Price";

export default class OneWayFare {
    departureAirport: Airport;
    arrivalAirport: Airport;
    departureDate: string;
    arrivalDate: string;
    price: Price;
    flightNumber: string;

    public constructor(
        departureAirport: Airport,
        arrivalAirport: Airport,
        departureDate: string,
        arrivalDate: string,
        price: Price,
        flightNumber: string
    ) {
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.departureDate = departureDate;
        this.arrivalDate = arrivalDate;
        this.price = price;
        this.flightNumber = flightNumber;
    }
}
