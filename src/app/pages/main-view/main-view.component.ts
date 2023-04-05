import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { BoardClass } from '../../models/boardClass.model';
import { Board } from '../../Board';
import { Column } from '../../Column';
import { BoardService } from '../../services/board.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

declare var window:any;

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit{

  col1: Column = { id: 11, name: "Ideas", tasks: ["Task 11","Task 11","Task 11"]}
  col2: Column = { id: 12, name: "Research", tasks: ["Task 11","Task 11","Task 11"]}
  col3: Column = { id: 13, name: "Todo", tasks: ["Task 11","Task 11","Task 11"]}
  col4: Column = { id: 14, name: "Done", tasks: ["Task 11","Task 11","Task 11"]}
  dummyBoard: Board = {id: 10, name: "dummy board", columns: [this.col1, this.col2, this.col3, this.col4]}

  // board: BoardClass | Record<string, never> = {};
  board: Board | Record<string, never> = {};
  // board: Board = this.dummyBoard;
  
  taskFrom: FormGroup;
  taskName: string = "";
  taskCategory: string[] = [];

  
  categoryList = ["type 1", "type 2","type 3","type 4"];

  closeResult:string = ""; 

  formModal: any;

  constructor(
    private formBuilder: FormBuilder, 
    private boardService: BoardService, 
    private modalService: NgbModal){

    this.taskFrom = formBuilder.group({
      "taskName": [null, Validators.required],
      "taskCategory": [1, Validators.minLength(2)] 
    })

  }


  ngOnInit(): void {
    this.boardService.getBoard(1).subscribe((ApiBoard) => (this.board = ApiBoard));
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("addTaskModal")
    );
    
    console.log("Board should be initialised");
    
  }

  openModal(){
    this.formModal.show();
  }

  closeModal(){
    this.formModal.hide();
  }
  
  updateDatabase(){
    this.boardService.updateBoard(this.board).subscribe((res) => (this.board = res));
  }
  

  addTask(task:any){
    console.log(task.taskCategory)
    
    this.board.columns.forEach(col => {
      if(col.name === task.taskCategory){
        col.tasks.push(task.taskName);
      }
      
    })

    
    
    // this.boardService.updateBoard(this.board).subscribe((res) => (this.board = res));
    this.updateDatabase();
    
    
    
    


  }

  deleteTask(columnID: number, task:string){
    console.log(`Column ID: ${columnID}, task "${task}" marked for deletion`);
    this.board.columns.forEach(col => {
      if(col.id === columnID){
        col.tasks = col.tasks.filter(item => item != task);
      }
      
    });
    // this.boardService.updateBoard(this.board).subscribe((res) => (this.board = res));
    this.updateDatabase();
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
    console.log(this.board);
    // this.boardService.updateBoard(this.board).subscribe((res) => (this.board = res));
    this.updateDatabase();

  }

  

}
