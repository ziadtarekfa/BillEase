import { Injectable } from "@angular/core";
import { AuthService } from "../../../_global/auth/_common/services/auth.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";

@Injectable({
    providedIn: "root",
})
export default class TelephoneConfigService {
    constructor(
        private readonly authService: AuthService,
        private readonly http: HttpClient
    ) {}

    async subscribe(offer: object): Promise<boolean> {
        return new Promise((res) => {
            this.authService.currentUser.subscribe((user) => {
                if (!user?.profile) return;
                this.http
                    .patch(
                        `${environment.baseUrl}/users/${user.profile.id}/telephoneOffer.json`,
                        offer
                    )
                    .subscribe(() => {
                        res(true);
                    });
            });
        });
    }
}
