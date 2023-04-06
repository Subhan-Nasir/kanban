import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { BoardClass } from '../../models/boardClass.model';
import { Board } from '../../Board';
import { Column } from '../../Column';
import { BoardService } from '../../services/board.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { v4 as uuid } from 'uuid';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';

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

  formModal: any;
  
  taskFrom: FormGroup;
  taskName: string = "";
  taskCategory: string[] = [];
  taskFormOpen: boolean = false;

  
  categoryList = ["type 1", "type 2","type 3","type 4"];

  closeResult:string = ""; 

  


  columnForm: FormGroup;
  newColumnName: string = "";
  columnFormOpen: boolean = false;

  

  constructor(
    private formBuilder: FormBuilder, 
    private boardService: BoardService, 
    private modalService: NgbModal,
    private confirmationDialogService: ConfirmationDialogService){

    this.taskFrom = formBuilder.group({
      "taskName": [null, Validators.required],
      "taskCategory": [null, [Validators.required, Validators.nullValidator]] 
    })

    this.columnForm = formBuilder.group({
      "newColumnName": [null, [Validators.required, Validators.minLength(3)]]
    })

  }

  


  ngOnInit(): void {
    this.boardService.getBoard(1).subscribe((ApiBoard) => (this.board = ApiBoard));
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("addTaskModal")
    );
    
    console.log("Board should be initialised");
    
  }

  openModal(formName: FormGroup){
    if(formName === this.taskFrom){
      this.columnFormOpen = false;
      this.taskFormOpen = true;
      
    }
    else if (formName === this.columnForm){
      this.taskFormOpen = false;
      this.columnFormOpen = true;
    }
    this.formModal.show();

    console.log(`Task form open: ${this.taskFormOpen}, Column form open ${this.columnFormOpen}`)

  }

  closeModal(){
    this.columnFormOpen = false;
    this.taskFormOpen = false;

    this.taskFrom.reset;
    this.columnForm.reset;

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
    
    this.taskFrom.reset();
    this.closeModal();
    


  }

  addColumn(columnFormValue:any){
    const newColumnID = Math.round(Math.random() * 1000000);
    const newColumn: Column = {id: newColumnID, name: columnFormValue.newColumnName, tasks:[]};
    

    console.log(`New Column ID: ${newColumnID}, name: ${columnFormValue.newColumnName}`);
    this.board.columns.push(newColumn);
    this.updateDatabase();

    this.columnForm.reset();
    this.closeModal();


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


  showDeleteDialog(col: Column){

    const confirmationMessage: string = `<p>Are you sure you want to delete column <b>${col.name}</b>? This action cannot be undone.</p>`;
    
    
    this.confirmationDialogService.confirm('Please confirm..', confirmationMessage)
    .then((confirmed) => this.deleteColumn(col))
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    
  }

  deleteColumn(col: Column){
    console.log(`Column ID: ${col.id}, Name: ${col.name} marked for deletion`)
    this.board.columns = this.board.columns.filter((item) => item.id != col.id);
    console.log(this.board);
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

  dropColumn(event: CdkDragDrop<Column>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data.tasks, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data.tasks,
        event.container.data.tasks,
        event.previousIndex,
        event.currentIndex,
      );
    }
    console.log(this.board);
    // this.boardService.updateBoard(this.board).subscribe((res) => (this.board = res));
    this.updateDatabase();

  }

  

}
