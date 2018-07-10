


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../models/modal.component';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NgbModule,
    NgbCarouselModule
  ],
  declarations: [],
  exports: [NgbCarouselModule],
  entryComponents: []
})

export class AnimationsModule { }
