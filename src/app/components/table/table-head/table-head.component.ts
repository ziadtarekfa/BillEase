import { Component, Input } from "@angular/core";
import { TableColumns } from "@components/table/table";

@Component({
    selector: "[app-table-head]",
    template: `
        <tr>
            <th *ngFor="let column of columns">
                {{ column.title }}
            </th>
        </tr>
    `,
    styleUrls: ["../table.component.css"],
})
export class TableHeadComponent {
    @Input() columns: TableColumns = [];
}
