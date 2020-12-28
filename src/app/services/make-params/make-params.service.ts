import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MakeParamsService {
  constructor() {}

  make(params: any) {
    let _params = new HttpParams();

    Object.keys(params).map((p) => {
      if (params[p]) {
        _params = _params.set(p, String(params[p]));
      }
    });

    return _params;
  }
}
