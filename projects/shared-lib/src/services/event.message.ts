
import { Injectable } from '@angular/core';
import { Observable, Observer, Subscription,empty } from 'rxjs';
import { filter, share } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EventMessage {
 
  observable : Observable<any>;
  observer: Observer<any> ;
 
   constructor( ) {
    //this.observable = new Observable(this.observer : Observer);
    this.observable = Observable.create((observer : Observer<any>) => {
      this.observer = observer;
    }).pipe(share());
  }

  subscribe(eventName : any , callback:any){
      
    const subscriber : Subscription = this.observable
          .pipe (
              filter(event => {               
                return event.name  === eventName;
              })
          ).subscribe(callback);
    return subscriber;
  }


  toggleRouteModal(data: any){
    this.broadcast({name : 'toggleRouteModal', data: data});   
  }

  toggleRowModal(action:string , data: any, pk:string){
    this.broadcast({name : 'toggleRowModal',action:action, data: data, pk:pk});   
  }


  info(data: any){
    this.broadcast({name : 'info', data: JSON.stringify(data)});   
  }

  open(data: any){
    
    
    this.broadcast({name : 'component.open', metadata: data});   
  }

  append(data: any){
    this.broadcast({name : 'component.append', data: data});   
  }
  close(data: any){
    this.broadcast({name : 'component.close', data: data});   
  }

  edit(data: any){
    this.broadcast({name : 'component.edit', data: data});   
  }
  

  run(data: any){
    this.broadcast({name : 'component.run', data: data});   
  }

  
  confirm(message: string, component: any){
    this.broadcast({name : 'confirm', message: message, component:component});   
  }

  error(data: any){   
    this.broadcast({name : 'error', data: JSON.stringify(data)});   
  }

  broadcast(event: any){   
      if(this.observer != null){
        this.observer.next(event);
    }
  }

  destroy(subscriber : Subscription){
    subscriber.unsubscribe();
  }


}


