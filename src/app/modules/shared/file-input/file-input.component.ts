import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from 'environments/environment';

@Component({
  selector: 'file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit, OnChanges {

	@ViewChild('fileInput') fileInput: HTMLInputElement;
	@Output() fileChange = new EventEmitter<File>();
	@Input() fileControl: FormControl
	@Input() fileChangedControl: FormControl
	@Input() label = 'Subir archivo';
	fileChanged: boolean = false;
	fileName: FormControl = new FormControl({ value: '', disabled: true });
	base64: string = '';

	fileToBase64(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});
	}
  constructor() { }

  ngOnInit(): void {
		this.fileControl.valueChanges.subscribe((value) => {
			if(value){
				this.base64 = `${environment.assets}/files/${value}`;
				this.fileName.setValue(value);
			}
		});
  }

	ngOnChanges(simpleChanges: SimpleChanges): void {
	}

	selectFile(event: Event): void {
		const target = event.target as HTMLInputElement;
		const file = target.files[0];
		this.fileName.setValue(file.name);
		this.fileChange.emit(file);
		this.fileToBase64(file).then((base64) => {
			this.base64 = base64;
		});
		this.fileChangedControl.setValue(true);
		this.fileControl.setValue(file);
	}

	removeFile(): void {
		this.fileChangedControl.setValue(true);
		this.fileName.setValue('');
		this.fileControl.setValue(null);
		this.fileInput.value = '';
		this.base64 = '';
	}

}
