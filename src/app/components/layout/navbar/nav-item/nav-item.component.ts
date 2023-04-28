import { Component, Input } from "@angular/core";

@Component({
    selector: "[app-nav-item]",
    template: `
        <a class="nav-item" [routerLink]="route.path" routerLinkActive="active"
           [routerLinkActiveOptions]="{ exact: true }"
        >
            <img width="20" height="20" ngSrc="{{route.icon}}" [alt]="route.name + ' route'"/>
            <span>{{ route.name }}</span>
        </a>
    `,
    styleUrls: ["../navbar.component.css"],
})
export class NavItemComponent {
    @Input() route: { path?: string; name?: string; icon?: string } = {};
}
