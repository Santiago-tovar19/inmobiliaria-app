import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlMapRouteComponent } from './ol-map-route.component';

describe('OlMapMarkerComponent', () => {
  let component: OlMapRouteComponent;
  let fixture: ComponentFixture<OlMapRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlMapRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlMapRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
