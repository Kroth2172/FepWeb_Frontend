import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascaraDirective } from './directives/mascara.directive';
import { PtBrMatPaginatorIntl, DataPipe, SexoPipe, EstadoCivilPipe } from './';
import { StatusPipe } from './pipes/status.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MascaraDirective,
    SexoPipe,
    StatusPipe,
    EstadoCivilPipe,
    DataPipe
  ],
  exports: [
    MascaraDirective,
    SexoPipe,
    StatusPipe,
    EstadoCivilPipe,
    DataPipe
  ],
  providers: [
    PtBrMatPaginatorIntl
  ]
})
export class SharedModule { }
