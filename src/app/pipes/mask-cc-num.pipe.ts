import { Pipe, PipeTransform } from "@angular/core";

import { maskCardNumber } from "../app.utils";

@Pipe({
  name: "maskCcNum",
})
export class MaskCcNumPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return maskCardNumber(value);
  }
}
