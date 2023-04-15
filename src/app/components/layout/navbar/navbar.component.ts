import { Component } from "@angular/core";

@Component({
    selector: "app-nav",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
    readonly navRoutes = [
        {
            path: "/",
            name: "Dashboard",
            icon: "assets/icons/home.svg",
        },
        {
            path: "/electricity",
            name: "Electricity",
            icon: "assets/icons/lamp.svg",
        },
        {
            path: "/water",
            name: "Water",
            icon: "assets/icons/water.svg",
        },
        {
            path: "/telephone",
            name: "Telephone",
            icon: "assets/icons/telephone.svg",
        },
    ];
}
