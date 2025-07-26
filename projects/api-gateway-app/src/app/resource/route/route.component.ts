import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit{

  @Input()
  route: any ;

  isEditable:boolean;


  @Output() routeChange: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
    console.log(this.route);
    if(this.route.name == null){
      this.isEditable = true;
    }
  }



}
