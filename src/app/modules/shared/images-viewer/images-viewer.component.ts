import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-images-viewer',
  templateUrl: './images-viewer.component.html',
  styleUrls: ['./images-viewer.component.scss']
})
export class ImagesViewerComponent implements OnInit {

	customOptions: OwlOptions = {
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:5
        },
        600:{
            items:8
        },
        1000:{
					items:10
				},
				2000: {
					items:13
				}
    }
  }
	activeImagen = null;

  constructor(
		@Inject(MAT_DIALOG_DATA) public data: {mainImage: string, images: string[]}
	) { }

  ngOnInit(): void {
		console.log(this.data)
		this.activeImagen = this.data.mainImage;
  }

}
