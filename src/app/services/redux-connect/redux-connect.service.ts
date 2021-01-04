import { Inject, Injectable } from "@angular/core";
import { IAppStore } from "src/app/types";

@Injectable({
  providedIn: "root",
})
export class ReduxConnectService {
  private static appStore: IAppStore;

  constructor(@Inject("AppStore") appStore: IAppStore) {
    ReduxConnectService.appStore = appStore;
  }

  public static getService(): IAppStore {
    return ReduxConnectService.appStore;
  }
}
