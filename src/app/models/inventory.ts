import { Normalize } from './normalize';

export interface Items {
    Id: number;
    ItemId: number;
    NormalizeName: string;
    Units: Normalize;
}

export interface orderedItem {
    lineItem: Items;
    qty: number;
}
export interface poComplete {
    fromOutletId: number;
    toOutletId: number;
    prId: number;
    username: string;
}

export interface currentOutletStock {
    ItemId: number;
    NormalizeName: string;
    Quantity: number;
    Units: Normalize;
    LastUpdate: Date;

}