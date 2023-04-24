import { Component, Input } from "@angular/core";
import NavRoute from "@components/layout/navbar/nav-route";

@Component({
    selector: "app-layout-wrapper",
    templateUrl: "./layout-wrapper.component.html",
    styleUrls: ["./layout-wrapper.component.css"],
})
export class LayoutWrapperComponent {
    @Input() navRoutes: Array<NavRoute> = [];
}
