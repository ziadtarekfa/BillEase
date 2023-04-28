export interface TableColumn {
    key?: string;
    field: string | Array<string>;
    title: string;
    class?: string;
}

export type TableColumns = Array<TableColumn>;

export type TableDataItem = {
    [key: string]: any;
};

export type TableData = Array<TableDataItem>;
