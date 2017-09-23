import { MapdetailComponent } from './mapdetail/mapdetail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';


@NgModule({
    imports: [RouterModule.forChild([
      { path: 'map', component: MapdetailComponent }
    ])],
    exports: [RouterModule]
  })
  export class mapRouting {}