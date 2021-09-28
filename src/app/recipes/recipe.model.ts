import { Ingredient } from './../shared/ingredient.model';
export class Recipe{
    public name:string;
    public desc:string;
    public imgpath:string;
    public ingredients:Ingredient[];

    constructor(name:string, desc:string, imgpath:string, ingredients:Ingredient[]){
        this.name=name;
        this.desc=desc;
        this.imgpath=imgpath;
        this.ingredients=ingredients;
    }
}