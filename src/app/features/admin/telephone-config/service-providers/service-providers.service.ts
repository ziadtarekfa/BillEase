import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import ServiceProvider from "./service-provider";

@Injectable({
    providedIn: "root",
})
export default class ServiceProvidersService {
    constructor(private readonly http: HttpClient) {}

    getAll(filter?: string): Promise<Array<ServiceProvider>> {
        return new Promise((resolve) => {
            this.http
                .get(
                    `${environment.baseUrl}/service-providers.json?print=pretty`
                )
                .subscribe((res) => {
                    if (!res) resolve([]);
                    const data = Object.entries(res).map(([id, value]) =>
                        ServiceProvider.fromDTO({ ...value, id })
                    );
                    resolve(data);
                });
        });
    }

    async getById(id: string): Promise<ServiceProvider> {
        return new Promise((resolve) => {
            this.http
                .get(
                    `${environment.baseUrl}/service-providers/${id}.json?print=pretty`
                )
                .subscribe((res) => {
                    if (!res) return;
                    const data = ServiceProvider.fromDTO({ ...res, id });
                    resolve(data);
                });
        });
    }

    async add(serviceProvider: { [x: string]: string }): Promise<boolean> {
        const idNumber = Math.floor(1000 + Math.random() * 9000).toString();
        const id = `SP-${idNumber}`;
        const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        const newProvider = new ServiceProvider(
            id,
            serviceProvider["name"],
            color,
            [],
            []
        );

        return new Promise((resolve) => {
            this.http
                .put(`${environment.baseUrl}/service-providers/${id}.json`, {
                    ...newProvider.toDTO(),
                })
                .subscribe((res) => {
                    if (!res) return;
                    resolve(true);
                });
        });
    }

    async addOffer(offer: { [x: string]: string }) {
        const idNumber = Math.floor(1000 + Math.random() * 9000).toString();
        const id = `OF-${idNumber}`;
        console.log({
            offer,
        });
        const newOffer = {
            name: offer["name"],
            offerType: offer["offerType"],
            costPerMinute: offer["costPerMinute"],
            units: offer["units"],
            unitsCost: offer["unitsCost"],
        };

        return new Promise((resolve) => {
            this.http
                .put(
                    `${environment.baseUrl}/service-providers/${
                        offer["serviceProviderId"]
                    }/${
                        offer["offerType"] === "prepaid"
                            ? "prepaidOffers"
                            : "postpaidOffers"
                    }/${id}.json`,
                    {
                        ...newOffer,
                    }
                )
                .subscribe((res) => {
                    if (!res) return;
                    resolve(true);
                });
        });
    }

    async deleteOffer(
        id: string,
        serviceProviderId: string,
        offerType: string
    ) {
        return new Promise((resolve) => {
            this.http
                .delete(
                    `${
                        environment.baseUrl
                    }/service-providers/${serviceProviderId}/${
                        offerType === "prepaid"
                            ? "prepaidOffers"
                            : "postpaidOffers"
                    }/${id}.json`
                )
                .subscribe((res) => {
                    resolve(true);
                });
        });
    }
}
