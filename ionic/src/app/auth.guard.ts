import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from "@angular/router";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { AppComponent } from "./app.component";
import { LoginComponent } from './login/login.component';
@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  abc:any;
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
  
    if (
      state.url.includes("login") &&
      localStorage.getItem("token")
      
    ) {
      this.router.navigate(["/tabs/tabs.module#TabsPageModule"]);
      return false;
    } else if (
      state.url.includes("login") &&
      !localStorage.getItem("token")
    ) {
      return true;
    } else {
      if (localStorage.getItem("token")) {
        return true;
      } else {
        this.router.navigate(["/login"]);
        return false;
      }
    }
  }
}
