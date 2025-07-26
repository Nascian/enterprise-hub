import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, PopupRequest, RedirectRequest } from '@azure/msal-browser';

import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'src/app/models/MenuItem';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { GatewayService } from 'src/app/services/gateway.service';


@Component({
  selector: 'app-vertical-nav',
  templateUrl: './vertical-nav.component.html',
  styleUrls: ['./vertical-nav.component.scss']
})
export class VerticalNavComponent implements OnInit, OnDestroy {
  isIframe = false;
  loginDisplay = false;
  

  
  public currentUser: any;
  public displayName : string = '';

  private readonly _destroying$ = new Subject<void>();


  collapsible: boolean = true;

  menu: MenuItem[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storageService: LocalStorageService,
    private gatewayService: GatewayService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {
 
  }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal
    this.setLoginDisplay();

    this.authService.instance.enableAccountStorageEvents(); // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.ACCOUNT_ADDED || msg.eventType === EventType.ACCOUNT_REMOVED),
      )
      .subscribe((result: EventMessage) => {
        if (this.authService.instance.getAllAccounts().length === 0) {
          window.location.pathname = "/";
        } else {
          this.setLoginDisplay();
        }
      });
    
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      })


  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  checkAndSetActiveAccount(){
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  loginRedirect() {
    if (this.msalGuardConfig.authRequest){
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  loginPopup() {
    if (this.msalGuardConfig.authRequest){
      this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
        });
      } else {
        const popupRequest = {
          prompt: "select_account",
          scopes: ["openid", "profile", "User.Read"]
      };

        this.authService.loginPopup(popupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
      });
    }
  }

  logout(popup?: boolean) {
    if (popup) {
      this.authService.logoutPopup({
        mainWindowRedirectUri: "/"
      });
    } else {
      this.authService.logoutRedirect();
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }


  navigateToUrl(item: MenuItem) {
    item.expanded = !item.expanded;



    if (item.children == null || item.children.length == 0) {
     
      this.router.navigate(['/home/'+item.name]);


    }
  }


  

  onLogout(){
    this.storageService.removeToken();
    this.router.navigate(['/login']).then(() => {
      window.location.reload(); // Force a full reload after navigation
    });
  }

  

  toggleMenu(item: MenuItem): void {
    item.expanded = !item.expanded;
  }


  getIconPath(iconName: string): string {
    const iconPaths: any = {
      'dashboard': 'M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z',
      'user': 'M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z',
      'product': 'M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5z'
    };
    return iconPaths[iconName] || '';
  }

}
