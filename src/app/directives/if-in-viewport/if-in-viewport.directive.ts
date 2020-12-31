import {
  Directive,
  ViewContainerRef,
  TemplateRef,
  AfterViewInit,
} from "@angular/core";

@Directive({
  selector: "[appIfInViewport]",
})
export class IfInViewportDirective implements AfterViewInit {
  constructor(private vcr: ViewContainerRef, private tmpl: TemplateRef<any>) {}

  ngAfterViewInit() {
    const target = this.vcr.element.nativeElement.parentElement;
    const observer = new IntersectionObserver(
      (entries: any) => {
        entries.forEach((entry: any) => {
          if (entry.isIntersecting) {
            this.vcr.createEmbeddedView(this.tmpl);
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0 }
    );
    observer.observe(target);
  }
}
