import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { auth } from 'firebase/app';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'demo-gui';

  user$ = this.afAuth.user;
  token$ = this.user$.pipe(
    switchMap(async (user) => {
      if (user) {
        return await user.getIdToken();
      }
      return '';
    })
  );

  public token = '';
  public error: any;
  public response: any;

  public resMessage: string;

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly http: HttpClient
  ) {
    this.token$.subscribe((t) => (this.token = t));
  }

  callServerRealToken() {
    this.callServer(this.token);
  }

  callServerFakeToken() {
    this.callServer(this.token + 'asd');
  }

  callServer(token: string) {
    this.error = undefined;
    this.response = undefined;
    this.http
      .get('http://server.gdgdevparty.info/server', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(catchError((err) => (this.error = err)))
      .subscribe((res) => {
        this.response = res;
      });
  }

  login() {
    console.log(auth);
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }

  header(token: string) {
    return token.split('.')[0];
  }

  body(token: string) {
    return token.split('.')[1];
  }

  bodyJson(token: string) {
    const body = this.body(token);
    return JSON.parse(atob(body));
  }

  signature(token: string) {
    return token.split('.')[2];
  }
}
