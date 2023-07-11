import { Component, OnInit } from '@angular/core';
import { TestService } from './service/test.service';

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

	file: File;
	constructor(
		private _testService: TestService
	) { }

	ngOnInit(): void {
		console.log('test');
	}

	fileChange(file: File | FileList): void{
		console.log(file);
		this.file = file as File;
	}

	uploadFile(): void{
		this._testService.uploadFile(this.file).subscribe((response) => {
			console.log(response);
		});
	}

}
