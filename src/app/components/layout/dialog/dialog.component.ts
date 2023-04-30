import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from "@angular/core";

@Component({
    selector: "app-dialog",
    template: `
        <div
            [class]="isOpen ? 'dialog' : 'dialog closed'"
            (click)="closeDialogInner()"
        >
            <dialog
                class="dialog__content"
                [open]="isOpen"
                (click)="disablePropagation($event)"
            >
                <header *ngIf="title && title.length > 0">
                    <h2>{{ title }}</h2>
                </header>
                <div class="dialog__body">
                    <ng-content></ng-content>
                </div>
            </dialog>
        </div>
    `,
    styleUrls: ["./dialog.component.css"],
})
export class DialogComponent implements OnChanges {
    @Input() title?: string ;
    @Input() open = false;
    isOpen = false;
    @Output() closeDialog = new EventEmitter<boolean>();

    ngOnChanges(changes: SimpleChanges): void {
        this.isOpen = changes["open"]?.currentValue;
    }

    closeDialogInner() {
        this.closeDialog.emit(false);
    }

    disablePropagation(event: Event) {
        event.stopImmediatePropagation();
    }
}
