import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/sevices/data.service';

@Component({
  selector: 'app-modifier-form',
  templateUrl: './modifier-form.component.html',
  styleUrls: ['./modifier-form.component.css']
})
export class ModifierFormComponent implements OnInit {

  constructor(private dataservice:DataService, private activateRoute: ActivatedRoute){}
  idUser = sessionStorage.getItem('user');
  is_admin = sessionStorage.getItem('is_admin');

  ville: any;
  vehicule: any;
  produit:any;
  probleme:any;
  solution:any;

  curDate=new Date();

  forms: Form[] = [];
  newForm: any= {
    vehiculeId:0,user: this.idUser, villeId: 0 , produitId: 0, problemeId: 0 , solutionId: 0 , description:'' ,statut:1,dateCreation: this.curDate,dateModification: null
  }

  selectedville: any ={
    id:0,title:''
  }
  selectedvehicule: any ={
    id:0,title:''
  }
  selectedproduit: any ={
    id:0,title:''
  }
  selectedprobleme: any ={
    id:0,title:''
  }
  
  
  ngOnInit() :void {
    this.showAll();
    this.showAllProduit();
    this.showAllSolution();
    this.showAllProbleme();
    
    this.editReclamation();
    this.changeButton()
    
    //this.valider()
    this.showVilleVehicule();
    
    
  }
 

  showAll() {
    
    this.dataservice.getVille().subscribe(
      (data:any) => {
        this.ville = data,
        console.log(this.ville)
      }
    )
    

  }
  showAllProduit() {
    this.dataservice.getProduit().subscribe(
      (data:any) => {
        this.produit = data,
        console.log(this.produit)
        
      
      }
    )
   // alert(this.newForm.villeId)
  }

  showAllProbleme() {
    this.dataservice.getProbleme().subscribe(
      (data:any) => {
        this.probleme = data
        //console.log(this.probleme)
      }
    )

  }

  showAllSolution() {
    this.dataservice.getSolution().subscribe(
      (data:any) => {
        this.solution = data
        //console.log(this.solution)
      }
    )

  }

  changeVille:boolean=false
  onSelectVille(ville_id:any){
   
    this.dataservice.getVehicule().subscribe((res:any)=>{
      this.newForm.vehiculeId=0
      this.selectedvehicule.id=0
      this.vehicule = res.filter(
        (res:any)=>res.villeId == ville_id!.value
        
        
      )
      console.log('test : ',this.vehicule)
      
    })
   
  }
  
  showVilleVehicule() {
    console.log('im in showVilleVehicule function');
    
    this.dataservice.getVehicule().subscribe(
      (data:any) => {
        this.vehicule = data.filter((res:any)=>res.villeId == this.getVille)
         //alert('data : '+this.selectedville.id);
        
      }
    )

  }

  

 

 

  

 


  allValid:boolean=true
  Traite:boolean=true

  valider(){
    switch (this.newForm.statut) {
      case 0:
        if (this.newForm.vehiculeId==0  || this.newForm.villeId==0 || this.newForm.produitId==0  ||this.newForm.problemeId==0 ) {
          this.Traite=true
          this.allValid=false
            
          
        }else{
          this.Traite=true
          this.allValid=true
          
        }
        
        break;
      case 1:
        if (this.newForm.vehiculeId==0  || this.newForm.villeId==0 || this.newForm.produitId==0  ||this.newForm.problemeId==0  ) {
      
          
          this.allValid=false
          if (this.newForm.solutionId==0) {
            this.Traite=false
          }else{
            this.Traite=true
          }
          
            
          
        }else{
          if (this.newForm.solutionId==0) {
            this.Traite=false
            this.allValid=false
          }else{
            this.Traite=true
            this.allValid=true
          }
          
          
          
        }
        break;
    
      
    }
    
    
    
    
    
  }


 
  idForm = this.activateRoute.snapshot.paramMap.get('form')
  getVille = this.activateRoute.snapshot.paramMap.get('ville')
  issetId:boolean = true

  


  changeButton(){
    if (this.idForm == null) {
      this.issetId = false
    }
    
  }

  mod(form:any){
    this.newForm.dateModification=this.curDate
    this.dataservice.editReclamation(this.newForm).subscribe(()=>{
      
      form = this.newForm
    })
  }


  editReclamation(){
   
    this.dataservice.getIdReclamation(this.idForm).subscribe((res:any)=>{
      
        this.newForm = res
        
        
      }),
      console.log(this.newForm)
      
    
    
  }
}
