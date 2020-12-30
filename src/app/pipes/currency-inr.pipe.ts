import { Pipe, PipeTransform } from "@angular/core";

const currencyMap: any = {
  "en-IN": "INR",
  "en-US": "USD",
  "en-GB": "EUR",
  "en-JP": "JPY",
};
function formatPrice(price: number, lang = "en-IN") {
  lang = lang || navigator.language;

  return Number(price).toLocaleString(lang, {
    style: "currency",
    currency: currencyMap[lang] || "INR",
  });
}

@Pipe({
  name: "currencyInr",
})
export class CurrencyInrPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return formatPrice(value as number);
  }
}
