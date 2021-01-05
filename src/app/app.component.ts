import { Component, OnInit } from "@angular/core";

import { RequestClientService } from "./services/request-client/request-client.service";
import {
  ReduxConnect,
  IReduxConnect,
} from "./decorators/redux-connect/redux-connect.decorator";
import * as actions from "./store/actions/user.actions";
import { onRouteChange } from "./store/actions/common.actions";
import { Router, NavigationStart } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
@ReduxConnect()
export class AppComponent implements OnInit, IReduxConnect {
  appStore: any;
  dispatch: any;
  unsubscribe: any;

  title = "ng-ecom";

  constructor(private http: RequestClientService, private router: Router) {
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationStart) {
    //     this.dispatch(onRouteChange());
    //   }
    // });
  }

  ngOnInit() {
    this.dispatch(actions.getDashboardRequest());
    this.http.get("/users/dashboard").subscribe(
      (resp) => {
        this.dispatch(actions.getDashboardSuccess(resp.body.data));
      },
      (error) => {
        this.dispatch(actions.getDashboardFailure(error));
      }
    );
  }
}
