import { Injectable } from '@angular/core';
import { mockBoard } from '../pages/main-view/mock-board';
import { BoardClass } from '../models/boardClass.model';
import { Board } from '../Board';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}



@Injectable({
  providedIn: 'root'
})


// export class BoardService {
//   private apiUrl = "http://localhost:3000/board";

//   constructor(private http:HttpClient) { }

//   getBoard(): Observable<BoardClass>{
    

//     return this.http.get<BoardClass>(this.apiUrl);
//   }

// }


export class BoardService {
  private apiUrl = "http://localhost:3000/boards";

  constructor(private http:HttpClient) { }

  getBoard(id:number): Observable<Board>{
    

    return this.http.get<Board>("http://localhost:3000/boards/1");
  }

  // getName(): Observable<string>{
  //   return this.http.get<string>(this.apiUrl + "/name");
  // }

  // addItem(item:any): Observable<Board>{
  //   return this.http.post<Board>(this.apiUrl, item, httpOptions);

  // }

  updateBoard(updatedBoard:any): Observable<Board>{
    return this.http.put<Board>(this.apiUrl + `/${updatedBoard.id}`, updatedBoard, httpOptions);
  }

}
