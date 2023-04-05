import { Column } from "./Column";
export interface Board {
    id: number
    name: string;
    columns: Column[];
}