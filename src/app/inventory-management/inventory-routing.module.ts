import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { PoRequestComponent } from './po-request/po-request.component';
import { PoLogsComponent } from './po-logs/po-logs.component';
import { OutletStockListComponent } from './outlet-stock-list/outlet-stock-list.component';
import { OutletStockComponent } from './outlet-stock/outlet-stock.component';
import { MaterialOutwardsComponent } from './material-outwards/material-outwards.component';
import { PoItemAcceptanceComponent } from './po-item-acceptance/po-item-acceptance.component';

const routes: Routes = [
    {
        path: '',
        component: ItemComponent,
    },
    {
        path: 'pologs',
        component: PoLogsComponent,
    },
    {
        path: 'item',
        component: ItemComponent
    },
    {
        path: 'porequest',
        component: PoRequestComponent
    },
    {
        path: 'outletStock',
        component: OutletStockComponent
    }, {
        path: 'materialOutwards/:isInward',
        component: MaterialOutwardsComponent
    },
    {
        path: 'poItemAccept',
        component: PoItemAcceptanceComponent
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InventoryRoutingModule { }
