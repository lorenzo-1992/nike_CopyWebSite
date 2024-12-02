import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailShoeComponent } from './detail-shoe.component';

describe('DetailShoeComponent', () => {
  let component: DetailShoeComponent;
  let fixture: ComponentFixture<DetailShoeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailShoeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailShoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
