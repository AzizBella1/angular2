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
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{
  
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

  


  displayedColumns = ['id','user','villeId','vehiculeId','dateCreation','dateModification','st','mod'];
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
