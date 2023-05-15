export default class Price {
    currency: string;
    amount: number;

    public constructor(currency: string, amount: number) {
        this.currency = currency;
        this.amount = amount;
    }
}
