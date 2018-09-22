// import { formatDate } from '@angular/common';

export class Income {
    /*fields*/
    private incomeName: string;
    private value: number;
    private category: string;
    private timeStamp: Date;
    private userId: string;

    constructor(
        incomeName?: string,
        value?: number,
        category?: string,
        timeStamp?: Date,
        userId?: string
    ) {
        this.incomeName = incomeName;
        this.value = value;
        this.category = category;
        this.timeStamp = timeStamp;
        this.userId = userId;
    }

    /**
     * Getter $incomeName
     * @return {string}
     */
    public get $incomeName(): string {
        return this.incomeName;
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
     * Setter $incomeName
     * @param {string} value
     */
    public set $incomeName(value: string) {
        this.incomeName = value;
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
