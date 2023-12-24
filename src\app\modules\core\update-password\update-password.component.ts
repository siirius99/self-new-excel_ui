import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent {

  updatePasswordForm: FormGroup = this.fb.group({
    old_password:['',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
    password:['',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
    confirmPassword:['',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
  });
  hide:boolean=true;
  passwordVisible:boolean=false;
  newPasswordVisible:boolean=false;
  cPasswordVisible:boolean=false;
  showForgotForm=true
  submitted=false
  constructor(private router: Router,private fb: FormBuilder,private toast: ToastrService,
    private sharedService:SharedService,private ngxUiLoader: NgxUiLoaderService, private logger: NGXLogger
  ) {}

  updatePassword(){
    const formValue=this.updatePasswordForm.getRawValue()
    delete formValue.confirmPassword
    this.ngxUiLoader.startLoader('core-loader')
    this.submitted=true
    this.sharedService.putData('change/password',formValue).subscribe({
      next: (res)=>{
        this.logger.log('Password updated successfully')
        this.toast.success(res.message)
        this.router.navigate([''])
      },
      error: (error)=>{
        this.logger.log('Password update failed.',error)
        this.toast.error(error)
        this.submitted=false
      }
    })
  }
}
