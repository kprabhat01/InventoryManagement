import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PoItemAcceptanceComponent } from './po-item-acceptance.component';

describe('PoItemAcceptanceComponent', () => {
  let component: PoItemAcceptanceComponent;
  let fixture: ComponentFixture<PoItemAcceptanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoItemAcceptanceComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PoItemAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
