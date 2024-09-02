import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPage } from './login.page';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { loginReducer } from 'src/store/login/login.reducers';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { AppState } from 'src/store/AppState';  // Pastikan ini menunjuk ke lokasi yang benar
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { of, throwError } from 'rxjs';
import { User } from 'src/app/model/user/User';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page: any;
  let store: Store<AppState>;
  let toastController: ToastController;
  let authService: AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule, // Gantilah dengan RouterTestingModule untuk pengujian routing
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('loading', loadingReducer),
        StoreModule.forFeature('login', loginReducer),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.inject(Router); // Gunakan TestBed.inject()
    store = TestBed.inject(Store);
    toastController = TestBed.inject(ToastController);
    authService = TestBed.inject(AuthService);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  }));

  it('should create form on init', () => {
    component.ngOnInit();
    expect(component.form).not.toBeUndefined();
  });

  it('should go to register page on register', () => {
    spyOn(router, 'navigate');
    component.register();
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

  it('should recover email/password on forgot email/password', () => {
    fixture.detectChanges();
    component.form.get('email')?.setValue('valid@email.com');
    page.querySelector('#recoverPasswordButton')?.click();
    store.select('login').subscribe((loginState) => {
      expect(loginState.isRecoveringPassword).toBeTruthy();
    });
  });

  it('should show loading when recovering password', () => {
    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.select('loading').subscribe((loadingState) => {
      expect(loadingState.show).toBeTruthy();
    });
  });

  it('should hide loading and show success message when has recovered password', () => {
    spyOn(toastController, 'create').and.callThrough(); // Memastikan spy berfungsi dengan panggilan asli

    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.dispatch(recoverPasswordSuccess());

    store.select('loading').subscribe((loadingState) => {
      expect(loadingState.show).toBeFalsy(); // Tambahkan tanda kurung setelah `Falsy`
    });

    expect(toastController.create).toHaveBeenCalledTimes(1);
  });
  it('should hide loading and show error message when error on recover password', () => {
    spyOn(toastController, 'create').and.returnValue(<any>Promise.resolve({present: () => {}}));

    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.dispatch(recoverPasswordFail({ error: 'Error message' }));
    store.select('loading').subscribe((loadingState) => {
      expect(loadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);

  })

  it('should show loading and start login when on logging in', () => {
    fixture.detectChanges();
    component.form.get('email')?.setValue('valid@email.com');
    component.form.get('password')?.setValue('anyPassword');
    page.querySelector('#loginButton')?.click();
    store.select('loading').subscribe((loadingState) => {
      expect(loadingState.show).toBeTruthy();
    })
    store.select('login').subscribe((loginState) => {
      expect(loginState.isLoggingIn).toBeTruthy();
    })
  })

  it('should hide loading and send user to home when user has logged in', waitForAsync(() => {
    spyOn(router, 'navigate');
    spyOn(authService, 'login').and.returnValue(of(new User()));

    fixture.detectChanges();
    component.form.get('email')?.setValue('valid@email.com');
    component.form.get('password')?.setValue('anyPassword');
    page.querySelector('#loginButton')?.click();

    store.select('loading').subscribe((loadingState) => {
      if (!loadingState.show) {  // Pastikan loading telah disembunyikan
        store.select('login').subscribe((loginState) => {
          expect(loginState.isLoggingIn).toBeFalsy(); // Pastikan tidak dalam proses login
          expect(router.navigate).toHaveBeenCalledWith(['home']);  // Pastikan navigasi terjadi
        });
      }
    });
  }))

  it('should hide loading and show error message when user could not login', () => {
    spyOn(authService, 'login').and.returnValue(throwError({message: 'Error}'}));
    spyOn(toastController, 'create').and.returnValue(<any>Promise.resolve({present: () => {}}));

    fixture.detectChanges();
    component.form.get('email')?.setValue('error@email.com');
    component.form.get('password')?.setValue('anyPassword');
    page.querySelector('#loginButton')?.click();

    store.select('loading').subscribe((loadingState) => {
      expect(loadingState.show).toBeFalsy();
    })
    expect (toastController.create).toHaveBeenCalledTimes(1);
  })

});


