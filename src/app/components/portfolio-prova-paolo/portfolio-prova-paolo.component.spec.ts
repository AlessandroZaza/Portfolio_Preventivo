import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioProvaPaoloComponent } from './portfolio-prova-paolo.component';

describe('PortfolioProvaPaoloComponent', () => {
  let component: PortfolioProvaPaoloComponent;
  let fixture: ComponentFixture<PortfolioProvaPaoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioProvaPaoloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioProvaPaoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
