import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReghabPage } from './reghab.page';

describe('ReghabPage', () => {
  let component: ReghabPage;
  let fixture: ComponentFixture<ReghabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReghabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReghabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
