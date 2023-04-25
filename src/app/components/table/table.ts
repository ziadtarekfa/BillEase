export interface TableColumn {
    key?: string;
    field: string | Array<string>;
    title: string;
    class?: string;
}

export type TableColumns = Array<TableColumn>;

export type TableDataItem = {
    [key: string]: string | number | boolean;
};

export type TableData = Array<TableDataItem>;
