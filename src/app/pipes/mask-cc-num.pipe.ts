import { Pipe, PipeTransform } from "@angular/core";

function maskCardNumber(num: string) {
  const len = num.length;
  const last4 = num.substr(-4);

  return last4.padStart(len, "x");
}

@Pipe({
  name: "maskCcNum",
})
export class MaskCcNumPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return maskCardNumber(value);
  }
}
