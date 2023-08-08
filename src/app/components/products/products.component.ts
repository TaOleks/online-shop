import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IProducts } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { DialogConfig } from '@angular/cdk/dialog';

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

deleteItem(id:number){
this.PraductsService.deleteProduct(id).subscribe(()=>this.products.find((item)=>{

  if(id===item.id){
    let idx = this.products.findIndex((data)=>data.id===id)
    this.products.splice(idx,1)
  }
}))
}


openDialog(product?:IProducts): void {
  let dialogConfig= new MatDialogConfig();
  dialogConfig.width = '500px';
  dialogConfig.disableClose = true;
  dialogConfig.data = product;
  const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig)

  dialogRef.afterClosed().subscribe((data)=>{
    if(data && data.id)
    this.updateData(data)
    else
    this.postData(data)
  })
}
postData(data:IProducts){

  this.PraductsService.postProduct(data).subscribe((data)=>this.products.push(data))
}

updateData(product:IProducts){
  this.PraductsService.updateProduct(product).subscribe((data)=>{
   this.products =this.products.map((product)=>{
    if (product.id===data.id) return data
    else return product
   })})
}

ngOnDestroy(){
  if (this.productsSubscription) this.productsSubscription.unsubscribe()
}

}
