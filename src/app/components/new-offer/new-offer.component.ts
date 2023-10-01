import { Component } from '@angular/core';
import { OfferService } from 'src/app/services/offer.service';
import { Offer } from 'src/app/models/offer';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.scss']
})
export class NewOfferComponent {
  offer:Offer={
    id:'',
    title:'',
    description:'',
    points:'',
    businessId:0
  };


  idIsAvailable:boolean=false;
  verifyButtonPressed:boolean=false;

  constructor(private offerService:OfferService, private router:Router, private snackBar:MatSnackBar){}

  addOffer(){
      this.offerService.addOffer(this.offer).subscribe(
        {
          next: (result:any)=>{
            this.clearAllFields();
            this.router.navigateByUrl('/business/offers');
          },
          error: (error:any)=>{
            console.log(error);
          }
        }
      ); 
  }

  checkIdAvailability(){
    this.verifyButtonPressed=true;
    if(this.offer.id == ''){
      this.idIsAvailable=true;
      this.openSnackBar('Id will be generated automatically', 'Close', 2000)
      return;
    }
    this.offerService.getOfferById(this.offer.id).subscribe(
      {
        next: (result:any)=>{
          this.openSnackBar('Id '+ this.offer.id +' is not available', 'Close', 2000)
          this.idIsAvailable=false;
        },
        error: (error:any)=>{
          this.openSnackBar('Id '+ this.offer.id +' is available!', 'Close', 2000)
          this.idIsAvailable=true;
        }
      }
    );
  }
  
  onIdChange(){
    this.idIsAvailable=false;
    this.verifyButtonPressed=false;
  }

  hasMetFormConditions():boolean{
    if(this.offer.id == ''){
      this.idIsAvailable=true;
    }

    if(this.offer.title != '' && this.offer.points !='' && this.idIsAvailable && this.offer.points < 100){
      return true;
    }
    return false;
  }

  saveChanges(){
    if(this.hasMetFormConditions()){
      this.addOffer();
    }
    else{
      if(this.idIsAvailable){
        this.openSnackBar('You must insert all the required fields', 'Close', 2000)
      }
      else{
        if(this.verifyButtonPressed)
          this.openSnackBar('Id '+ this.offer.id +' is not available', 'Close', 2000)
        else
          this.openSnackBar('You must verify the id availability', 'Close', 2000)
      }
    }
  }

  cancelChanges(){
    this.clearAllFields();
    this.router.navigateByUrl('/business/offers');
  }

  clearAllFields(){
    this.offer.id='';
    this.offer.title='';
    this.offer.description='';
    this.offer.points='';
    this.idIsAvailable=false;
  }

  openSnackBar(message:string, action:string, duration:number){
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
