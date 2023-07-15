import { Component, ElementRef, AfterViewInit, OnInit, ViewChild, Input } from '@angular/core';
import { FileInputComponent } from '../shared/file-input/file-input.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss'],
    standalone: true,
    imports: [
			FileInputComponent,
			MatIconModule,
			NgFor,
			NgClass,
			NgIf
		]
})
export class TestComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {

	}


}
