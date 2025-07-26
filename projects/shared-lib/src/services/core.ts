import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'projects/shared-lib/src/environments/environment';

export declare interface OnOk {
    /**
     * A callback method that is invoked immediately after the
     * ok button is pressed
     *  import { EventMessage } from '../core/messages/event.message';
     *  private eventMessage: EventMessage
     *  this.eventMessage.confirm('hi',this);
     */
    onOk(): void;
}


export declare interface AuthProvider {
    /**
     * A callback method that is invoked immediately after the
     * ok button is pressed
     *  import { EventMessage } from '../core/messages/event.message';
     *  private eventMessage: EventMessage
     *  this.eventMessage.confirm('hi',this);
     */
    
    login(username: string, password: string): Observable<any>;
}


@Injectable({
  providedIn: 'root',
})
export class AppSettings {
  public env = environment;

}



export class UserApp {
    name: string = ''
    jobTitle: string = ''
    roles: string[] = []
    provider: string = ''
    accessToken : string = ''
  }

export class UserDB {
    sub: string = ''
    name: string = ''
    scopes: string[] = []
    iss: string = ''
    iat: number = 0
    exp: number = 0
  }

  export class Breadcrumb {

    constructor(name: string, href: string) {
      this.name = name;
      this.href = href;
    }

    name: string
    href: string


  }
