import { Component, ElementRef, AfterViewInit, OnInit, ViewChild, NgModule, Input } from '@angular/core';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-carousel',
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.scss'],
	standalone: false,
})
export class CarouselComponent implements OnInit, AfterViewInit {
	@ViewChild('sliderRef') sliderRef: ElementRef<HTMLElement>;
	@Input() width: string = '100%';

	slider: KeenSliderInstance = null;
	currentSlide: number = 1;
	dotHelper: Array<Number> = [];
	constructor() {}

	ngOnInit(): void {}

	ngAfterViewInit() {
		this.slider = new KeenSlider(
			this.sliderRef.nativeElement,
			{
				initial: this.currentSlide,
				loop: true,
				breakpoints: {
					'(min-width: 500px)': {
						slides: {
							perView: 1,
						},
					},
					'(min-width: 700px)': {
						slides: {
							perView: 2,
							spacing: 12,
						},
					},
					'(min-width: 1000px)': {
						slides: {
							perView: 3,
							spacing: 15,
						},
					},
				},

				slideChanged: (s) => {
					this.currentSlide = s.track.details.rel;
				},
			},
			[
				(slider) => {
					let timeout;
					let mouseOver = false;
					function clearNextTimeout() {
						clearTimeout(timeout);
					}
					function nextTimeout() {
						clearTimeout(timeout);
						if (mouseOver) return;
						timeout = setTimeout(() => {
							slider.next();
						}, 2000);
					}
					slider.on('created', () => {
						slider.container.addEventListener('mouseover', () => {
							mouseOver = true;
							clearNextTimeout();
						});
						slider.container.addEventListener('mouseout', () => {
							mouseOver = false;
							nextTimeout();
						});
						nextTimeout();
					});
					slider.on('dragStarted', clearNextTimeout);
					slider.on('animationEnded', nextTimeout);
					slider.on('updated', nextTimeout);
				},
			],
		);
		this.dotHelper = [...Array(this.slider.track.details.slides.length).keys()];
	}
}

@NgModule({
	declarations: [CarouselComponent],
	exports: [CarouselComponent],
	imports: [MatIconModule, NgFor, NgClass, NgStyle, NgIf],
})
export class CarouselModule {}
