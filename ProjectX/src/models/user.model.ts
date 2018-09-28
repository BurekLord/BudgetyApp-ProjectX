export class User {
    private name: string;
    private password: string;
    private email: string;
    private language: string;
    private theme: string;
    // ovo cemo da zadrzimo jer ce dobavljanje svih income a expensova biti zaseban poziv ka bazi
    // i kad god se taj poziv obavi izracunacemo totalInc i totalExp
    private totalInc: number;
    private totalExp: number;
    private categoriesExp: string[]; // niz kategorija
    private categoriesInc: string[];
    // fora da cemo morati nekako u bazi da napravimo parametrizovani poziv za listu refova za odredjeno vreme. al ne znam kako.
    // za sad nek ostane da poziva sve stalno
    private incomeRefs: string; // referenca od incomes documenta incomes collekcije
    private expenseRefs: string; // niz $key od expense tabele

    constructor(
        name?: string,
        password?: string,
        email?: string,
        language?: string,
        theme?: string,
        totalInc?: number,
        totalExp?: number,
        categoriesExp?: string[],
        categoriesInc?: string[],
        incomeRefs?: string,
        expenseRefs?: string
    ) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.language = language;
        this.theme = theme;
        this.totalInc = totalInc;
        this.totalExp = totalExp;
        this.categoriesExp = categoriesExp;
        this.categoriesInc = categoriesInc;
        this.incomeRefs = incomeRefs;
        this.expenseRefs = expenseRefs;
    }

    /**
     * Getter name
     * @return {string}
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Getter password
     * @return {string}
     */
    public getPassword(): string {
        return this.password;
    }

    /**
     * Getter email
     * @return {string}
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Getter language
     * @return {string}
     */
    public getLanguage(): string {
        return this.language;
    }

    /**
     * Getter theme
     * @return {string}
     */
    public getTheme(): string {
        return this.theme;
    }

    /**
     * Getter totalInc
     * @return {number}
     */
    public getTotalInc(): number {
        return this.totalInc;
    }

    /**
     * Getter totalExp
     * @return {number}
     */
    public getTotalExp(): number {
        return this.totalExp;
    }

    /**
     * Getter categoriesExp
     * @return {string[]}
     */
    public getCategoriesExp(): string[] {
        return this.categoriesExp;
    }

    /**
     * Getter categoriesInc
     * @return {string[]}
     */
    public getCategoriesInc(): string[] {
        return this.categoriesInc;
    }

    /**
     * Getter incomeRefs
     * @return {string}
     */
    public getIncomeRefs(): string {
        return this.incomeRefs;
    }

    /**
     * Getter expenseRefs
     * @return {string}
     */
    public getExpenseRefs(): string {
        return this.expenseRefs;
    }

    /**
     * Setter name
     * @param {string} value
     */
    public setName(value: string) {
        this.name = value;
    }

    /**
     * Setter password
     * @param {string} value
     */
    public setPassword(value: string) {
        this.password = value;
    }

    /**
     * Setter email
     * @param {string} value
     */
    public setEmail(value: string) {
        this.email = value;
    }

    /**
     * Setter language
     * @param {string} value
     */
    public setLanguage(value: string) {
        this.language = value;
    }

    /**
     * Setter theme
     * @param {string} value
     */
    public setTheme(value: string) {
        this.theme = value;
    }

    /**
     * Setter totalInc
     * @param {number} value
     */
    public setTotalInc(value: number) {
        this.totalInc = value;
    }

    /**
     * Setter totalExp
     * @param {number} value
     */
    public setTotalExp(value: number) {
        this.totalExp = value;
    }

    /**
     * Setter categoriesExp
     * @param {string[]} value
     */
    public setCategoriesExp(value: string[]) {
        this.categoriesExp = value;
    }

    /**
     * Setter categoriesInc
     * @param {string[]} value
     */
    public setCategoriesInc(value: string[]) {
        this.categoriesInc = value;
    }

    /**
     * Setter incomeRefs
     * @param {string} value
     */
    public setIncomeRefs(value: string) {
        this.incomeRefs = value;
    }

    /**
     * Setter expenseRefs
     * @param {string} value
     */
    public setExpenseRefs(value: string) {
        this.expenseRefs = value;
    }
}
