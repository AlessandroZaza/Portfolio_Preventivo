import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioprovapaoloComponent } from './portfolioprovapaolo.component';

describe('PortfolioprovapaoloComponent', () => {
  let component: PortfolioprovapaoloComponent;
  let fixture: ComponentFixture<PortfolioprovapaoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioprovapaoloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioprovapaoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
