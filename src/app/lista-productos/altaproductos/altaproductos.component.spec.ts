import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaProductoComponent } from './altaproductos.component';

describe('AltaproductosComponent', () => {
  let component: AltaProductoComponent;
  let fixture: ComponentFixture<AltaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltaProductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AltaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
