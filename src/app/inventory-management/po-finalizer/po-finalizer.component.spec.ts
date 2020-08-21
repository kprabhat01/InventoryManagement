import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PoFinalizerComponent } from './po-finalizer.component';

describe('PoFinalizerComponent', () => {
  let component: PoFinalizerComponent;
  let fixture: ComponentFixture<PoFinalizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoFinalizerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PoFinalizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
