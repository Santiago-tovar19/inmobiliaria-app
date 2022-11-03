import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector     : 'example',
    templateUrl  : './example.component.html',
		styleUrls    : ['./example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ExampleComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
