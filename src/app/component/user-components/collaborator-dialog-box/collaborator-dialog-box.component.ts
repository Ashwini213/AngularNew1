import { Component, OnInit, Inject, Input, ɵConsole } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/core/services/UserService/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/core/model/user';
import { Collaborator } from 'src/app/core/model/collaborator';
import { NoteService } from 'src/app/core/services/NoteService/note.service';

@Component({
  selector: 'app-collaborator-dialog-box',
  templateUrl: './collaborator-dialog-box.component.html',
  styleUrls: ['./collaborator-dialog-box.component.css']
})

export class CollaboratorDialogBoxComponent implements OnInit {
  @Input() users: User;
  @Input() products;
  picture: any;
  disc: string;
  emails: any[] = [];
  collabUser: [];
  notes: [];
  OwnerEmailId: User;
  coUser: User;
  noteOwner: string;
  collaboratedUser: Collaborator;
  collaboratorArray = [];
  colArray = [];
  constructor(public dialog: MatDialog, private sanitizer: DomSanitizer, private noteService: NoteService,
              public dialogRef: MatDialogRef<CollaboratorDialogBoxComponent>, private userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data, private snackBar: MatSnackBar
  ) { }

  public ngOnInit() {
    const notes = {
      ...this.data
    };
    console.log('notes', notes);

    this.getUser();
    this.userService.getCollUser().subscribe((resp: any) => {
      this.emails = resp;
      console.log(resp);
    }, (error) => console.log(error));

    this.getNoteOwner();
  }

  public onNoClick(data): void {
    this.dialogRef.close();
    console.log(data);
  }

  public getUser() {
    this.userService.getUser().subscribe((resp: any) => {
      this.users = resp;
      console.log(this.users);
    }, (error) => {
      console.log(error);
    });
  }

  public onAddCollab(note, email) {
    console.log('collab note ', note, 'collab email', email);

    const arry = JSON.stringify(this.data);
    // const result = JSON.parse(arry);
    if (arry.search(email) === -1) {
      // if(in_arry.search(email)){}
      this.getCollaboraterId(email).subscribe((resp: any) => {
        this.coUser = resp;
        const collaboratedUser = {
          collEmailId: email,
          noteId: note.id,
          ownerId: resp.id
        };
        // tslint:disable-next-line: no-shadowed-variable
        this.noteService.doCollab(collaboratedUser).subscribe((resp: any) => {
          console.log(resp);
          this.snackBar.open('added successfully', 'Ok', {
            duration: 2000,
          });
        }, (error) => {
          console.log(error);
        });
      });
    } else {
      this.snackBar.open('user already present', 'Ok', {
        duration: 2000,
      });
    }
  }

  public deleteCollab(note, collId) {
    const collaboratedUser = {
      id: collId,
      noteId: note.id

    };
    this.noteService.removeCollab(collaboratedUser).subscribe(resp => {
      console.log(resp);
    }, (error) => {
      console.log(error);
    });
    console.log(this.data);
  }

  public getCollaboraterId(id) {
    return this.userService.getCollUserId(id);
  }

  public getNoteOwner() {
    this.userService.getNoteOwner(this.data.userId).subscribe((resp: any) => {
      console.log(resp);
      this.OwnerEmailId = resp;
    }, (error) => {
      console.log(error);
    });
  }

  addUserEmail(option) {
    console.log('option ', option);
    console.log('users list ', this.users);
    this.colArray.push(this.users);
    console.log('this.colArray', this.colArray);
    // for (let i = 0; i < this.colArray[0].length; i++) {
    if (this.users.email !== option.email) {
      this.getCollaboraterId(option.email).subscribe((resp: any) => {
        this.coUser = resp;
        var collaboratedUser = {
          collEmailId: option.email,
           noteId: this.data.noteId,
          ownerId: this.data.userId,
          allocatedId: resp.id
        };
        this.noteService.doCollab(collaboratedUser).subscribe((resp) => {
          console.log(resp);
          this.snackBar.open('added successfully', 'Ok', {
            duration: 2000,
          });
        }, (error) => {
          console.log(error);
        });
      });
    } else {
      this.collaboratorArray.push(option.email);
      console.log('collaborator array---- ', this.collaboratorArray);
      this.snackBar.open('user already present', 'ok');
    }
  }
  // addNewUserEmail(email) {

  //   this.noteService.doCollab(this.collaboratedUser).subscribe((resp: any) => {
  //     console.log(resp);
  //     this.snackBar.open('added successfully', 'Ok', {
  //       duration: 2000,
  //     });
  //   });
  // }
}
