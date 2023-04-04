import { BoardClass } from "../../models/boardClass.model";
import { ColumnClass } from "../../models/columnClass";



export const mockBoard: BoardClass = new BoardClass("Mock board",[
    new ColumnClass("Ideas", ["Idea 1", "Idea 2", "Idea 3"]),
    new ColumnClass("Research", ["Topic 1", "Topic 2", "Topic 3"]),
    new ColumnClass("Todo", ["Task 1", "Task 2", "Task 3"]),
    new ColumnClass("Done", ["Completed Task 1", "Completed Task 2", "Completed Task 3"]),

    
])