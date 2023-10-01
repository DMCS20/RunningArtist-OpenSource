import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Offer } from 'src/app/models/offer';
import { OfferService } from 'src/app/services/offer.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.scss']
})
export class ListOffersComponent {
  displayedColumns: string[] = ['id', 'title', 'description', 'points', 'businessId', 'modify'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild (MatPaginator, {static: true})
  paginator !: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private offerService:OfferService, private router:Router) {}

  ngOnInit():void{
    this.getOffers();
    this.dataSource.paginator=this.paginator;
  }

  ngAfterViewInit():void{
    this.dataSource.sort=this.sort;
  }

  getOffers(){
    this.offerService.getOffers().subscribe(
      {
        next: (result:any)=>{
          this.dataSource.data=result;  
        },
        error: (error:any)=>{
          console.log(error);
        }
      }
    );
  }

  addOffer(){
    this.router.navigateByUrl('/admins/offers/new');
  }

  updateOffer(id:any){
    this.router.navigateByUrl('admins/offers/edit/'+id);
    // this.offerService.updateOffer(id).subscribe(
    //   {
    //     next: (result:any)=>{
    //       this.getOffers();
    //     },
    //     error: (error:any)=>{
    //       console.log(error);
    //     }
    //   }
    // );
  }

  deleteOffer(id:any){
    this.offerService.deleteOffer(id).subscribe(
      {
        next: (result:any)=>{
          this.getOffers();
        },
        error: (error:any)=>{
          console.log(error);
        }
      }
    );
  }
}
