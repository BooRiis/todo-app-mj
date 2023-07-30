import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoListRoutingModule } from './todo-list-routing.module';
import { TodoItemsComponent } from './componets/todo-items/todo-items.component';
import { TodoListComponent } from './views/todo-list/todo-list.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_FORMATS, MatDateFormats, MatNativeDateModule } from '@angular/material/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TodoListEffects } from './store/todo-list.effects';
import * as fromTodoListReducer from './store/todo-list.reducer';
import { TodoListService } from './store/todo-list.service';
import { TodoListFacade } from './store/todo-list.facade';
import { ReactiveFormsModule } from '@angular/forms';

const CUSTOM_DATE_FORMAT: MatDateFormats = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY, hh:mm',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  imports: [
    CommonModule,
    TodoListRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromTodoListReducer.TODO_LIST, fromTodoListReducer.reducer),
    EffectsModule.forFeature([TodoListEffects])
  ],
  declarations: [
    TodoItemsComponent,
    TodoListComponent
  ],
  providers: [
    TodoListFacade,
    TodoListService,
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMAT }
  ]
})
export class TodoListModule { }
