import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { BoardClass } from '../../models/boardClass.model';
import { Board } from '../../Board';
import { Column } from '../../Column';
import { BoardService } from '../../services/board.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit{

  col1: Column = { name: "Ideas", tasks: ["Task 11","Task 11","Task 11"]}
  col2: Column = { name: "Research", tasks: ["Task 11","Task 11","Task 11"]}
  col3: Column = { name: "Todo", tasks: ["Task 11","Task 11","Task 11"]}
  col4: Column = { name: "Done", tasks: ["Task 11","Task 11","Task 11"]}
  dummyBoard: Board = {name: "dummy board", columns: [this.col1, this.col2, this.col3, this.col4]}

  // board: BoardClass | Record<string, never> = {};
  board: Board | Record<string, never> = {};
  // board: Board = this.dummyBoard;
  
  
  

  
  

  taskFrom: FormGroup;
  taskName: string = "";
  taskCategory: string = "";

  constructor(private formBuilder: FormBuilder, private boardService: BoardService, ){
    this.taskFrom = formBuilder.group({
      "taskName": [null, Validators.required],
      "taskCategory": [null, Validators.required] 
    })
  }

  ngOnInit(): void {
    this.boardService.getBoard().subscribe((ApiBoard) => (this.board = ApiBoard));
    this.boardService.getName().subscribe((boardName) => (console.log(boardName)));

    // console.log(this.board.name)
    
    console.log("Board should be initialised");
    
  }

  addTask(task:any){
    
    this.board.columns.forEach(col => {
      if(col.name.replace(/ /g, "").toLowerCase() === task.taskCategory.replace(/ /g, "").toLowerCase()){
        col.tasks.push(task.taskName);
      }
      
    })
    this.boardService.addItem(this.board).subscribe((res) => (this.board = res));

    
    console.log("Board should have new item added");
    
    


  }



  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
