import { ColumnClass } from "./columnClass";

export class BoardClass {
    constructor(public name:string, public columns: ColumnClass[]) {
        
    }

    public addItem(itemName: string, category:string): void{
        this.columns.forEach(col => {
            if(col.name === category){
              col.tasks.push(itemName);
            }
            
        })
    }
    
}