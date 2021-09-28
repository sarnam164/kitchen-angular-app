import { Ingredient } from './../../shared/ingredient.model';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  editMode=false;
  subscription:Subscription;
  editedItemIndex:number;
  editedItem:Ingredient;
  @ViewChild("f",{static:false}) slForm:NgForm;

  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
    this.slService.startedEditing.subscribe(
      (index:number) => {
        this.editedItemIndex=index;
        this.editMode=true;
        this.editedItem=this.slService.getIngredient(index);
        this.slForm.setValue({name:this.editedItem.name,amount:this.editedItem.amount});
      }
    );
  }
  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }
  onSubmit(form:NgForm){
    const value=form.value;
    const newIngredient=new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex,newIngredient)
    }else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode=false;
    form.reset();    
  }
  onClear(){
    this.editMode=false;
    this.slForm.reset();
  }
  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
