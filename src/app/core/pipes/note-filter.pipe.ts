import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../model/note';

@Pipe({
  name: 'noteFilter'
})
export class NoteFilterPipe implements PipeTransform {

  transform(notes: Note[], valid: any): any {
    if (!valid) {
      return notes.filter((item) => {
        if (!item.intrash && !item.ispinned && !item.isarchive) {
          return item;
        }
      });
    }
    if (valid === 'isarchive') {
      return notes.filter((item) => {
        if (!item.intrash && item.isarchive) {
          return item;
        }
      });
    }
    if (valid === 'intrash') {
      return notes.filter((item) => {
        if (item.intrash) {
          return item;
        }
      });
    }
    if (valid === 'ispinned') {
      return notes.filter((item) => {
        if (!item.intrash && item.ispinned && !item.isarchive) {
          return item;
        }
      });
    }
    return -1;
  }
}
