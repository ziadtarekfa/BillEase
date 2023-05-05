export default class ServiceProvider {
    constructor(
        public id: string,
        public name: string,
        public color: string,
        public prepaidOffers: Array<any>,
        public postpaidOffers: Array<any>
    ) {}

    get shortName(): string {
        return this.name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    }

    get prepaidOffersCount(): number {
        return this.prepaidOffers.length;
    }

    get postpaidOffersCount(): number {
        return this.postpaidOffers.length;
    }

    static fromDTO(dto: any): ServiceProvider {
        return new ServiceProvider(
            dto.id,
            dto.name,
            dto.color,
            Object.entries(dto.prepaidOffers ?? {}).map(([id, value]: any) => ({
                id,
                ...value,
            })) ?? [],
            Object.entries(dto.postpaidOffers ?? {}).map(
                ([id, value]: any) => ({
                    id,
                    ...value,
                })
            ) ?? []
        );
    }

    toDTO(): object {
        return {
            id: this.id,
            name: this.name,
            color: this.color,
            prepaidOffers: [],
            postpaidOffers: [],
        };
    }
}
