export class Settings {
    private langName: string;
    private langPath: string;
    private themeName: string;
    private themePath: string;

    /*setters*/
    public set langNameSet(lName: string) {
        this.langName = lName;
    }
    public set langPathSet(lPath: string) {
        this.langName = lPath;
    }
    public set themeNameSet(tName: string) {
        this.themeName = tName;
    }
    public set themePathSet(tPath: string) {
        this.themePath = tPath;
    }

    /*getters*/
    public get langNameSet() {
        return this.langName;
    }
    public get langPathSet() {
        return this.langName;
    }
    public get themeNameSet() {
        return this.themeName;
    }
    public get themePathSet() {
        return this.themePath;
    }
}
