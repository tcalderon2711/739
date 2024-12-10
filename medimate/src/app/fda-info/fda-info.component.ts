import { Component } from '@angular/core';
import { PublicAPIService } from '../shared/public-api.service';
@Component({
  selector: 'app-fda-info',
  templateUrl: './fda-info.component.html',
  styleUrl: './fda-info.component.scss'
})
export class FdaInfoComponent {
 brandName='';
 genericNames: string[]=[];
 error='';

 constructor(private publicAPIService:PublicAPIService){}

 searchGenericNames(){
  this.publicAPIService.getGenericNames(this.brandName).subscribe({
    next:(data)=>{
      this.genericNames=data;
      this.error='';
    },
    error:(err)=>{
      this.error='Error fetching data.';
      console.error(err);
    },
  });
 }
}
