import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-register', 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public ms: MainService,
    private r: Router
  ) { }
 
  myForm: FormGroup
  res: any
  msg: any


  ngOnInit(): void {  
 
  
    this.myForm = this.fb.group({ 
      userId: ['', [Validators.required, Validators.min(10000000), Validators.max(999999999)]], 
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', Validators.required], 
      fname: ['', Validators.required], 
      lname: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required]
    })  
  }  

  checkregister() {
    this.ms.registerFirstStep(this.myForm.value).subscribe(
      (res: any) => {
        if (!res.error) {
          if (this.myForm.value.password.length>0 &&  this.myForm.value.password === this.myForm.value.passwordConfirm) {
            this.res = true
           } else {
            this.msg = "Incorrect password verification"
            this.ms.openSnackBar(this.msg)

          }
        } else {
          this.msg = res.msg
          this.ms.openSnackBar(this.msg)

        }
      }, 
      err => {
        console.log(err)
        this.ms.openSnackBar(err.error.msg)

      }
    ) 
  }

  handleSubmit() {
    this.ms.register(this.myForm.value).subscribe(
      (res:any) => {
        
        localStorage.token = res.access_token
        this.ms.loggedUser = jwtDecode(res.access_token)
 
 
        this.r.navigateByUrl('/login')

      }, 
      err => {
        console.log(err)
        this.ms.openSnackBar(err.error._message)

      }
    )
  }
}