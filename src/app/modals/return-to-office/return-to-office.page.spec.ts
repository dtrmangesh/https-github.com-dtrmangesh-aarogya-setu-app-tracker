import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReturnToOfficePage } from './return-to-office.page';

describe('ReturnToOfficePage', () => {
  let component: ReturnToOfficePage;
  let fixture: ComponentFixture<ReturnToOfficePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnToOfficePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReturnToOfficePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
