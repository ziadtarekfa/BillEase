import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from "@angular/core";
import { TableActions, TableColumns, TableData } from "@components/table/table";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: "app-table",
    templateUrl: "./table.component.html",
    styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit, OnChanges {
    @Input() columns: TableColumns = [];
    @Input() data: TableData = [];
    @Input() loading = false;
    @Input() actions: TableActions = [];
    actualLoading = this.loading;
    actualData: TableData = this.data;
    private actualData$ = new BehaviorSubject<TableData>(this.actualData);
    paginatedData: TableData = [];
    @Input() itemsTitle = "Items";
    @Input() itemTitle = "Item";

    @Input() placeholder = "Search";
    search: string = "";

    page: number = 1;
    totalPages: number = 1;
    @Input() itemsPerPage = 10;

    private calculateTotalPages(data: TableData) {
        this.totalPages = Math.max(
            Math.ceil(data.length / this.itemsPerPage),
            1
        );
    }

    ngOnInit(): void {
        this.actualData$.next(this.data);
        this.actualData$.subscribe((data) => {
            this.actualData = data;
            this.calculateTotalPages(data);
            this.setPaginatedData(data);
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.actualData$.next(changes["data"].currentValue);
        this.actualLoading = changes["loading"].currentValue;
    }

    setPaginatedData(data: TableData) {
        this.paginatedData = data.slice(
            (this.page - 1) * this.itemsPerPage,
            this.page * this.itemsPerPage
        );
    }

    onFilter() {
        const filtered = this.data.filter((item) => {
            return Object.values(item).some((value) => {
                return String(value)
                    .toLowerCase()
                    .includes(this.search.toLowerCase());
            });
        });
        this.actualData$.next(filtered);
    }

    onPrev() {
        this.page = Math.min(this.page - 1, 1);
        this.setPaginatedData(this.actualData$.value);
    }

    onNext() {
        this.page = Math.max(this.page + 1, this.totalPages);
        this.setPaginatedData(this.actualData$.value);
    }
}
