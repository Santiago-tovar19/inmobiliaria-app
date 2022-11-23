import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ExcerptPipesModule } from 'app/pipes/excerpt/excerpt.pipe';
import {ManagePropertyComponent} from './manage-property.component';
import { FileInputModule } from 'app/modules/shared/file-input/file-input.module';
import { FuseAlertModule } from '@fuse/components/alert';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { OlMapsModule } from 'app/modules/shared/open-layers/ol-maps.module';








@NgModule({
  declarations: [
    ManagePropertyComponent
  ],
  imports: [
    CommonModule,
		MatIconModule,
    CarouselModule,
		FormsModule,
		MatExpansionModule,
		MatButtonModule,
		CarouselModule,
		HttpClientModule,
		MatTabsModule,
		OlMapsModule,
		MatSlideToggleModule,
		MatFormFieldModule,
		MatProgressBarModule,
		MatInputModule,
		FileInputModule,
		FuseAlertModule,
		ReactiveFormsModule
  ]
})
export class ManagePropertyModule { }
