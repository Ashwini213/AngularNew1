import { Collaborator } from './collaborator';
import { Image } from './image';

export interface Note {
     discription: string;
     title: string;
     intrash: boolean;
     ispinned: boolean;
     isarchive: boolean;
     id: number;
     labelList: string[];
     labelName: string;
     colore: string;
     userId: number;
     reminder: string;
     collaboraters: Collaborator[];
     colorMenu: number;
     images: Image[];
}
