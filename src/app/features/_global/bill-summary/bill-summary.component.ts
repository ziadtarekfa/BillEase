import { Component } from "@angular/core";

@Component({
    selector: "app-bill-summary",
    template: `
        <section class="details">
            <div class="section" *ngFor="let section of sections">
                <div class="detailsItem" *ngFor="let item of section">
                    <span class="detailsTitle">{{ item.title }}</span>
                    <span class="detailsValue">{{ item.value }}</span>
                </div>
                <div class="divider"></div>
            </div>
        </section>
    `,
    styleUrls: ["./bill-summary.component.css"],
})
export class BillSummaryComponent {
    sections = [
        [
            {
                title: "Bill ID",
                value: "123456789",
            },
            {
                title: "Name",
                value: "John Doe",
            },
            {
                title: "Consumed Units",
                value: "123 KW",
            },
            {
                title: "Address",
                value: "123 Main St, New York, NY 10030",
            },
        ],
        [
            {
                title: "Issued Date",
                value: "01/01/2021",
            },
            {
                title: "Due Date",
                value: "01/15/2021",
            },
            {
                title: "Overdue Days",
                value: "12",
            },
        ],
        [
            {
                title: "Bill Fees",
                value: "$123.45",
            },
            {
                title: "Overdue Fees",
                value: "$12.34",
            },
            {
                title: "Total",
                value: "$135.79",
            },
        ],
    ];
}
