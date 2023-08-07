import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IProducts } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
products!:IProducts[];
productsSubscription!: Subscription;
canEdit:boolean =false;
canView: boolean=false;

constructor(private PraductsService:ProductsService, public dialog: MatDialog){}

ngOnInit():void{
// ... here ligic for autorization and if everything ok =>
   this.canEdit=true

  this.productsSubscription = this.PraductsService.getProducts().subscribe((data)=>{
    this.products = data;
  })
}


openDialog(): void {
  let dialogConfig= new MatDialogConfig();
  dialogConfig.width = '500px';
  // dialogConfig.data = this.products
  const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig)
}

ngOnDestroy(){
  if (this.productsSubscription) this.productsSubscription.unsubscribe()
}

}
