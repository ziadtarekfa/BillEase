import { Component, Input } from "@angular/core";
import {
    TableActions,
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
        <td *ngIf="actions.length > 0" class="actionItem">
            <ng-container *ngFor="let action of actions">
                <ng-container *ngIf="action.type === 'link'">
                    <a
                            [routerLink]="action.link?.(row)"
                            class="actionButton"
                    >
                        <i class="material-icons" *ngIf="action.icon !== undefined">{{ action.icon }}</i>
                        {{ action.text }}
                    </a>
                </ng-container>
                <ng-container *ngIf="action.type === 'button'">
                    <button
                            class="actionButton"
                            (click)="action.onClick?.()"
                    >
                        <i class="material-icons" *ngIf="action.icon !== undefined">{{ action.icon }}</i>
                        {{ action.text }}
                    </button>
                </ng-container>
            </ng-container>
        </td>
    `,
    styleUrls: ["../table.component.css"],
})
export class TableRowComponent {
    @Input() columns: TableColumns = [];
    @Input() row: TableDataItem = {};
    @Input() actions: TableActions = [];

    protected readonly Array = Array;

    getFieldValue = (column: TableColumn, row: TableDataItem) =>
        typeof column.field === "string"
            ? row[column.field]
            : column.field.reduce((acc: any, field) => acc[field], row);
}
