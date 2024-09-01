import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])], // Menyertakan RouterTestingModule
      declarations: [HomePage]
    });

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); // Inisialisasi router
    fixture.detectChanges();
  });

  it('should go to pickup-calls on see all', () => {
    spyOn(router, 'navigate');

    component.goToPickupCall();

    expect(router.navigate).toHaveBeenCalledWith(['my']);
  });

  it('should go to new pickup call on create pickup call', () => {
    spyOn(router, 'navigate');

    component.newPickupCall();

    expect(router.navigate).toHaveBeenCalledWith(['pickup-call']);
  });
});
