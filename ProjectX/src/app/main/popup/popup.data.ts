export class PopupData {
    constructor(
        public title?: string,
        public message?: string,
        public options?: boolean
    ) {
        this.title = title;
        this.message = message;
    }
}
