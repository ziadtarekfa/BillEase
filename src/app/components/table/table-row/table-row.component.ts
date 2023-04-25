import { Component, Input } from "@angular/core";
import {
    TableColumn,
    TableColumns,
    TableDataItem,
} from "@components/table/table";

@Component({
    selector: "[app-table-row]",
    template: `
        <td *ngFor="let column of columns">
            {{ getFieldValue(column, row) }}
        </td>
    `,
    styleUrls: ["../table.component.css"],
})
export class TableRowComponent {
    @Input() columns: TableColumns = [];
    @Input() row: TableDataItem = {};
    protected readonly Array = Array;

    getFieldValue = (column: TableColumn, row: TableDataItem) =>
        typeof column.field === "string"
            ? row[column.field]
            : column.field.reduce((acc: any, field) => acc[field], row);
}
