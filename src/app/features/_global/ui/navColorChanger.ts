import { OnDestroy } from "@angular/core";

export default class NavColorChanger  {
    private readonly oldBgColor: string;
    private readonly oldTextColor: string;
    private root = document.documentElement;

    constructor(private bgColor?: string, private textColor?: string) {
        this.oldBgColor = this.root.style.getPropertyValue("nav-item-bg");
        this.oldTextColor = this.root.style.getPropertyValue("nav-item-text");
    }

    changeColor() {
        if (!this.bgColor || !this.textColor) return;
        document.documentElement.style.setProperty(
            "--nav-item-bg",
            this.bgColor
        );
        document.documentElement.style.setProperty(
            "--nav-item-color",
            this.textColor
        );
    }

    resetColor() {
        document.documentElement.style.setProperty(
            "--nav-item-bg",
            this.oldBgColor
        );
        document.documentElement.style.setProperty(
            "--nav-item-color",
            this.oldTextColor
        );
    }


}
