import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../shared/models/modal.component';

export interface IStoryModal {
  storyOriginal?: string;
  storyType?: string;
  storyId?: string;
  upvotes?: number;
  userPicture?: string;
  displayName?: string;
  tags?: string[];
  uploadDate?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog) { }

  openDialog(storyData) {
    console.log(storyData)
    const dialogRef = this.dialog.open(ModalComponent, {
      data: storyData,
      width: '35rem',
      // hasBackdrop: false
    })
  }
}
