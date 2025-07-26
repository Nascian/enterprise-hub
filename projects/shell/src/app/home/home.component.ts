import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GatewayService } from 'projects/shared-lib/src/services/gateway.service';
import { LocalStorageService } from 'projects/shared-lib/src/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public opened:boolean;
  public limitOpened:boolean;
  
  public showConfirm:boolean;
  
  public article: any;
  public published_at: any;
  public action:string;

  @ViewChild('container') d1: ElementRef;

  currentRoute: any = null;

  index: number;
  name: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: LocalStorageService,
    private readonly gatewayService: GatewayService) { 
                
    }
 
   public data : any;

  ngAfterViewInit() {


  }


  ngOnInit(): void {

  }

  getLink(item:any){
   
  }

}
