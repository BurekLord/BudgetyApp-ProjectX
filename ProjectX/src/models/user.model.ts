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

    constructor(uName: string, pass: string, eMail: string, isNew: boolean) {
        this.userName = uName;
        this.password = pass;
        this.email = eMail;
        this.isNew = isNew;
    }

    /*setters*/
    public set userNameSet(uName: string) {
        this.userName = uName;
    }
    public set passwordSet(pass: string) {
        this.password = pass;
    }
    public set emailSet(eMail: string) {
        this.email = eMail;
    }
    public set isNewSet(isNew: boolean) {
        this.isNew = isNew;
    }
    public set langNameSet(lang: string) {
        this.langName = lang;
    }
    public set themeNameSet(theme: string) {
        this.themeName = theme;
    }
    /*param array svih /income/incomeName/value*/
    public set totalIncSet(val: number[]) {
        for (let i = 0; i < val.length; i++) {
            this.totalInc += val[i];
        }
    }
    /*param array svih /expense/expenseName/value*/
    public set totalExpSet(val: number[]) {
        for (let i = 0; i < val.length; i++) {
            this.totalInc += val[i];
        }
    }
    /*param array svih kljuceva /username/categories/category iz baze*/
    public set categoriesExpSet(cats: string[]) {
        this.categoriesExp = cats;
    }

    /*getters*/
    public get userNameGet() {
        return this.userName;
    }
    public get passwordGet() {
        return this.password;
    }
    public get emailGet() {
        return this.email;
    }
    public get isNewGet() {
        return this.isNew;
    }
    public get langNameGet() {
        return this.langName;
    }
    public get themeNameGet() {
        return this.themeName;
    }
    public get totalIncGet() {
        return this.totalInc;
    }
    public get totalExpGet() {
        return this.totalExp;
    }
    public get categoriesExpGet() {
        return this.categoriesExp;
    }
}
