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
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css']
})
export class SolutionComponent implements OnInit {
  Solution: any={
    title:'',problemeId:0
  }

  probleme: any;
  villeTrue:boolean=true
  selectedProbleme: any ={
    id:0,title:''
  }

  hideAdd:boolean=true
  addButton:boolean=true
  add(){
    this.addButton=true
    this.Solution = {
      title:'',villeId:0
    }

    this.selectedProbleme = {
      id:0,title:''
    }
    this.hideAdd=!this.hideAdd
    
  }

  constructor(private dataservice:DataService, private activateRoute: ActivatedRoute){}
 
  ngOnInit(): void {
    this.showAll()
    this.getSolution()
  }

  onChange(event:any){
    this.selectedProbleme.id=event.value
  }
  showAll() {
    
    this.dataservice.getProbleme().subscribe(
      (data:any) => {
        this.probleme = data
      }
    )

  }

  addSolution = new FormGroup({
    solution: new FormControl('',[Validators.required, Validators.pattern("[a-z A-Z 0-9]*")]),
    probleme:new FormControl('',Validators.required)
  })

  get solution() {
    return this.addSolution.controls['solution'];
  }




  displayedColumns = ['id','title','mod','supp'];
  dataSource:any = [];
  //name = this.activateRoute.snapshot.paramMap.get('name')
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  getSolution() {
    this.dataservice.getSolution().subscribe(
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
    this.Solution.title=this.addSolution.value.solution
    this.Solution.problemeId=this.addSolution.value.probleme
    
    this.dataservice.addSolution( this.Solution).subscribe(
      (data:any) => {
        
      }
    )
    this.ngOnInit()
    this.hideAdd=!this.hideAdd
  }

  onMod(solution:any){
    this.addButton=false
    this.hideAdd=false
    this.Solution.problemeId = solution.problemeId
    this.Solution.title = solution.title
    this.Solution.id = solution.id


    this.selectedProbleme = {
      id:solution.problemeId
    }
  }

  modSolution(solution:any){
   
    this.dataservice.editSolution(this.Solution).subscribe(()=>{
      
      solution = this.Solution
      this.getSolution()
    })
    this.hideAdd=!this.hideAdd
    
  }

  onDelete(id:any){
    this.dataservice.deleteSolution(id).subscribe(
      ()=>{}
    )
    this.getSolution()
  }
}
