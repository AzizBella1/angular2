import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor( private router: Router){}
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');

  Logout(){
    sessionStorage.removeItem('user'); 
    //localStorage.setItem('user', '');
    this.router.navigate(['/'])
  }
}
