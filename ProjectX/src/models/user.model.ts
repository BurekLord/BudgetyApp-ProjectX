import { Income } from './income.model';
import { Expense } from './expense.model';

export class User {
    private userName: string;
    private password: string;
    private email: string;
    private isNew: boolean;
    private langName: string;
    private themeName: string;
    private totalInc: number;
    private totalExp: number;
    private categoriesExp: string[];
    private categoriesInc: string[];
    private incomes: Income[];
    private expenses: Expense[];

    constructor(
        userName?: string,
        password?: string,
        email?: string,
        isNew?: boolean,
        langName?: string,
        themeName?: string,
        totalInc?: number,
        totalExp?: number,
        categoriesExp?: string[],
        categoriesInc?: string[],
        incomes?: Income[],
        expenses?: Expense[]
    ) {}

    /**
     * Getter $userName
     * @return {string}
     */
    public get $userName(): string {
        return this.userName;
    }

    /**
     * Getter $password
     * @return {string}
     */
    public get $password(): string {
        return this.password;
    }

    /**
     * Getter $email
     * @return {string}
     */
    public get $email(): string {
        return this.email;
    }

    /**
     * Getter $isNew
     * @return {boolean}
     */
    public get $isNew(): boolean {
        return this.isNew;
    }

    /**
     * Getter $langName
     * @return {string}
     */
    public get $langName(): string {
        return this.langName;
    }

    /**
     * Getter $themeName
     * @return {string}
     */
    public get $themeName(): string {
        return this.themeName;
    }

    /**
     * Getter $totalInc
     * @return {number}
     */
    public get $totalInc(): number {
        return this.totalInc;
    }

    /**
     * Getter $totalExp
     * @return {number}
     */
    public get $totalExp(): number {
        return this.totalExp;
    }

    /**
     * Getter $categoriesExp
     * @return {string[]}
     */
    public get $categoriesExp(): string[] {
        return this.categoriesExp;
    }

    /**
     * Getter $categoriesInc
     * @return {string[]}
     */
    public get $categoriesInc(): string[] {
        return this.categoriesInc;
    }

    /**
     * Getter $incomes
     * @return {Income[]}
     */
    public get $incomes(): Income[] {
        return this.incomes;
    }

    /**
     * Getter $expenses
     * @return {Expense[]}
     */
    public get $expenses(): Expense[] {
        return this.expenses;
    }

    /**
     * Setter $userName
     * @param {string} value
     */
    public set $userName(value: string) {
        this.userName = value;
    }

    /**
     * Setter $password
     * @param {string} value
     */
    public set $password(value: string) {
        this.password = value;
    }

    /**
     * Setter $email
     * @param {string} value
     */
    public set $email(value: string) {
        this.email = value;
    }

    /**
     * Setter $isNew
     * @param {boolean} value
     */
    public set $isNew(value: boolean) {
        this.isNew = value;
    }

    /**
     * Setter $langName
     * @param {string} value
     */
    public set $langName(value: string) {
        this.langName = value;
    }

    /**
     * Setter $themeName
     * @param {string} value
     */
    public set $themeName(value: string) {
        this.themeName = value;
    }

    /**
     * Setter $totalInc
     * @param {number} value
     */
    public set $totalInc(value: number) {
        this.totalInc = value;
    }

    /**
     * Setter $totalExp
     * @param {number} value
     */
    public set $totalExp(value: number) {
        this.totalExp = value;
    }

    /**
     * Setter $categoriesExp
     * @param {string[]} value
     */
    public set $categoriesExp(value: string[]) {
        this.categoriesExp = value;
    }

    /**
     * Setter $categoriesInc
     * @param {string[]} value
     */
    public set $categoriesInc(value: string[]) {
        this.categoriesInc = value;
    }

    /**
     * Setter $incomes
     * @param {Income[]} value
     */
    public set $incomes(value: Income[]) {
        this.incomes = value;
    }

    /**
     * Setter $expenses
     * @param {Expense[]} value
     */
    public set $expenses(value: Expense[]) {
        this.expenses = value;
    }
}
