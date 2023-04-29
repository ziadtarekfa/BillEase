import { Component } from "@angular/core";
import { Rates } from "./rate";
import RatesService from "./rates.service";

@Component({
    selector: "app-rates",
    templateUrl: "./rates.component.html",
    styleUrls: ["./rates.component.css"],
})
export class RatesComponent {
    configs = {
        electricity: {
            title: "Electricity",
            icon: "assets/icons/lamp.svg",
            unit: "kWh",
            name: "electricity",
            unitCost: 4,
            overdueFees: 10,
        },
        water: {
            title: "Water",
            icon: "assets/icons/water.svg",
            unit: "m3",
            name: "water",
            unitCost: 2,
            overdueFees: 30,
        },
        telephone: {
            title: "Telephone",
            icon: "assets/icons/telephone.svg",
            unit: "minutes",
            name: "telephone",
            unitCost: 1,
            overdueFees: 20,
        },
    };
    loading = false;

    constructor(private readonly ratesService: RatesService) {
        this.loading = true;
        this.fetchRates().then(() => (this.loading = false));
    }

    async fetchRates() {
        const data = await this.ratesService.get();
        if (!data) return;
        this.configs.electricity.unitCost = data.electricity.unitCost;
        this.configs.electricity.overdueFees = data.electricity.overdueFees;
        this.configs.water.unitCost = data.water.unitCost;
        this.configs.water.overdueFees = data.water.overdueFees;
        this.configs.telephone.unitCost = data.telephone.unitCost;
        this.configs.telephone.overdueFees = data.telephone.overdueFees;
    }

    async onSave() {
        const rates: Rates = {
            electricity: {
                unitCost: this.configs.electricity.unitCost,
                overdueFees: this.configs.electricity.overdueFees,
            },
            water: {
                unitCost: this.configs.water.unitCost,
                overdueFees: this.configs.water.overdueFees,
            },
            telephone: {
                unitCost: this.configs.telephone.unitCost,
                overdueFees: this.configs.telephone.overdueFees,
            },
        };

        const res = await this.ratesService.save(rates);
        // TODO show success message
    }

    protected readonly Object = Object;
}
