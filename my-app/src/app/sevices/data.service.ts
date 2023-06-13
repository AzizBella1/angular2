import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http'
import { Form } from '../models/form';
import { Ville } from '../models/ville';
import { Observable } from 'rxjs';
import { Vehicule } from '../models/vehicule';
import { Produit } from '../models/produit';
import { User } from '../models/user';
import { Solution } from '../models/solution';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  urlVille = 'http://localhost:3000/ville';
  urlVehicule = 'http://localhost:3000/vehicule';
  urlProduit = 'http://localhost:3000/produit';
  urlProbleme = 'http://localhost:3000/probleme';
  urlSolution = 'http://localhost:3000/solution';
  urlReclamation = 'http://localhost:3000/reclamation';

  urlUser = 'http://localhost:3000/user';
  urlImg = 'http://localhost:3000/img';
  
  getVille(): any {
    return this.http.get<any>(this.urlVille);
  }
  getVehicule(): any {
    return this.http.get<any>(this.urlVehicule);
  }


  getProduit(): any {
    return this.http.get<any>(this.urlProduit);
  }
  getProbleme(): any {
    return this.http.get<any>(this.urlProbleme);
  }

  getSolution(): any {
    return this.http.get<any>(this.urlSolution);
  }

  getReclamation(): any {
    return this.http.get<any>(this.urlReclamation);
  }


  getIdReclamation(id:any): any {
    return this.http.get<any>(`${this.urlReclamation}/${id}`);
  }



  findAll(): any {
    return this.http.get<any>(this.urlReclamation);
  }

  addForm(form:any){
    return this.http.post<Form>(this.urlReclamation,form);
  }
  addVille(ville:any){
    return this.http.post<Ville>(this.urlVille,ville);
  }


  editReclamation(form:Form){
    return this.http.put(`${this.urlReclamation}/${form.id}`,form )

  }



  //// Image 


  uploadImg(formData: FormData){
    alert("uploading img")
    this.http.post('http://192.168.100.254:4242/upload', formData).subscribe(
      (response) => {
        if(response)
          console.log('Upload success:', response);
        else
          console.log('Upload ERROR :', response);
        // Handle success response
      },
      (error) => {
        console.error('Upload error:', error);
        // Handle error response
      }
    );
  }
  



  //////////        User
  getUser(): any {
    return this.http.get<any>(this.urlUser);
  }
  
  getFormVehicule(id:any): any {
    return this.http.get<any>(`${this.urlVehicule}/${id}`);
  }

  getFormUser(id:any): any {
    return this.http.get<any>(`${this.urlUser}/${id}`);
  }

  getFormVille(id:any): any {
    return this.http.get<any>(`${this.urlVille}/${id}`);
  }

  getFormProduit(id:any): any {
    return this.http.get<any>(`${this.urlProduit}/${id}`);
  }

  getFormProbleme(id:any): any {
    return this.http.get<any>(`${this.urlProbleme}/${id}`);
  }

  getFormSolution(id:any): any {
    return this.http.get<any>(`${this.urlSolution}/${id}`);
  }


  ///    admin

  validStatut(id:any,statut:any){
    return this.http.patch(`${this.urlReclamation}/${id}`,{statut:statut} )
  }

  ///   Vehicules

  addVehicule(vehicule:any){
    return this.http.post<Vehicule>(this.urlVehicule,vehicule);
  }

  editVehicule(vehicule:Vehicule){
    return this.http.put(`${this.urlVehicule}/${vehicule.id}`,vehicule )

  }

  deleteVehicule(id:any){
    return this.http.delete(`${this.urlVehicule}/${id}`)
  }


  ////  Villes

  editVille(ville:Vehicule){
    return this.http.put(`${this.urlVille}/${ville.id}`,ville )

  }

  deleteVille(id:any){
    return this.http.delete(`${this.urlVille}/${id}`)
  }


  /////   Produits

  addProduit(produit:any){
    return this.http.post<Produit>(this.urlProduit,produit);
  }

  editProduit(produit:Produit){
    return this.http.put(`${this.urlProduit}/${produit.id}`,produit )

  }

  deleteProduit(id:any){
    return this.http.delete(`${this.urlProduit}/${id}`)
  }


  /////   Probleme

  addProbleme(probleme:any){
    return this.http.post<Produit>(this.urlProbleme,probleme);
  }

  editProbleme(probleme:Produit){
    return this.http.put(`${this.urlProbleme}/${probleme.id}`,probleme )

  }

  deleteProbleme(id:any){
    return this.http.delete(`${this.urlProbleme}/${id}`)
  }

  /////   Solutions

  addSolution(solution:any){
    return this.http.post<Solution>(this.urlSolution,solution);
  }

  editSolution(solution:Solution){
    return this.http.put(`${this.urlSolution}/${solution.id}`,solution )

  }

  deleteSolution(id:any){
    return this.http.delete(`${this.urlSolution}/${id}`)
  }

  ////   Users

  addUser(user:any){
    return this.http.post<User>(this.urlUser,user);
  }

  editUser(user:User){
    return this.http.put(`${this.urlUser}/${user.id}`,user )

  }

  deleteUser(id:any){
    return this.http.delete(`${this.urlUser}/${id}`)
  }

  addImg(form:any){
    return this.http.post<any>(this.urlImg,form);
  }


  // image
  private baseUrl = './assets';


 

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}
