import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesGraficasComponent } from './reportes-graficas.component';

describe('ReportesGraficasComponent', () => {
  let component: ReportesGraficasComponent;
  let fixture: ComponentFixture<ReportesGraficasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportesGraficasComponent]
    });
    fixture = TestBed.createComponent(ReportesGraficasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
