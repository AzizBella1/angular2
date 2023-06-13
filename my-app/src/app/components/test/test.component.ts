import { Component, OnInit } from '@angular/core';
import { DataService } from '../../sevices/data.service'
import { Title } from '@angular/platform-browser';
import { Form } from '@angular/forms';
import { Ville } from 'src/app/models/ville';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{
  ville: any;
  vehicule: any;
  produit:any;
  probleme:any;
  solution:any;

  selectedville:any=-1


  villes: any[]=[];
  curDate=new Date();
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');



  forms:any;
  formsMod:any;
  formsModVille:any=[];
  form: any = {
    vehiculeId:'',user: '', villeId: '' ,ville: '', produitId: '', problemeId: '' , solutionId: '', description:'' ,statut:'',dateCreation: null,dateModification: null
  }

  constructor(private dataservice:DataService){}
  ngOnInit() :void {
    //this.showAll();
    this.getForm();
    this.showAll()
    
    
    //this.onSelect(this.selectedville.id);
    
  }

  
  showAll() {
    
    this.dataservice.getVille().subscribe(
      (data:any) => {
        this.ville = data,
        console.log(this.ville)
      }
    )
    

  }
  

  getForm(){
    this.dataservice.getReclamation().subscribe(
      (data:any) => {
        this.forms = data,
        console.log(this.forms)
      }
    )
  }

  selected:boolean=false
  afficher() {
    this.selected=true
    if (this.selectedville==0) {
      
      if (this.formsMod!=null) {
        this.forms=this.formsMod
      }
      for (let obj of this.forms) {
        //console.log('data : '+obj.villeId);
        this.dataservice.getFormVehicule(obj.vehiculeId).subscribe(
          (data:any) => {
            obj.vehicule=data.title
            
            //console.log('data : '+ obj.vehiculeId);
            
          }
        )
        this.dataservice.getFormVille(obj.villeId).subscribe(
          (data:any) => {
            obj.ville=data.title
            
          }//,console.log('ville'+obj.ville)
          
        )
        this.dataservice.getFormProduit(obj.produitId).subscribe(
          (data:any) => {
            obj.produit=data.title
            
          }
        )
        this.dataservice.getFormProbleme(obj.problemeId).subscribe(
          (data:any) => {
            obj.probleme=data.title
            
          }
        )
        
        if (obj.solutionId!=0) {
          
          this.dataservice.getFormSolution(obj.solutionId).subscribe(
            (data:any) => {
              obj.solution=data.title
              
            }
          )
        }
        
      }
    } else if(this.selectedville==-1){
      
      this.selected=false
      this.formsModVille=[]
      this.selectedville=-1
    }else{
      if (this.formsMod!=null) {
        this.forms=this.formsMod
      }
      for (let obj of this.forms){
        if (obj.villeId==this.selectedville) {
          this.formsModVille.push(obj)
          //console.log(obj);
          
        }
      }
      for (let obj of this.formsModVille) {
        //console.log('data : '+obj.villeId);
        this.dataservice.getFormVehicule(obj.vehiculeId).subscribe(
          (data:any) => {
            obj.vehicule=data.title
            
            //console.log('data : '+ obj.vehiculeId);
            
          }
        )
        this.dataservice.getFormVille(obj.villeId).subscribe(
          (data:any) => {
            obj.ville=data.title
            
          }//,console.log('ville'+obj.ville)
          
        )
        this.dataservice.getFormProduit(obj.produitId).subscribe(
          (data:any) => {
            obj.produit=data.title
            
          }
        )
        this.dataservice.getFormProbleme(obj.problemeId).subscribe(
          (data:any) => {
            obj.probleme=data.title
            
          }
        )
        if (obj.solutionId!=0) {
          
          this.dataservice.getFormSolution(obj.solutionId).subscribe(
            (data:any) => {
              obj.solution=data.title
              
            }
          )
        }
        
      }
      this.formsMod=this.forms
      this.forms=this.formsModVille
      //console.log("lod"+this.formsMod);
      
      this.formsModVille=[]
    }
    
    

  }


  test(){
    for (let obj of this.forms) {
      this.dataservice.getFormVehicule(obj.vehiculeId).subscribe(
        (data:any) => {
          obj.vehiculeId=data.title
          
         // console.log('data : '+ obj.vehiculeId);
          
        }
      )
    }
    
    
  }

  afficherTest() {
    this.selected=true
    if (this.selectedville==0) {
      
      if (this.formsMod!=null) {
        this.forms=this.formsMod
      }
      this.boucle(this.forms)
      
    } else if(this.selectedville==-1){
      
      this.selected=false
      this.formsModVille=[]
      this.selectedville=-1
    }else{
      if (this.formsMod!=null) {
        this.forms=this.formsMod
      }
      for (let obj of this.forms){
        if (obj.villeId==this.selectedville) {
          this.formsModVille.push(obj)
          //console.log(obj);
          
        }
      }
      this.boucle(this.forms)
      this.formsMod=this.forms
      this.forms=this.formsModVille
      //console.log("lod"+this.formsMod);
      
      this.formsModVille=[]
    }
    
    

  }


  boucle(x:any){
    for (let obj of x) {
      //console.log('data : '+obj.villeId);
      this.dataservice.getFormVehicule(obj.vehiculeId).subscribe(
        (data:any) => {
          obj.vehicule=data.title
          
          //console.log('data : '+ obj.vehiculeId);
          
        }
      )
      this.dataservice.getFormVille(obj.villeId).subscribe(
        (data:any) => {
          obj.ville=data.title
          
        }//,console.log('ville'+obj.ville)
        
      )
      this.dataservice.getFormProduit(obj.produitId).subscribe(
        (data:any) => {
          obj.produit=data.title
          
        }
      )
      this.dataservice.getFormProbleme(obj.problemeId).subscribe(
        (data:any) => {
          obj.probleme=data.title
          
        }
      )
      this.dataservice.getFormUser(obj.user).subscribe(
        (data:any) => {
          obj.username=data.username
          
        }
      )
      if (obj.solutionId!=0) {
        
        this.dataservice.getFormSolution(obj.solutionId).subscribe(
          (data:any) => {
            obj.solution=data.title
            
          }
        )
      }
      
    }
  }

  

 

  
  
  
}
