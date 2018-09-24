import { Income } from './../models/income.model';
import { User } from './../models/user.model';
export class Converter {
    constructor() {}

    static modelToJson<T>(model: T): JSON {
        let json;
        if (model instanceof User) {
            console.log('INSIDE THE CONVERTER');
            json = {
                name: model.getName() ? model.getName() : null,
                password: model.getPassword() ? model.getPassword() : null,
                email: model.getEmail() ? model.getEmail() : null,
                language: model.getLanguage() ? model.getLanguage() : null,
                theme: model.getTheme() ? model.getTheme() : null,
                totalInc: model.getTotalInc() ? model.getTotalInc() : null,
                totalExp: model.getTotalExp() ? model.getTotalExp() : null,
                categoriesExp: model.getCategoriesExp()
                    ? model.getCategoriesExp()
                    : null,
                categoriesInc: model.getCategoriesInc()
                    ? model.getCategoriesInc()
                    : null,
                incomeRefs: model.getIncomeRefs()
                    ? model.getIncomeRefs()
                    : null,
                expenseRefs: model.getExpenseRefs()
                    ? model.getExpenseRefs()
                    : null
            };
            return json;
        } else if (model instanceof Income) {
            json = {
                name: model.getName() ? model.getName() : null,
                value: model.getValue() ? model.getValue() : null,
                category: model.getCategory() ? model.getCategory() : null,
                timeStamp: model.getTimeStamp() ? model.getTimeStamp() : null,
                userId: model.getUserId() ? model.getUserId() : null
            };
            return json;
        }
    }

    static modelToJsonList<T>(models: T[]): JSON[] {
        const json = [];
        models.forEach(model => {
            json.push(this.modelToJson(model));
        });
        return json;
    }

    // static jsonToModel<T>(json: any): T {
    //     if ( T instanceof (User)) {

    //     return new User(
    //         json.name ? json.name : undefined,
    //         json.password ? json.password : undefined,
    //         json.email ? json.password : undefined,
    //         json.language ? json.language : undefined,
    //         json.theme ? json.theme : undefined,
    //         json.totalInc ? json.totalInc : undefined,
    //         json.totalExp ? json.totalExp : undefined,
    //         json.categoriesExp ? json.categoriesExp : undefined,
    //         json.categoriesInc ? json.categoriesInc : undefined,
    //         json.incomeRefs ? json.incomeRefs : undefined,
    //         json.expenseRefs ? json.expenseRefs : undefined
    //     );
    //     }
    // }

    // static jsonToModelList(json: any[]): model[] {
    //     const models = [];
    //     json.forEach(el => {
    //         models.push(model.jsonToModel(el));
    //     });
    //     return models;
    // }
}
