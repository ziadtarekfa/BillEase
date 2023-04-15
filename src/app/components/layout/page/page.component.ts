import { Component, Input } from "@angular/core";
import { HostListener } from "@angular/core";

@Component({
    selector: "app-page",
    templateUrl: "./page.component.html",
    styleUrls: ["./page.component.css"],
})
export class PageComponent {
    @Input() title: string = "";
    @Input() subtitle?: string;
    @Input() isStuck: boolean = false;

    @HostListener("window:scroll", []) onWindowScroll() {
        const verticalOffset =
            document.documentElement.scrollTop || document.body.scrollTop || 0;

        this.isStuck = verticalOffset > 4;
    }
}
