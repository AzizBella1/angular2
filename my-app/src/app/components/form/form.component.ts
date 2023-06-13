import { Component, OnInit } from '@angular/core';
import { DataService } from '../../sevices/data.service'
import { Form } from 'src/app/models/form';
import { Ville } from 'src/app/models/ville';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  ville: any;
  vehicule: any;
  produit:any;
  probleme:any;
  solution:any;

  curDate=new Date();
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');

  forms: Form[] = [];
  newForm: any= {
    vehiculeId:0,user: this.idUser, villeId: 0 , produitId: 0, problemeId: 0 , solutionId: 0 , description:'',file:'',statut:1,dateCreation: this.curDate,dateModification: null
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
  selectedFile: any;
  constructor(private dataservice:DataService, private activateRoute: ActivatedRoute){}

  ngOnInit() :void {
    this.showAll();
    this.showAllProduit();
    this.showAllSolution();
    this.showAllProbleme();
    this.showProbleme()
    this.showSolution()
    //this.editReclamation();
    this.changeButton()
    this.showVilleVehicule();
    this.valider()
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
      this.vehicule.id=0
      this.vehicule = res.filter(
        (res:any)=>res.villeId == ville_id!.value
        
        
      )
      //console.log(this.vehicule)
      
    })
   
  }

  onSelectProduit(id:any){
    
    this.dataservice.getProbleme().subscribe((res:any)=>{
      this.newForm.problemeId=0
      this.probleme.id=0
      this.newForm.solutionId=0
      this.solution.id=0
      this.Traite=false
      this.probleme = res.filter(
        (res:any)=>res.produitId == id!.value
        
        
      )
      //console.log(this.vehicule)
      
    })
   
  }

  onSelectProbleme(id:any){
    
    this.dataservice.getSolution().subscribe((res:any)=>{
      this.newForm.solutionId=0
      this.solution.id=0
      this.solution = res.filter(
        (res:any)=>res.problemeId == id!.value
        
        
      )
      this.Traite=false
      //console.log(this.vehicule)
      
    })
   
  }
  
  showVilleVehicule() {
    this.dataservice.getVehicule().subscribe(
      (data:any) => {
        this.vehicule = data.filter(
          (res:any)=>res.villeId == this.newForm.villeId
          
          
        )
      },
      console.log(this.vehicule)
    )

  }

  showProbleme() {
    this.dataservice.getProbleme().subscribe(
      (data:any) => {
        this.probleme = data.filter(
          (res:any)=>res.produitId == this.newForm.produitId
          
          
        )
      },
      console.log(this.probleme)
    )

  }

  showSolution() {
    this.dataservice.getSolution().subscribe(
      (data:any) => {
        this.solution = data.filter(
          (res:any)=>res.problemeId == this.newForm.problemeId
          
          
        )
      },
      console.log(this.solution)
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

  lastFormId:any
  addReclamation(){
    // reclamation => response.id
    if (this.allValid) {
      this.dataservice.addForm(this.newForm).subscribe(
        (form:any)=>{this.forms = [form],this.lastFormId=form.id,
          alert('daraaaaa + '+this.lastFormId)
        }
        
        
        )
        
//        this.uploadFile()
    }
    

    
  }

 

  onFileSelected(event:any): void {               
    if (event && event.target.files.length > 0) { 
      this.selectedFile =  event.target.files[0]; 
      this.newForm.file=this.selectedFile.name
    }                                             
  }

  uploadFile(): void {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      
      formData.append('file', this.selectedFile);
      formData.append('recid', '1');
      
      this.dataservice.uploadImg(formData)
    }
  }

 
  idForm = this.activateRoute.snapshot.paramMap.get('id')
  issetId:boolean = true

  


  changeButton(){
    if (this.idForm == null) {
      this.issetId = false
    }
    
  }

  mod(form:any){
    this.dataservice.editReclamation(this.newForm).subscribe(()=>{
      form = this.newForm
    })
  }


 
}
