import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import "firebase/auth";
import { auth } from "firebase/app";
import { switchMap, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "demo-gui";

  user$ = this.afAuth.user;
  token$ = this.user$.pipe(
    switchMap(async (user) => {
      if (user) {
        return await user.getIdToken();
      }
      return "";
    })
  );

  public token: string = "";

  public resMessage: string;

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly http: HttpClient
  ) {
    this.token$.subscribe((t) => (this.token = t));
  }

  callServer() {
    console.log("calling");
    this.http
      .get("http://server.gdgdevparty.info/server", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .subscribe((res) => {
        this.resMessage = res["msg"];
      });
  }

  login() {
    console.log(auth);
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }
}
