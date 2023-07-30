import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoListRoutingModule } from './todo-list-routing.module';
import { TodoItemsComponent } from './components/todo-items/todo-items.component';
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
import { MatNativeDateModule } from '@angular/material/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TodoListEffects } from './store/todo-list.effects';
import * as fromTodoListReducer from './store/todo-list.reducer';
import { TodoListService } from './store/todo-list.service';
import { TodoListFacade } from './store/todo-list.facade';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmActionDirective } from 'src/app/directives/confirm-action.directive';


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
    TodoListComponent,
    ConfirmActionDirective
  ],
  providers: [
    TodoListFacade,
    TodoListService,
  ]
})
export class TodoListModule { }
