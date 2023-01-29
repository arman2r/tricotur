import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterGlobetrotterComponent } from './register-globetrotter.component';

describe('RegisterGlobetrotterComponent', () => {
  let component: RegisterGlobetrotterComponent;
  let fixture: ComponentFixture<RegisterGlobetrotterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterGlobetrotterComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterGlobetrotterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
