import { Component, Input } from "@angular/core";
import { TableActions, TableColumns } from "@components/table/table";

@Component({
    selector: "[app-table-head]",
    template: `
        <tr>
            <th *ngFor="let column of columns">
                {{ column.title }}
            </th>
            <th *ngIf="actions.length > 0" class="actionHeader">Actions</th>
        </tr>
    `,
    styleUrls: ["../table.component.css"],
})
export class TableHeadComponent {
    @Input() columns: TableColumns = [];
    @Input() actions: TableActions = [];
}
