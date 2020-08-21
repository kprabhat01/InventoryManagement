import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventoryRoutingModule } from './inventory-routing.module';



import { ItemComponent } from './item/item.component';
import { PoRequestComponent } from './po-request/po-request.component';

import { CommonSearchPipe } from '../pipes/search/common-search.pipe';
import { PoFinalizerComponent } from './po-finalizer/po-finalizer.component';
import { PoLogsComponent } from './po-logs/po-logs.component';
import { PoManagementComponent } from './po-management/po-management.component';
import { EditPoComponent } from './edit-po/edit-po.component';
import { OutletFilterComponent } from './outlet-filter/outlet-filter.component';
import { OutletStockListComponent } from './outlet-stock-list/outlet-stock-list.component';
import { OutletStockComponent } from './outlet-stock/outlet-stock.component';
import { MaterialOutwardsComponent } from './material-outwards/material-outwards.component';
import { OutwardItemComponent } from './outward-item/outward-item.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InventoryRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        ItemComponent,
        PoRequestComponent,
        CommonSearchPipe,
        PoFinalizerComponent,
        PoLogsComponent,
        PoManagementComponent,
        EditPoComponent,
        OutletFilterComponent,
        OutletStockComponent,
        OutletStockListComponent,
        MaterialOutwardsComponent,
        OutwardItemComponent
    ]
})
export class InventoryPageModule { }
