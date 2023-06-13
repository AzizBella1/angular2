import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/sevices/data.service';

@Component({
  selector: 'app-ereur',
  templateUrl: './ereur.component.html',
  styleUrls: ['./ereur.component.css']
})
export class EreurComponent implements OnInit{

  constructor(private uploadService: DataService,private http:HttpClient) {}
  selectedFile:any
  ngOnInit(): void {
    
  }
 
  name:any = '';
 

  getName(name:any){
    this.name=name
  }

  getFile(event:any){
    this.file = event.target.files[0]
    console.log(this.file.name);
    
  }

  onSubmit(){
    let formData = new FormData()
    formData.set("name",this.name)
    formData.set("file",this.file)
    console.log(formData);

  }
  onFileSelected(event: any){ 
    this.selectedFile = <File>event.target.files[0]
    if (this.selectedFile) { 

      const formData = new FormData();
      formData.append("thumbnail", this.selectedFile);

      const upload$ = this.http.post("localhost:3000/api/thumbnail-upload", formData);

      upload$.subscribe(() => {
        // Handle the successful upload if needed
        console.log("File uploaded successfully!");
      }, error => {
        // Handle the upload error if needed
        console.error("Error uploading file:", error);
      });
    }

    

    
  }
  
  img:any
  toBinary(e:any){
   
    const file = e.target.files[0] ;
    console.log(e.target.value)
    const reader = new FileReader();
    reader.onloadend = () => {
      const binaryData = reader.result;
      // Use the binary data as needed
      console.log(binaryData);
     
    };
    console.log(file)
    
    
    this.img=reader.readAsBinaryString(file);

    console.log('im'+this.img)
  }

  binary(e:any){
    fetch(e.target.value) // Replace with the actual path to your image
    .then(response => response.arrayBuffer())
    .then(buffer => {
      // Convert the ArrayBuffer to binary data
      const binaryData = Array.from(new Uint8Array(buffer));
      // Use the binary data as needed
      this.img=binaryData.toString()
      console.log(binaryData);
    })
    .catch(error => {
      // Handle any errors
      console.error('Error fetching image:', error);
    });
    console.log('img='+this.img);
    
    }
 
    file:any
    image(e:any){
   
      //const file = e.target.files[0] ;
      console.log(e.target.value)
      const data = new FileReader();
      data.addEventListener('load',()=>{
        console.log(data.result);
        
      })
      this.file=data.readAsDataURL(e.target.files[0])
      console.log(this.file)
      this.http.post("./assets", this.file);

      
    }



    

    
}
