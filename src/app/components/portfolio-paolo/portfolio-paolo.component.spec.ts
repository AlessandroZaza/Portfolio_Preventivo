import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioPaoloComponent } from './portfolio-paolo.component';

describe('PortfolioPaoloComponent', () => {
  let component: PortfolioPaoloComponent;
  let fixture: ComponentFixture<PortfolioPaoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioPaoloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioPaoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
