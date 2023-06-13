import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/sevices/data.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private dataservice:DataService, private activateRoute: ActivatedRoute, private router: Router){}


  UserLog: User[] = [];
  User: any= {
    username:'',
    password:'',
    is_super:'',
    is_admin:''
  }


  ngOnInit() {
    
  }

  login = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  get username() {
    return this.login.controls['username'];
  }

  get password() {
      return this.login.controls['password'];
  }

  notLogin:boolean=false

  Login(){
    this.dataservice.getUser().subscribe(
      (data:any) => {
        this.User = data.filter(
          (res:any)=>res.username == this.login.get('username')?.value  && res.username == this.login.get('password')?.value
        )

        if (this.User != '') {
          sessionStorage.setItem('user',this.User[0].id ); 
          sessionStorage.setItem('is_admin',this.User[0].is_admin ); 
          //localStorage.setItem('user', this.User[0].id);
          if (this.User[0].is_admin==0) {
            this.router.navigate(['/home'])
          } else {
            this.router.navigate(['/acceuil'])
          }
          
        }else{
          this.notLogin=true
        }
        //console.log(this.User)
        //console.log(this.login.get('username'));
        
      }
    )
  }


}
