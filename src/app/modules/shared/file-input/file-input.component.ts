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
	@Output() fileChange = new EventEmitter<FileList>();
	@Input() multiple: boolean = true;
	@Input() label = 'Subir archivo';
	fileChanged: boolean = false;
	fileName: FormControl = new FormControl({ value: '', disabled: true });
	base64: string = '';
	isActive= false;

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
  }

	ngOnChanges(simpleChanges: SimpleChanges): void {
	}

	selectFile(event: Event): void {
		this.isActive = false;
		const target = event.target as HTMLInputElement;
		let files = target.files;
		if(!this.multiple){
			files = files[0] as any;
		}
		this.fileChange.emit(files);
	}


}
