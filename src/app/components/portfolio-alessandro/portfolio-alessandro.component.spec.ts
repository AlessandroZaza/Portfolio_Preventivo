import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioAlessandroComponent } from './portfolio-alessandro.component';

describe('PortfolioAlessandroComponent', () => {
  let component: PortfolioAlessandroComponent;
  let fixture: ComponentFixture<PortfolioAlessandroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioAlessandroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioAlessandroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
