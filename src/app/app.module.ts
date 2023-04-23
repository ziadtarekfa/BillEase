import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarComponent } from "./components/layout/navbar/navbar.component";
import { LayoutWrapperComponent } from "./components/layout/layout-wrapper/layout-wrapper.component";
import { NavItemComponent } from "./components/layout/navbar/nav-item/nav-item.component";
import { AngularSvgIconModule } from "angular-svg-icon";
import { NgOptimizedImage } from "@angular/common";

import { environment } from "../environments/environment";
// import { provideDatabase, getDatabase } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ElectricityComponent } from "./features/electricity/electricity.component";
import { WaterComponent } from "./features/water/water.component";
import { TelephoneComponent } from "./features/telephone/telephone.component";
import { PageComponent } from './components/layout/page/page.component';
import { MatIconModule } from '@angular/material/icon';
import { BillTableComponent } from './bill-table/bill-table.component';
import { CardComponent } from './card/card.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
    declarations: [
        AppComponent,
        SignInComponent,
        SignUpComponent,
        DashboardComponent,
        NavbarComponent,
        LayoutWrapperComponent,
        NavItemComponent,
        ElectricityComponent,
        WaterComponent,
        TelephoneComponent,
        PageComponent,
        BillTableComponent,
        CardComponent,
        PaginationComponent,



    ],
    imports: [

        BrowserModule,
        RouterModule.forRoot([
            { path: "signin", component: SignInComponent },
            { path: "signup", component: SignUpComponent },
            { path: "water", component: WaterComponent },
            { path: "electricity", component: ElectricityComponent },
            { path: "telephone", component: TelephoneComponent },
            { path: "", component: DashboardComponent },
        ]),
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        MatIconModule,
        // provideFirebaseApp(() => initializeApp(environment.firebase)),
        // provideAuth(() => getAuth()),
        // provideDatabase(() => getDatabase()),
        AngularSvgIconModule.forRoot(),
        NgOptimizedImage,


    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
