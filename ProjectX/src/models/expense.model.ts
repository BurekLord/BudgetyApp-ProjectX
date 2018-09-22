// import { formatDate } from '@angular/common';

export class Expense {
    /*fields*/
    private expenseName: string;
    private value: number;
    private category: string;
    private timeStamp: Date;
    private userId: string;

    constructor(
        expenseName: string,
        value: number,
        category: string,
        timeStamp: Date,
        userId: string
    ) {
        this.expenseName = expenseName;
        this.value = value;
        this.category = category;
        this.timeStamp = timeStamp;
        this.userId = userId;
    }

    /**
     * Getter $expenseName
     * @return {string}
     */
    public get $expenseName(): string {
        return this.expenseName;
    }

    /**
     * Getter $value
     * @return {number}
     */
    public get $value(): number {
        return this.value;
    }

    /**
     * Getter $category
     * @return {string}
     */
    public get $category(): string {
        return this.category;
    }

    /**
     * Getter $timeStamp
     * @return {Date}
     */
    public get $timeStamp(): Date {
        return this.timeStamp;
    }

    /**
     * Getter $userId
     * @return {string}
     */
    public get $userId(): string {
        return this.userId;
    }

    /**
     * Setter $expenseName
     * @param {string} value
     */
    public set $expenseName(value: string) {
        this.expenseName = value;
    }

    /**
     * Setter $value
     * @param {number} value
     */
    public set $value(value: number) {
        this.value = value;
    }

    /**
     * Setter $category
     * @param {string} value
     */
    public set $category(value: string) {
        this.category = value;
    }

    /**
     * Setter $timeStamp
     * @param {Date} value
     */
    public set $timeStamp(value: Date) {
        this.timeStamp = value;
    }

    /**
     * Setter $userId
     * @param {string} value
     */
    public set $userId(value: string) {
        this.userId = value;
    }
}
