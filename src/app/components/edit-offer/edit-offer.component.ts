import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from 'src/app/services/offer.service';
import { Offer } from 'src/app/models/offer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.scss']
})
export class EditOfferComponent {
  constructor(private offerService:OfferService ,private route:ActivatedRoute, private router:Router) {}

  offer:Offer={
    id:'',
    title:'',
    description:'',
    points:'',
    businessId:0
  };

  offerId:any;

  ngOnInit(){
    this.offerId=this.route.snapshot.paramMap.get('id');
    this.offerService.getOfferById(this.offerId).subscribe(
      {
        next: (result:any)=>{
          this.offer=result;
        },
        error: (error:any)=>{
          console.log(error);
        }
      }
    );
  }

  editOffer(){
    this.offerService.updateOffer(this.offer).subscribe(
      {
        next: (result:any)=>{
          this.router.navigateByUrl('/business/offers');
        },
        error: (error:any)=>{
          console.log(error);
        }
      }
    );
  }

  hasMetFormConditions():boolean{

    if(this.offer.title != '' && this.offer.points !='' && this.offer.points < 100){
      return true;
    }
    return false;
  }

  saveChanges(){
    if(this.hasMetFormConditions()){
      this.editOffer();
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
  }

}
