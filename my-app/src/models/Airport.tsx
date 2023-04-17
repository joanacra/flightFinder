export default class Airport {
    airportCode: string;
    airportName: string;
    airportCountry: string;

    public constructor(code: string, name: string, country: string) {
        this.airportCode = code;
        this.airportName = name;
        this.airportCountry = country;
    }

    public format() {
        return `${this.airportName}, ${this.airportCountry} (${this.airportCode})`;
    }
}
