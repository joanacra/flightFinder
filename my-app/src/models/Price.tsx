export default class Price {
    amount: number;
    currency: string;

    public constructor(amount: number, currency: string) {
        this.amount = amount;
        this.currency = currency;
    }
}
