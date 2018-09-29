import { config } from './../../../services/config';
import { User } from './../../../models/user.model';
import { DBService } from './../../../services/db.service';
import {
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChanges
} from '@angular/core';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnChanges {
    @Input()
    userData: User;
    showInput = false;
    showBtnFinish = false;
    constructor(private db: DBService) {}

    ngOnChanges(changes: SimpleChanges) {
        this.userData = changes.userData.currentValue;
    }

    ngOnInit() {}

    onAdd(value: string) {
        this.showInput = true;
        this.showBtnFinish = true;
        console.log(this.userData);
        if (value) {
            if (this.userData) {
                if (this.userData.getCategoriesExp()) {
                    this.userData.getCategoriesExp().push(value);
                    this.db.updateItem<User>(
                        config.users_endpoint,
                        this.userData.getId(),
                        this.userData
                    );
                } else {
                    this.userData.setCategoriesExp([]);
                }
            }
        }
    }

    onFinish() {
        this.showInput = false;
        this.showBtnFinish = false;
        this.db.updateItem<User>(
            config.users_endpoint,
            this.userData.getId(),
            this.userData
        );
    }

    onRemove(cat: any) {
        // ovo moze mnoooooogo bolje, al sam lenj
        this.userData
            .getCategoriesExp()
            .splice(this.userData.getCategoriesExp().indexOf(cat), 1);
        this.db.updateItem<User>(
            config.users_endpoint,
            this.userData.getId(),
            this.userData
        );
    }
}
