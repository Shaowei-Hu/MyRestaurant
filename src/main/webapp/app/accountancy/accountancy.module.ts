import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MyRestaurantAccountingModule } from './accounting/accounting.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        MyRestaurantAccountingModule
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyRestaurantAccountancyModule {}
