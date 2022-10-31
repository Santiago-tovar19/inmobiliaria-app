import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {

	@ViewChild('fileInput') fileInput: HTMLInputElement;
	@Output() fileChange = new EventEmitter<File>();
	fileName: FormControl = new FormControl('');
  constructor() { }

  ngOnInit(): void {
		// Disable
		this.fileName.disable();
  }

	selectFile(event: Event): void {
		const target = event.target as HTMLInputElement;
		const file = target.files[0];
		this.fileName.setValue(file.name);
		this.fileChange.emit(file);
	}

	removeFile(): void {
		this.fileName.setValue('');
		this.fileInput.value = '';
	}

}
