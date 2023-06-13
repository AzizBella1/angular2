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
  selector: 'app-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  Probleme: any={
    title:'',produitId:0
  }

  editVehicule:Vehicule[]=[]
  produit: any;
  villeTrue:boolean=true
  selectedProduit: any ={
    id:0,title:''
  }

  hideAdd:boolean=true
  addButton:boolean=true
  add(){
    this.addButton=true
    this.Probleme = {
      title:'',villeId:0
    }

    this.selectedProduit = {
      id:0,title:''
    }
    this.hideAdd=!this.hideAdd
    
  }

  constructor(private dataservice:DataService, private activateRoute: ActivatedRoute){}
 
  ngOnInit(): void {
    this.showAll()
    this.getProbleme()
  }

  onChange(event:any){
    this.selectedProduit.id=event.value
  }
  showAll() {
    
    this.dataservice.getProduit().subscribe(
      (data:any) => {
        this.produit = data
      }
    )

  }

  addProbleme = new FormGroup({
    probleme: new FormControl('',[Validators.required, Validators.pattern("[a-z A-Z 0-9]*")]),
    produit:new FormControl('',Validators.required)
  })

  get probleme() {
    return this.addProbleme.controls['probleme'];
  }




  displayedColumns = ['id','title','mod','supp'];
  dataSource:any = [];
  //name = this.activateRoute.snapshot.paramMap.get('name')
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  getProbleme() {
    this.dataservice.getProbleme().subscribe(
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
  
  

  addNew(){
    this.Probleme.title=this.addProbleme.value.probleme
    this.Probleme.produitId=this.addProbleme.value.produit
    
    this.dataservice.addProbleme( this.Probleme).subscribe(
      (data:any) => {
        
      }
    )
    this.ngOnInit()
    this.hideAdd=!this.hideAdd
  }

  onMod(probleme:any){
    this.addButton=false
    this.hideAdd=false
    this.Probleme.produitId = probleme.produitId
    this.Probleme.title = probleme.title
    this.Probleme.id = probleme.id


    this.selectedProduit = {
      id:probleme.produitId
    }
  }

  modVehicule(probleme:any){
   
    this.dataservice.editProbleme(this.Probleme).subscribe(()=>{
      
      probleme = this.Probleme
      this.getProbleme()
    })
    this.hideAdd=!this.hideAdd
    
  }

  onDelete(id:any){
    this.dataservice.deleteProbleme(id).subscribe(
      ()=>{}
    )
    this.getProbleme()
  }
}
