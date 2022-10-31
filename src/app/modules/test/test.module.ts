import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import { Route, RouterModule } from '@angular/router';
import { FileInputModule } from '../shared/file-input/file-input.module';

const testRoutes: Route[] = [
	{
		path: '',
		component: TestComponent
	}
];

@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    CommonModule,
		RouterModule.forChild(testRoutes),
		FileInputModule
  ]
})
export class TestModule { }
