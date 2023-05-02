import { AbstractControl } from "@angular/forms";

export function dateValidator(control: AbstractControl) {

    const enteredDate = new Date(control.value);
    const todayDate = new Date();
    if (enteredDate < todayDate) {
        return {
            isPast: true
        };
    }
    return null;
}