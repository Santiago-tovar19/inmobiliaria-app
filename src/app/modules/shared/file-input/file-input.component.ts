import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'file-input',
    templateUrl: './file-input.component.html',
    styleUrls: ['./file-input.component.scss'],
    standalone: true
})
export class FileInputComponent {

	@ViewChild('fileInput') fileInput: HTMLInputElement;
	@Output() fileChange = new EventEmitter<FileList | File>();
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
