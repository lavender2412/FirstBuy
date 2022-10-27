import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  CategoryList =["Brand New", "Second Hand","Damaged"];
  ProductForm !: FormGroup;
  actionBtn : string = "Save";
  constructor(private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private api: ApiService , private dialogRef : MatDialogRef<DialogComponent>) {
   }

  ngOnInit(): void {
    this.ProductForm = this.formBuilder.group({
      productName : ['',Validators.required],
      category    : ['',Validators.required],
      date :  ['',Validators.required],
      type    : ['',Validators.required],
      price   :   ['',Validators.required],
      comment :  ['',Validators.required]
      

    })
    if(this.editData)
    {
      this.actionBtn = "Update";
      this.ProductForm.controls['productName'].setValue(this.editData.productName);
      this.ProductForm.controls['category'].setValue(this.editData.category);
      this.ProductForm.controls['date'].setValue(this.editData.date);
      this.ProductForm.controls['type'].setValue(this.editData.type);
      this.ProductForm.controls['price'].setValue(this.editData.price);
      this.ProductForm.controls['comment'].setValue(this.editData.comment);
    }
  }
    Productsave(){
    if(!this.editData)
    {
      {
        if(this.ProductForm.valid)
        {
          this.api.postProduct(this.ProductForm.value)
          .subscribe({
            next:(res)=>{
              alert("Product added successfully");
              this.ProductForm.reset();
              this.dialogRef.close('Save');
            },
            error:()=>{
              alert("Error while adding the product");
            }
  
          })
        }}}
      else{
        this.updateProduct()
      }
    }
  updateProduct()
  {
    this.api.putProduct(this.ProductForm.value,this.editData.id)
    .subscribe({
      next:(res)=> {
        alert('Product updated successfully');
        this.ProductForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>
      {
        alert('error while updating the record!');

      }
    })

  }
}

