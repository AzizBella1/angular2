import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/sevices/data.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatInputModule} from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vehicule } from 'src/app/models/vehicule';
import { every } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  userSelected: any={
    username:'',password:'',is_admin:0
  }
  

  hideAdd:boolean=true
  addButton:boolean=true
  add(){
    this.addButton=true
    this.userSelected = {
      username:'',password:'',is_admin:0
    }

   
    this.hideAdd=!this.hideAdd
    
  }

  constructor(private dataservice:DataService, private activateRoute: ActivatedRoute){}
 
  ngOnInit(): void {
    this.showAll()
  }


  
  showAll() {
    this.dataservice.getUser().subscribe(
      (data:any) => {
        
        this.dataSource = new MatTableDataSource<Element>(data)
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      }
    )

  }

  filter(event:any){
    this.dataSource.filter = event.value
  }

  addUser = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    admin: new FormControl()
  })

  get username() {
    return this.addUser.controls['username'];
  }

  get password() {
    return this.addUser.controls['password'];
  }

  get admin() {
    return this.addUser.controls['admin'];
  }


  vehicules:any=[]


  displayedColumns = ['id','username','password','is_admin','mod','supp'];
  dataSource:any = [];
  //name = this.activateRoute.snapshot.paramMap.get('name')
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  addNew(){
    this.dataservice.addUser( this.userSelected).subscribe(
      (data:any) => {
        
      }
    )
    this.ngOnInit()
    this.hideAdd=!this.hideAdd
  }

  onMod(user:any){
    this.addButton=false
    this.hideAdd=false
    this.userSelected.is_admin = user.is_admin
    this.userSelected.username = user.username
    this.userSelected.password = user.password
    this.userSelected.id = user.id


  }

  modUser(user:any){
   
    this.dataservice.editUser(this.userSelected).subscribe(()=>{
      
      user = this.userSelected
      this.showAll()
    })
    this.hideAdd=!this.hideAdd
    
  }

  onDelete(id:any){
    this.dataservice.deleteUser(id).subscribe(
      ()=>{}
    )
    this.showAll()
  }

  
}
