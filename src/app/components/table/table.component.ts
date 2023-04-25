import { Component, Input, OnInit } from "@angular/core";
import { TableColumns, TableData } from "@components/table/table";

@Component({
    selector: "app-table",
    templateUrl: "./table.component.html",
    styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
    @Input() columns: TableColumns = [];
    @Input() data: TableData = [];
    actualData: TableData = this.data;

    @Input() itemsTitle = "Items";
    @Input() itemTitle = "Item";

    @Input() placeholder = "Search";
    search: string = "";

    page: number = 1;
    totalPages: number = 1;

    ngOnInit(): void {
        this.actualData = this.data;
    }

    onFilter() {
        this.actualData = this.data.filter((item) => {
            return Object.values(item).some((value) => {
                return String(value)
                    .toLowerCase()
                    .includes(this.search.toLowerCase());
            });
        });
    }

    onPrev() {}

    onNext() {}
}
