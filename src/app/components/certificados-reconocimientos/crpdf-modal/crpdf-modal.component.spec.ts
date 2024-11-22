import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRPdfModalComponent } from './crpdf-modal.component';

describe('CRPdfModalComponent', () => {
  let component: CRPdfModalComponent;
  let fixture: ComponentFixture<CRPdfModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CRPdfModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CRPdfModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
