import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  product: any;
  quantity: number;
}

@Component({  
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})    
export class DialogComponent implements OnInit {
     
  constructor( 
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
 
  onNoClick(): void {
    this.dialogRef.close(); 
  } 
 
  ngOnInit(): void {
  }

}
 