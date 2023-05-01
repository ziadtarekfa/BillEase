export interface TableColumn {
    key?: string;
    field: string | Array<string> | ((row: TableDataItem) => any);
    title: string;
    class?: string;
}

export type TableColumns = Array<TableColumn>;

export type TableDataItem = {
    [key: string]: any;
};

export type TableData = Array<TableDataItem>;

export interface TableAction {
    text?: string;
    onClick?: (row: TableDataItem) => void;
    icon?: string;
    type: "link" | "button";
    link?: (row: TableDataItem) => string;
    disable?: (row: TableDataItem) => boolean;
}

export type TableActions = Array<TableAction>;
