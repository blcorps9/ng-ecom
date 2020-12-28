import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MakeHeadersService {
  constructor() {}

  make(headers: any) {
    let _headers = new HttpHeaders().set("content-Type", "application/json");

    if (headers) {
      Object.keys(headers as any).map((h) => {
        if (headers[h]) {
          _headers = _headers.set(h.toLowerCase(), String(headers[h]));
        }
      });
    }

    return _headers;
  }
}
