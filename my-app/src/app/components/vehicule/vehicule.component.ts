import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/sevices/data.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatInputModule} from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vehicule } from 'src/app/models/vehicule';

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.css']
})
export class VehiculeComponent implements OnInit {
  Vehicule: any={
    title:'',villeId:''
  }

  editVehicule:Vehicule[]=[]
  ville: any;
  villeTrue:boolean=true
  selectedville: any ={
    id:0,title:''
  }

  hideAdd:boolean=true
  addButton:boolean=true
  add(){
    this.addButton=true
    this.Vehicule = {
      title:'',villeId:0
    }

    this.selectedville = {
      id:0,title:''
    }
    this.hideAdd=!this.hideAdd
    
  }

  constructor(private dataservice:DataService, private activateRoute: ActivatedRoute){}
 
  ngOnInit(): void {
    this.showAll()
    this.getVehicule()
  }

  onChange(event:any){
    this.selectedville.id=event.value
  }
  showAll() {
    
    this.dataservice.getVille().subscribe(
      (data:any) => {
        this.ville = data
      }
    )

  }

  addVehicule = new FormGroup({
    vehicule: new FormControl('',[Validators.required, Validators.pattern("[a-z A-Z 0-9]*")]),
    ville:new FormControl('',Validators.required)
  })

  get vehicule() {
    return this.addVehicule.controls['vehicule'];
  }


  vehicules:any=[]


  displayedColumns = ['id','title','mod','supp'];
  dataSource:any = [];
  //name = this.activateRoute.snapshot.paramMap.get('name')
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  getVehicule() {
    this.dataservice.getVehicule().subscribe(
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

  addNewVehicule(){
    this.Vehicule.title=this.addVehicule.value.vehicule
    this.Vehicule.villeId=this.addVehicule.value.ville
    
    this.dataservice.addVehicule( this.Vehicule).subscribe(
      (data:any) => {
        
      }
    )
    this.ngOnInit()
    this.hideAdd=!this.hideAdd
  }

  onMod(vehicule:any){
    this.addButton=false
    this.hideAdd=false
    this.Vehicule.villeId = vehicule.villeId
    this.Vehicule.title = vehicule.title
    this.Vehicule.id = vehicule.id


    this.selectedville = {
      id:vehicule.villeId
    }
  }

  modVehicule(vehicule:any){
   
    this.dataservice.editVehicule(this.Vehicule).subscribe(()=>{
      
      vehicule = this.Vehicule
      this.getVehicule()
    })
    this.hideAdd=!this.hideAdd
    
  }

  onDelete(id:any){
    this.dataservice.deleteVehicule(id).subscribe(
      ()=>{}
    )
    this.getVehicule()
  }
}
