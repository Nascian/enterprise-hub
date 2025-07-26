import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventMessage } from 'projects/shared-lib/src/services/event.message';


@Component({
  selector: 'app-event-message',
  templateUrl: './event-message.component.html',
  styleUrls: ['./event-message.component.scss']

})

export class EventMessageComponent implements OnInit, AfterViewInit {

  errors: any;
  message: any;
  title: any;
  closeResult: string = '';
  private callback: any;

  constructor(
    
    private eventMessage: EventMessage
  ) { }

 
  ngOnInit() {
    
    this.eventMessage.subscribe('error', (callback: { data: any; }) => {
      
      this.message = callback.data; 
      this.toggleModal();  
    });

   
    this.eventMessage.subscribe('interceptor.error.429', (callback: { data: any; }) => {
      this.errors = 'Has alcanzado la cantidad máxima de solicitudes';
      
      
    });


    this.eventMessage.subscribe('info', (callback: { data: any; }) => {
      this.message = callback.data;           
      this.toggleModal();
    });

    this.eventMessage.subscribe('confirm', (callback: any) => {   
      this.callback =  callback;    
      this.title = this.callback.message;    
      this.toggleModal();
    });


  }


  ngAfterViewInit(){
    this.toggleModal();
  }

  ok() {
    if (this.callback != null && this.callback.component != null && typeof this.callback.component === 'object' && 'onOk' in this.callback.component) {
      // The object implements the OnOk interface
      this.callback.component.onOk();   
      this.toggleModal();   
    }else{
      this.toggleModal();  
    }
  }

  cancel() {
    this.toggleModal();
  }

  @ViewChild('modalMsg') modalMsg: ElementRef = new ElementRef('');

  toggleModal() {
    if (this.modalMsg.nativeElement.className === 'hidden') {
      this.modalMsg.nativeElement.className = ''
    } else {
      this.modalMsg.nativeElement.className = 'hidden'
    }
  }

  logOut() {
   
  }


}

