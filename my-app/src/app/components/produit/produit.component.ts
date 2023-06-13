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
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  produitSelected: any={
    title:''
  }
  

  hideAdd:boolean=true
  addButton:boolean=true
  add(){
    this.addButton=true
    this.produitSelected = {
      title:''
    }

   
    this.hideAdd=!this.hideAdd
    
  }

  constructor(private dataservice:DataService, private activateRoute: ActivatedRoute){}
 
  ngOnInit(): void {
    this.showAll()
  }


  
  showAll() {
    this.dataservice.getProduit().subscribe(
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

  addVille = new FormGroup({
    produit: new FormControl('',[Validators.required, Validators.pattern("[a-z A-Z 0-9]*")])
  })

  get produit() {
    return this.addVille.controls['produit'];
  }


  vehicules:any=[]


  displayedColumns = ['id','title','mod','supp'];
  dataSource:any = [];
  //name = this.activateRoute.snapshot.paramMap.get('name')
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  addNew(){
    this.produitSelected.title=this.addVille.value.produit
    
    this.dataservice.addProduit( this.produitSelected).subscribe(
      (data:any) => {
        
      }
    )
    this.ngOnInit()
    this.hideAdd=!this.hideAdd
  }

  onMod(produit:any){
    this.addButton=false
    this.hideAdd=false
    this.produitSelected.title = produit.title
    this.produitSelected.id = produit.id


    
  }

  modVehicule(produit:any){
   
    this.dataservice.editProduit(this.produitSelected).subscribe(()=>{
      
      produit = this.produitSelected
      this.showAll()
    })
    this.hideAdd=!this.hideAdd
    
  }

  onDelete(id:any){
    this.dataservice.deleteProduit(id).subscribe(
      ()=>{}
    )
    this.showAll()
  }

 
}
