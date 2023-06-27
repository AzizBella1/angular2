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
  devaice: any={
    name:'',ville:{id:0},
    disabled:0,
    fonction:'',
    capteurs:'',
    typeveh:'',
    uniqueid:'',
    vehicule:''    
  }

  editVehicule:Vehicule[]=[]
  ville: any;
  villeTrue:boolean=true
  selectedville: any ={
    id:0,name:''
  }

  hideAdd:boolean=true
  addButton:boolean=true
  add(){
    this.addButton=true
    this.devaice = {
      name:'',ville:{id:0},
      disabled:0,
      fonction:'',
      capteurs:'',
      typeveh:'',
      uniqueid:'',
      vehicule:''      

    }
    

    this.selectedville = {
      id:0,name:''
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
    ville:new FormControl(),
    uniqueid:new FormControl('',Validators.required),
    name:new FormControl('',Validators.required),
    capteurs:new FormControl('',Validators.required),
    immatriculation:new FormControl('',Validators.required),
    fonction:new FormControl('',Validators.required),
    disabled:new FormControl(),
    typeveh:new FormControl('',Validators.required)
  })

  get uniqueid() {
    return this.addVehicule.controls['uniqueid'];
  }
  get name() {
    return this.addVehicule.controls['name'];
  }
  get capteurs() {
    return this.addVehicule.controls['capteurs'];
  }
  get immatriculation() {
    return this.addVehicule.controls['immatriculation'];
  }
  get vehicule() {
    return this.addVehicule.controls['vehicule'];
  }
  get fonction() {
    return this.addVehicule.controls['fonction'];
  }
  get typeveh() {
    return this.addVehicule.controls['typeveh'];
  }



  vehicules:any=[]


  displayedColumns = ['id','name','vehicule','typeveh','fonction','uniqueid','capteurs','disabled','mod','supp'];
  dataSource:any = [];
  //name = this.activateRoute.snapshot.paramMap.get('name')
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  getVehicule() {
    this.dataservice.getVehicule().subscribe(
      (data:any) => {
        console.log(data);
        
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
    
    
    this.dataservice.addVehicule( this.devaice).subscribe(
      (data:any) => {
        
      }
    )
    this.ngOnInit()
    this.hideAdd=!this.hideAdd
  }

  onMod(vehicule:any){
    this.addButton=false
    this.hideAdd=false
    this.devaice.ville.id = vehicule.ville.id
    this.devaice.name = vehicule.name
    this.devaice.id = vehicule.id
    this.devaice.fonction = vehicule.fonction
    this.devaice.capteurs = vehicule.capteurs
    this.devaice.typeveh = vehicule.typeveh
    this.devaice.uniqueid = vehicule.uniqueid
    this.devaice.vehicule = vehicule.vehicule
    this.devaice.immatriculation = vehicule.immatriculation
    console.log(this.devaice);
    
    
    this.selectedville = {
      id:vehicule.ville.id
    }
  }

  modVehicule(vehicule:any){
   
    this.dataservice.editVehicule(this.devaice).subscribe(()=>{
      
      vehicule = this.devaice
      this.getVehicule()
    })
    this.hideAdd=!this.hideAdd
    
  }

  onDelete(id:any){
    this.dataservice.deleteVehicule(id).subscribe(
      ()=>{ this.getVehicule()}
    )
   
  }
}
