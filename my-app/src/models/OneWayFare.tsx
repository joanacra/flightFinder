import Airport from "./Airport";
import Fare from "./Fare";
import Price from "./Price";

export default class OneWayFare extends Fare {
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
        super();
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.departureDate = departureDate;
        this.arrivalDate = arrivalDate;
        this.price = price;
        this.flightNumber = flightNumber;
    }
}
