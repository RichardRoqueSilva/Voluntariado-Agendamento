import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { routes } from '../../app.routes';
import { TestingModule } from '../../shared/tests';
import { LoginComponent } from './login.component';

describe(LoginComponent.name, () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let http: HttpClient;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, TestingModule],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpClient);
    router = TestBed.inject(Router);
  });

  it(`DEVE renderizar o componente principal`, () => {
    expect(component).toBeTruthy();
  });

  it(`#${LoginComponent.prototype.onSubmit.name} DEVE mostrar mensagem de erro
    QUANDO chamado com o login e senha em branco.`, () => {
    const spy = spyOn(http, 'post');
    fixture.detectChanges();
    component.onSubmit();
    expect(component.errorMessage).toBe('Login e Senha são obrigatórios.');
    expect(spy).not.toHaveBeenCalled();
  });

  it(`#${LoginComponent.prototype.onSubmit.name} DEVE mostrar mensagem de erro
    QUANDO chamado com login preenchido e senha em branco.`, () => {
    const spy = spyOn(http, 'post');
    fixture.detectChanges();

    component.credentials.login = 'Login teste';

    component.onSubmit();
    expect(component.errorMessage).toBe('Login e Senha são obrigatórios.');
    expect(spy).not.toHaveBeenCalled();
  });

  it(`#${LoginComponent.prototype.onSubmit.name} DEVE mostrar mensagem de erro
    QUANDO chamado com senha preenchida e login em branco.`, () => {
    const spy = spyOn(http, 'post');
    fixture.detectChanges();

    component.credentials.senha = 'Senha teste';

    component.onSubmit();
    expect(component.errorMessage).toBe('Login e Senha são obrigatórios.');
    expect(spy).not.toHaveBeenCalled();
  });

  it(`(D) DEVE enviar login
    QUANDO chamado com login e senha válidos e o login for bem sucedido.`, waitForAsync(async () => {
    const spy = spyOn(http, 'post');
    fixture.detectChanges();

    await fixture.whenStable(); // Necessário para aguardar o setup do formulário

    const inputLogin = fixture.debugElement.query(By.css('#login'))
      .nativeElement as HTMLInputElement;
    const inputSenha = fixture.debugElement.query(By.css('#senha'))
      .nativeElement as HTMLInputElement;
    const btn = fixture.debugElement.query(By.css('#btn-efetuar-login'))
      .nativeElement as HTMLButtonElement;

    inputLogin.value = 'Login teste';
    inputLogin.dispatchEvent(new Event('input'));
    inputSenha.value = 'Senha teste';
    inputSenha.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    btn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.credentials.login).toBe('Login teste');
    expect(component.credentials.senha).toBe('Senha teste');
    expect(spy).toHaveBeenCalled();
  }));

  it(`#${LoginComponent.prototype.onSubmit.name} DEVE navegar para tela de 'Home' do sistema
    QUANDO chamado com login e senha válidos e o login for bem sucedido.`, (done) => {
    const sub = new Subject<boolean>();
    spyOn(http, 'post').and.returnValue(sub.asObservable());
    spyOn(router, 'navigate').and.callFake((urls) => {
      expect(urls[0]).toBe('/home');
      done();

      return new Promise((resolve, _) => resolve(true));
    });

    component.credentials.login = 'Login teste';
    component.credentials.senha = 'Senha teste';

    fixture.detectChanges();
    component.onSubmit();
    sub.next(true);
  });

  it(`#${LoginComponent.prototype.onSubmit.name} DEVE exibir mensagem de erro de login ou senha inválidos
    QUANDO login não for bem sucedido e o erro de status retornado for 401.`, () => {
    const sub = new Subject<boolean>();
    spyOn(http, 'post').and.returnValue(sub.asObservable());

    component.credentials.login = 'Login teste';
    component.credentials.senha = 'Senha teste';

    fixture.detectChanges();
    component.onSubmit();
    sub.error({
      status: 401,
    });

    expect(component.errorMessage).toBe('Login ou Senha inválidos.');
  });

  it(`#${LoginComponent.prototype.onSubmit.name} DEVE exibir mensagem de erro de conexão com o sevirodr
    QUANDO login não for bem sucedido e o erro de status retornado não for 401.`, () => {
    const sub = new Subject<boolean>();
    spyOn(http, 'post').and.returnValue(sub.asObservable());

    component.credentials.login = 'Login teste';
    component.credentials.senha = 'Senha teste';

    fixture.detectChanges();
    component.onSubmit();
    sub.error({
      status: 500,
    });

    expect(component.errorMessage).toBe(
      'Erro ao tentar conectar. Tente novamente mais tarde.'
    );
  });
});
