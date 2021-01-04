import { Inject, Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { IAppStore } from "src/app/types";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject("AppStore") private appStore: IAppStore
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const { user } = this.appStore.getState();

    if (user.isLoggedIn) {
      return true;
    }

    this.router.navigate(["/login"], {
      queryParams: {
        reqUrl: route.url.reduce((p, c) => `${p}/${c.path}`, ""),
        reqQueryParams: JSON.stringify(route.queryParams),
      },
    });

    return false;
  }
}
