import axios from "axios";
import Airport from "../models/Airport";
import Price from "../models/Price";
import OneWayFare from "../models/OneWayFare";
import RoundtripFare from "../models/RoundtripFare";
import Fare from "../models/Fare";

class RyanairService {
    private flightsResults?: Fare;

    private static INSTANCE: RyanairService;

    public static getInstance() {
        if (!this.INSTANCE) {
            this.INSTANCE = new RyanairService();
        }
        return this.INSTANCE;
    }

    public getFlightsResults() {
        return this.flightsResults;
    }

    public getDepartureAirports() {
        const url =
            "https://www.ryanair.com/api/views/locate/5/airports/en/active";
        return axios
            .get(url)
            .then(function (response) {
                const airports = response.data.map(
                    (airport: {
                        code: string;
                        name: string;
                        country: { name: string };
                    }) =>
                        new Airport(
                            airport.code,
                            airport.name,
                            airport.country.name
                        )
                );

                return airports;
            })
            .catch(function (error) {
                console.log(error);
                return [];
            });
    }

    public getArrivalAirports(departureAirportCode: string) {
        const url = `https://www.ryanair.com/api/views/locate/searchWidget/routes/en/airport/${departureAirportCode}`;
        return axios.get(url).then(function (response) {
            const airports = response.data.map(
                (airport: {
                    arrivalAirport: {
                        code: string;
                        name: string;
                        country: { name: string };
                    };
                }) =>
                    new Airport(
                        airport.arrivalAirport.code,
                        airport.arrivalAirport.name,
                        airport.arrivalAirport.country.name
                    )
            );

            return airports;
        });
    }

    public getExactOneWayFlights(
        departureAirportCode: string,
        arrivalAirportCode: string,
        departureDate: string
    ) {
        //only returns 1 fare, no matter how many are actually available (ryanair's issue)
        const self = this;
        const url = `https://services-api.ryanair.com/farfnd/3/oneWayFares?departureAirportIataCode=${departureAirportCode}&arrivalAirportIataCode=${arrivalAirportCode}&outboundDepartureDateFrom=${departureDate}&outboundDepartureDateTo=${departureDate}`;
        return axios.get(url).then(function (response) {
            const oneWayFares = response.data.fares.map(
                (oneWayFare: {
                    outbound: {
                        departureAirport: any;
                        arrivalAirport: any;
                        departureDate: string;
                        arrivalDate: string;
                        price: any;
                        flightNumber: string;
                    };
                }) =>
                    new OneWayFare(
                        new Airport(
                            oneWayFare.outbound.departureAirport.iataCode,
                            oneWayFare.outbound.departureAirport.name,
                            oneWayFare.outbound.departureAirport.countryName
                        ),
                        new Airport(
                            oneWayFare.outbound.arrivalAirport.iataCode,
                            oneWayFare.outbound.arrivalAirport.name,
                            oneWayFare.outbound.arrivalAirport.countryName
                        ),
                        oneWayFare.outbound.departureDate,
                        oneWayFare.outbound.arrivalDate,
                        new Price(
                            oneWayFare.outbound.price.currencySymbol,
                            oneWayFare.outbound.price.value
                        ),
                        oneWayFare.outbound.flightNumber
                    )
            );
            self.flightsResults = oneWayFares[0];
            return oneWayFares[0];
        });
    }

    public getExactRoundtripFlights(
        departureAirportCode: string,
        arrivalAirportCode: string,
        departureDate: string, //outbound
        arrivalDate: string //inbound
    ) {
        const self = this;
        const outboundFaresPromise = this.getExactOneWayFlights(
            departureAirportCode,
            arrivalAirportCode,
            departureDate
        );
        const inboundFaresPromise = this.getExactOneWayFlights(
            arrivalAirportCode,
            departureAirportCode,
            arrivalDate
        );

        return Promise.all([outboundFaresPromise, inboundFaresPromise]).then(
            ([outboundFares, inboundFares]) => {
                const result = new RoundtripFare(outboundFares, inboundFares);
                this.flightsResults = result;
                return result;
            }
        );
    }
}

export default RyanairService;
