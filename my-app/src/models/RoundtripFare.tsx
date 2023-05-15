import OneWayFare from "./OneWayFare";

export default class RoundtripFare {
    outboundFares: OneWayFare[];
    inboundFares: OneWayFare[];

    public constructor(
        outboundFares: OneWayFare[],
        inboundFares: OneWayFare[]
    ) {
        this.outboundFares = outboundFares;
        this.inboundFares = inboundFares;
    }
}
