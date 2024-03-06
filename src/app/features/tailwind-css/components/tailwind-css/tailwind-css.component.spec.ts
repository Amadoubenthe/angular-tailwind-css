import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailwindCssComponent } from './tailwind-css.component';

describe('TailwindCssComponent', () => {
  let component: TailwindCssComponent;
  let fixture: ComponentFixture<TailwindCssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TailwindCssComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TailwindCssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
