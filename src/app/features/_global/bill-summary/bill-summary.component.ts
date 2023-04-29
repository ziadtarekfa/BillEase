import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import Bill from "../../user/bills/_common/services/bill";
import User from "../auth/_common/models/user";
import { object } from "@angular/fire/database";
import dateDifferenceCalculator from "../../../../utils/date-diff-calculator";
import formatCurrency from "../../../../utils/currency-formatter";

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
export class BillSummaryComponent implements OnChanges {
    @Input() bill?: Bill;
    @Input() user?: User;

    sections: Array<Array<any>> = [];

    ngOnChanges(changes: SimpleChanges) {
        this.bill = changes["bill"]?.currentValue ?? this.bill;
        this.sections = changes["user"]?.currentValue ?? this.user;
        const daysDiff = this.bill?.dueDate
            ? dateDifferenceCalculator(this.bill?.dueDate, new Date())
            : 0;
        this.sections = [
            [
                {
                    title: "Bill ID",
                    value: this.bill?.id,
                },
                {
                    title: "Name",
                    value: this.user?.name,
                },
                {
                    title: "Consumed Units",
                    value: `${this.bill?.consumedUnits} ${this.bill?.unit}`,
                },
            ],
            [
                {
                    title: "Issued Date",
                    value: this.bill?.createdAtFormatted,
                },
                {
                    title: "Due Date",
                    value: this.bill?.dueDateFormatted,
                },
                {
                    title: "Overdue Days",
                    value:
                        this.bill?.dueDate && daysDiff > 0
                            ? `${daysDiff} ${daysDiff === 1 ? "day" : "days"}`
                            : "No Overdue",
                },
            ],
            this.bill?.paid
                ? [
                      {
                          title: "Paid Amount",
                          value: formatCurrency(this.bill?.paidAmount),
                      },
                      {
                          title: "Payment Date",
                          value: this.bill?.paymentDateFormatted,
                      },
                  ]
                : [
                      {
                          title: "Bill Fees",
                          value: formatCurrency(this.bill?.billFees),
                      },
                      {
                          title: "Overdue Fees",
                          value: formatCurrency(this.bill?.overdueFees),
                      },
                      {
                          title: "Total",
                          value: formatCurrency(this.bill?.totalFees),
                      },
                  ],
        ];
    }
}
