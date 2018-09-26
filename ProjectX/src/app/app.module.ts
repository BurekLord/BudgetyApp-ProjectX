import { CategoriesComponent } from './main/categories/categories.component';
import { StatisticComponent } from './main/statistic/statistic.component';
import { SettingsComponent } from './main/settings/settings.component';
import { BalanceComponent } from './main/balance/balance.component';
import { DBService } from './../services/db.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';

import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { DescriptionComponent } from './main/description/description.component';
import { LoginComponent } from './main/login/login.component';

import { UserService } from './../services/user.services';
import { SetupComponent } from './main/setup/setup.component';

// import ngx-translate and the http loader
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MainComponent,
        DescriptionComponent,
        LoginComponent,
        SetupComponent,
        BalanceComponent,
        SettingsComponent,
        StatisticComponent,
        CategoriesComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [UserService, DBService],
    bootstrap: [AppComponent]
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
