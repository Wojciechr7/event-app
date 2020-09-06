import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRoutingModule } from './event-routing.module';
import { ListComponent } from './components/list/list.component';
import { BaseModule } from '../../../../../../libs/base/src/lib/base.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromEvent from './+state/event.reducer';
import { EventEffects } from './+state/event.effects';
import { AddFormComponent } from './components/add-form/add-form.component';

@NgModule({
  declarations: [ListComponent, AddFormComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    BaseModule,
    StoreModule.forFeature(fromEvent.EVENT_FEATURE_KEY, fromEvent.reducer),
    EffectsModule.forFeature([EventEffects]),
  ],
})
export class EventModule {}
