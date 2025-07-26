import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-limit',
  templateUrl: './limit.component.html',
  styleUrls: ['./limit.component.scss']
})
export class LimitComponent {

  @Input()
  route: any ;

}
