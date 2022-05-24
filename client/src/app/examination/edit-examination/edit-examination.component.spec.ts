import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExaminationComponent } from './edit-examination.component';

describe('EditExaminationComponent', () => {
  let component: EditExaminationComponent;
  let fixture: ComponentFixture<EditExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExaminationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
