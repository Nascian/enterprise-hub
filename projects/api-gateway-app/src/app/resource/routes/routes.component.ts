import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GatewayService } from 'projects/shared-lib/src/services/gateway.service';
import { LocalStorageService } from 'projects/shared-lib/src/services/local-storage.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {

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
    private storageService: LocalStorageService,
    private readonly gatewayService: GatewayService) { 
                
    }
 
   public routes : any = [];

  ngAfterViewInit() {


  }


  ngOnInit(): void {


  this.gatewayService.getroute().subscribe(result => {
     this.routes = result;   
     
    });
  }


  selectDeleteRoute(route: any, index:number){
    this.currentRoute = { ...route };
    this.showConfirm = true;
    this.action = 'Delete';  
    this.index = index;
  }

  selectRoute(route: any){
    this.action = 'Edit';  
    this.currentRoute = { ...route };
    this.opened = true;
  }

  selectLimitRoute(route: any){
    this.action = 'Edit';  
    this.currentRoute = { ...route };
    this.limitOpened = true;
  }


  addRoute(){
    this.currentRoute = {
      name: null,
      path: null,
      permissions: null,
      url: null,
      limit:  {
        "limit" : 11000000,
        "quota" : 1001,
        "refreshInterval" : 60,
        "type" : "user"
    }
    };
    this.action = 'Add';
    this.opened = true;
  }

  onSaveOk(){    
   this.showConfirm =true;
  }

  onSaveConfirmOk(){
    
    if(this.action == 'Delete'){
      this.gatewayService.deleteroute(this.currentRoute.name).subscribe(r=>{
        this.routes.splice(this.index,1);
        this.opened = false;
        this.showConfirm =false;
        this.limitOpened = false; 
      });
    }else{
      this.gatewayService.postroute(this.currentRoute).subscribe(r=>{
        this.opened = false;
        this.showConfirm =false;
        this.limitOpened = false;
      });
    }
    
  }
 


}


