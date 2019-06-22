import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/UserService/user.service';
import { MatSnackBar } from '@angular/material';


@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    REGEX_NAME = '[a-zA-Z ]*$';
    REGEX_EMAIL = '[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?';
    REGEX_PHONENUMBER = '^[0-9]{10}$';
    REGEX_PASSWORD = '^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])[a-zA-Z0-9@#$%^&+=]*$';
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(private formBuilder: FormBuilder,
        private router: Router, private Userservice: UserService, private snackBar: MatSnackBar) { }

    public ngOnInit() {

        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern(this.REGEX_EMAIL)]],
            phonenumber: ['', [Validators.required, Validators.pattern(this.REGEX_PHONENUMBER)]],
            name: ['', [Validators.required, Validators.pattern(this.REGEX_NAME)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit(user) {
        this.submitted = true;
        // this.loading = true;
        this.Userservice.register(user).subscribe(response => {
            this.snackBar.open('successfully registered', 'Ok', {
                duration: 2000,
            });

        }, (error) => {
            this.snackBar.open('successfully registered', 'Ok', {
                duration: 2000,
            });
            console.log(error);
        });
        this.router.navigate(['/login']);
    }
}
