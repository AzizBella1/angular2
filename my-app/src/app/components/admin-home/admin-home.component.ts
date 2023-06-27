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
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  
  /*
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


  asec:any
  desc:any

  forms:any;
  formsMod:any;
  formsEmpty:any;
  formsModVille:any=[];
  form: any = {
    vehiculeId:'',user: '', villeId: '' ,ville: '', produitId: '', problemeId: '' , solutionId: '', description:'' ,statut:'',dateCreation: null,dateModification: null
  }

  constructor(private dataservice:DataService, private router: Router){}
  ngOnInit() :void {
    //this.showAll();
    this.getForm();
    this.showAll()
    
    
    
    //this.onSelect(this.selectedville.id);
    
  }

  
  showAll() {
    
    this.dataservice.getVille().subscribe(
      (data:any) => {
        this.ville = data
        //console.log(this.ville.length)
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
  ne:Number=0
  empty:boolean=false
  afficherTest() {
    this.selected=true
    if (this.selectedville==0) {
      this.ne=1
      if (this.formsMod!=null) {
        this.forms=this.formsMod
      }
      alert('d='+this.desc+' '+'a='+this.asec)
      if (this.asec=='') {
        this.forms.sort((a:any,b:any) =>  new Date(a.dateCreation).getDate() - new Date(b.dateCreation).getDate())
      } else {
        this.forms.sort((a:any,b:any) =>  new Date(b.dateCreation).getDate() - new Date(a.dateCreation).getDate())
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
      
      this.ne=0
      for (let obj of this.forms){
        if (obj.villeId==this.selectedville) {
          this.formsModVille.push(obj),
          
          this.ne=(this.ne.valueOf() + 1)
          //console.log(this.ne);
          
        }
      }
      if (this.formsModVille=='') {
        this.empty==true
      }


      //this.forms.sort((a:any,b:any) =>  new Date(b.dateCreation).getDate() - new Date(a.dateCreation).getDate())
      
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


  
  valider(id:any){
    this.dataservice.validStatut(id.target.value,2).subscribe(()=>{
      this.forms[id.target.value-1].statut=2
    })
    //this.router.navigate(['/acceuil'])

  }
  invalider(id:any){
    this.dataservice.validStatut(id.target.value,0).subscribe(()=>{
      this.forms[id.target.value-1].statut=0
    })

  }*/

  
  newForm: any= {
    vehiculeId:0,user: 0, villeId: 0 , produitId: 0, problemeId: 0 , solutionId: 0 , description:'',file:'',statut:1,dateCreation: '',dateModification: null
  }
  

 
  

  constructor(private dataservice:DataService, private activateRoute: ActivatedRoute){}
 
  ngOnInit(): void {
    this.showAll()
    
  }


  
  showAll() {
    this.dataservice.getReclamation().subscribe(
      (data:any) => {
        
        data.forEach((element:any) => {
          if (element.statut==0) {
            element.st='En cours'
          }else if (element.statut==1) {
            element.st='Traité'
          } else {
            element.st='Validé'
          }
        });
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

  


  displayedColumns = ['id','user','villeId','vehiculeId','dateCreation','dateModification','st'];
  dataSource:any = [];
  //name = this.activateRoute.snapshot.paramMap.get('name')
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  valider(id:any){
    this.dataservice.validStatut(id,2).subscribe(()=>{
      this.dataSource.data[id-1].statut=2
    })
    //this.router.navigate(['/acceuil'])

  }
  invalider(id:any){
    this.dataservice.validStatut(id,0).subscribe(()=>{
      this.dataSource.data[id-1].statut=0
    })

  }


 
}
