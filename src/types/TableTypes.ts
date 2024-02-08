export interface IBase {
    id: number;
    active: boolean;
}

export interface IProduct extends IBase {
    name: string;
    createdAt: string;
}

export interface IPricePlan extends IBase {
    description: string;
    removedAt?: string;
    createdAt: string;
}

export interface IPage extends IBase {
    title: string;
    updatedAt: string;
    publishedAt: string;
}

export const createdAtAlternatives = {
    createdAt: 'createdAt',
    publishedAt: 'publishedAt',
};

export const nameAlternatives = {
    name: 'name',
    description: 'description',
    title: 'title',
};

export interface ITableRow extends IBase, IProduct { }

export interface IPreConverted extends IBase {
    name?: string;
    title?: string;
    description?: string;
    removedAt?: string;
    updatedAt?: string;
    createdAt?: string;
    publishedAt?: string;
}

export interface IColumn {
    Header: string;
    accessor: string;
    style: string;
    editable: boolean;
}