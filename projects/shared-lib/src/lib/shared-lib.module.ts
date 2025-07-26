import { NgModule } from '@angular/core';
import { AuthLibModule } from 'auth-lib';
import { SharedLibComponent } from './shared-lib.component';
import { NaviComponent } from './components/navi/navi.component';
import { ChatComponent } from './components/chat/chat.component';



@NgModule({
  declarations: [SharedLibComponent, NaviComponent, ChatComponent],
  imports: [
    AuthLibModule,
  ],
  exports: [SharedLibComponent]
})
export class SharedLibModule { }
