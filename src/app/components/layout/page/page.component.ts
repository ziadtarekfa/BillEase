import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { HostListener } from "@angular/core";

@Component({
    selector: "app-page",
    templateUrl: "./page.component.html",
    styleUrls: ["./page.component.css"],
})
export class PageComponent implements OnChanges {
    @Input() title: string = "";
    @Input() subtitle?: string;
    @Input() isStuck: boolean = false;
    @Input() loading = false;
    isLoading = false;

    @HostListener("window:scroll", []) onWindowScroll() {
        const verticalOffset =
            document.documentElement.scrollTop || document.body.scrollTop || 0;

        this.isStuck = verticalOffset > 0;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.isLoading = changes["loading"]?.currentValue ?? this.isLoading;
    }
}
