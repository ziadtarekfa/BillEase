import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app-root/app.component";
import { SignInComponent } from "./features/_global/auth/sign-in/sign-in.component";
import { SignUpComponent } from "./features/_global/auth/sign-up/sign-up.component";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./features/user/bills/dashboard/dashboard.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarComponent } from "./components/layout/navbar/navbar.component";
import { LayoutWrapperComponent } from "./components/layout/layout-wrapper/layout-wrapper.component";
import { NavItemComponent } from "./components/layout/navbar/nav-item/nav-item.component";
import { AngularSvgIconModule } from "angular-svg-icon";
import { NgOptimizedImage } from "@angular/common";
import { environment } from "../environments/environment";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { ElectricityComponent } from "./features/user/bills/electricity/electricity.component";
import { WaterComponent } from "./features/user/bills/water/water.component";
import { TelephoneComponent } from "./features/user/bills/telephone/telephone.component";
import { PageComponent } from "@components/layout/page/page.component";
import { MatIconModule } from "@angular/material/icon";
import { CardComponent } from "@components/card/card.component";
import { DashboardRouterComponent } from "./features/_global/auth/dashboard-router/dashboard-router.component";
import { TableComponent } from "./components/table/table.component";
import { TableRowComponent } from "./components/table/table-row/table-row.component";
import { TableHeaderComponent } from "./components/table/table-header/table-header.component";
import { TableHeadComponent } from "./components/table/table-head/table-head.component";
import { HttpClientModule } from "@angular/common/http";
import { LoadingComponent } from "./components/loading/loading.component";
import { PaymentComponent } from "./features/user/bills/payment/payment.component";
import { BillsTableComponent } from "./features/user/bills/bills-table/bills-table.component";
import { BillSummaryComponent } from "./features/_global/bill-summary/bill-summary.component";
import { InputComponent } from "./components/form/input/input.component";
import { DashboardAdminComponent } from "./features/admin/dashboard-admin/dashboard-admin.component";
import { RatesComponent } from "./features/admin/rates/rates.component";
import { UserDetailsComponent } from "./features/admin/user-details/user-details.component";
import { DialogComponent } from "./components/layout/dialog/dialog.component";
import { UserCardComponent } from "./features/admin/user-card/user-card.component";
import { ServiceProvidersComponent } from "./features/admin/telephone-config/service-providers/service-providers.component";
import { ServiceProviderInfoComponent } from "./features/admin/telephone-config/service-provider-info/service-provider-info.component";

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
        CardComponent,
        DashboardRouterComponent,
        TableComponent,
        TableRowComponent,
        TableHeaderComponent,
        TableHeadComponent,
        LoadingComponent,
        PaymentComponent,
        BillsTableComponent,
        BillSummaryComponent,
        InputComponent,
        RatesComponent,
        DashboardAdminComponent,
        UserDetailsComponent,
        DialogComponent,
        UserCardComponent,
        ServiceProvidersComponent,
        ServiceProviderInfoComponent,
    ],

    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot([
            {
                path: "bill/:id",
                component: PaymentComponent,
            },
            { path: "signin", component: SignInComponent },
            { path: "signup", component: SignUpComponent },
            { path: "water", component: WaterComponent },
            { path: "electricity", component: ElectricityComponent },
            { path: "telephone", component: TelephoneComponent },
            { path: "dashboard", component: DashboardComponent },
            { path: "", component: DashboardRouterComponent },
            { path: "admin/dashboard", component: DashboardAdminComponent },
            { path: "admin/rates", component: RatesComponent },
            {
                path: "admin/user-details/:userId",
                component: UserDetailsComponent,
            },
            {
                path: "admin/telephone-configuration",
                component: ServiceProvidersComponent,
            },
            {
                path: "admin/service-providers/:id",
                component: ServiceProviderInfoComponent,
            },
        ]),
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        MatIconModule,
        AngularSvgIconModule.forRoot(),
        NgOptimizedImage,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
