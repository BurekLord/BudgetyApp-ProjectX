export class User {
    private username: string;
    private password: string;
    private email: string;
    private langName: string;
    private themeName: string;
    private totalInc: number;
    private totalExp: number;
    private categories: string[];

    /*setters*/
    public set usernameSet(uName: string) {
        this.username = uName;
    }
    public set passwordSet(pass: string) {
        this.password = pass;
    }
    public set emailSet(eMail: string) {
        this.email = eMail;
    }
    public set langNameSet(lang: string) {
        this.langName = lang;
    }
    public set themeNameSet(theme: string) {
        this.themeName = theme;
    }
    /*param array svih Income.value*/
    public set totalIncSet(val: number[]) {
        for (let i = 0; i < val.length; i++) {
            this.totalInc += val[i];
        }
    }
    /*param array svih Expense.value*/
    public set totalExpSet(val: number[]) {
        for (let i = 0; i < val.length; i++) {
            this.totalInc += val[i];
        }
    }
    /*param array svih kljuceva /username/categories/category iz baze*/
    public set categoriesSet(cat: string[]) {
        this.categories = cat;
    }

    /*getters*/
    public get usernameGet() {
        return this.username;
    }
    public get passwordGet() {
        return this.password;
    }
    public get emailGet() {
        return this.email;
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
    public get categoriesGet() {
        return this.categories;
    }
}
