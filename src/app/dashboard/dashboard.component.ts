import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../services/database.service";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {
    db: DatabaseService;
    billsList: any;

    columns = [
        { field: "id", title: "ID" },
        { field: "name", title: "Name" },
        { field: "username", title: "Username" },
        { field: "email", title: "Email" },
    ];

    data = [
        {
            id: 1,
            name: "Hazem Muhammad",
            username: "hompiler",
            email: "hompiler@gmail.com",
        },
        {
            id: 2,
            name: "Ziad Tarek",
            username: "small",
            email: "small@gmail.com",
        },
        {
            id: 3,
            name: "Muhammad Wael",
            username: "hamada",
            email: "hamada@gmail.com",
        },
        {
            id: 4,
            name: "Muhammad Gammal",
            username: "bakar",
            email: "bakar@gmail.com",
        },
        {
            id: 1,
            name: "Hazem Muhammad",
            username: "hompiler",
            email: "hompiler@gmail.com",
        },
        {
            id: 2,
            name: "Ziad Tarek",
            username: "small",
            email: "small@gmail.com",
        },
        {
            id: 3,
            name: "Muhammad Wael",
            username: "hamada",
            email: "hamada@gmail.com",
        },
        {
            id: 4,
            name: "Muhammad Gammal",
            username: "bakar",
            email: "bakar@gmail.com",
        },
        {
            id: 1,
            name: "Hazem Muhammad",
            username: "hompiler",
            email: "hompiler@gmail.com",
        },
        {
            id: 2,
            name: "Ziad Tarek",
            username: "small",
            email: "small@gmail.com",
        },
        {
            id: 3,
            name: "Muhammad Wael",
            username: "hamada",
            email: "hamada@gmail.com",
        },
        {
            id: 4,
            name: "Muhammad Gammal",
            username: "bakar",
            email: "bakar@gmail.com",
        },
        {
            id: 1,
            name: "Hazem Muhammad",
            username: "hompiler",
            email: "hompiler@gmail.com",
        },
        {
            id: 2,
            name: "Ziad Tarek",
            username: "small",
            email: "small@gmail.com",
        },
        {
            id: 3,
            name: "Muhammad Wael",
            username: "hamada",
            email: "hamada@gmail.com",
        },
        {
            id: 4,
            name: "Muhammad Gammal",
            username: "bakar",
            email: "bakar@gmail.com",
        },
    ];

    constructor(private database: DatabaseService) {
        this.db = this.database;
    }

    ngOnInit() {
        this.db.getBills().subscribe((data) => {
            this.billsList = data;
        });
    }
}
