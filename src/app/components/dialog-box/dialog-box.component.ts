import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {
myForm:FormGroup = new FormGroup({
title:new FormControl(''),
price:new FormControl(''),
year:new FormControl(''),
chip:new FormControl(''),
ssd:new FormControl(''),
memory:new FormControl(''),
display:new FormControl('')
})
//

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}



  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onSubmit(){
this.data={
  title:this.myForm.value.title,
  price:this.myForm.value.price,
  "image": "assets/images/image MacBook.webp",
  year:this.myForm.value.year,
  configure:{
  chip:this.myForm.value.chip,
  ssd:this.myForm.value.ssd,
  memory:this.myForm.value.memory,
  display:this.myForm.value.display,
  }
}


    this.dialogRef.close(this.data);
  }

  ngOnInit():void{

  }
}
