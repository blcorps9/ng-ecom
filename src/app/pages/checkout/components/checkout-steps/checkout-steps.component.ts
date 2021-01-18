import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import type { ICheckoutStep } from "../../checkout.types";

@Component({
  selector: "app-checkout-steps",
  templateUrl: "./checkout-steps.component.html",
  styleUrls: ["./checkout-steps.component.scss"],
})
export class CheckoutStepsComponent implements OnInit {
  @Input() currentStep: number = 0;
  @Input() steps: ICheckoutStep[] = [];

  @Output() onSelectStep = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  getStepClasses(index: number) {
    return {
      prev: index < this.currentStep,
      current: index === this.currentStep,
      next: index > this.currentStep,
    };
  }

  _onSelectStep(step: number) {
    if (step < this.currentStep) this.onSelectStep.emit(step);
  }
}
