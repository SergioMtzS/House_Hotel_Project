import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoHabPage } from './info-hab.page';

describe('InfoHabPage', () => {
  let component: InfoHabPage;
  let fixture: ComponentFixture<InfoHabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoHabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoHabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
