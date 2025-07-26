import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { organization } from './organization';
import { AuthService } from 'projects/shared-lib/src/services/auth.service';
import { GatewayService } from 'projects/shared-lib/src/services/gateway.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isIframe = false;
  loginDisplay = false;
  


  rootDirectory = organization;

  openFile(url: string): void {
  
  
    this.router.navigate([url]).then(() => {
     
    }); 
    
    
  }

  setFileActive(dir: any, fileName: string) {
    for (const file of dir.files) {
      file.active = file.name === fileName;
      
    }
  }

  
  public currentUser: any;
  public displayName : string = '';

  private readonly _destroying$ = new Subject<void>();


  collapsible: boolean = true;
  isActive: boolean = false;


  


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private gatewayService: GatewayService
  ) {
    
  }

  ngOnInit(): void {
    

  }

  setLoginDisplay() {
   
  }

  


  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }


  navigateToUrl(item: any) {
    item.expanded = !item.expanded;
    if (item.children == null || item.children.length == 0) {
      this.router.navigate(['/home/'+item.name]);
    }
  }


  onLogout(){
    this.authService.logout();
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }
  

  toggleMenu() {
    this.isActive = !this.isActive;
  }


}
