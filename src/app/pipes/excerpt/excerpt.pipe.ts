import {NgModule, Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'excerpt',
	pure: false,
})
export class ExcerptPipe implements PipeTransform {
	transform(text: string, length: number): unknown {
		if (!text) {
			return ' - ';
		}

		if (text.length > length) {
			return text.substr(0, length) + '...';
		}
		return text;
	}
}

@NgModule({
	imports: [
		// dep modules
	],
	declarations: [ExcerptPipe],
	exports: [ExcerptPipe],
})
export class ExcerptPipesModule {}
