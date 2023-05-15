import Fare from "./Fare";
import OneWayFare from "./OneWayFare";

export default class RoundtripFare extends Fare {
    outboundFares: OneWayFare;
    inboundFares: OneWayFare;

    public constructor(outboundFares: OneWayFare, inboundFares: OneWayFare) {
        super();
        this.outboundFares = outboundFares;
        this.inboundFares = inboundFares;
    }
}
