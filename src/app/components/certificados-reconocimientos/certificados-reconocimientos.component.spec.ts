import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadosReconocimientosComponent } from './certificados-reconocimientos.component';

describe('CertificadosReconocimientosComponent', () => {
  let component: CertificadosReconocimientosComponent;
  let fixture: ComponentFixture<CertificadosReconocimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificadosReconocimientosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificadosReconocimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
