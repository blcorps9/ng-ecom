import { Component, OnInit } from "@angular/core";
import { ReduxConnect } from "src/app/decorators/redux-connect/redux-connect.decorator";

@Component({
  selector: "app-spinner",
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.scss"],
})
@ReduxConnect((state) => ({ show: state.common.spinner }))
export class SpinnerComponent implements OnInit {
  show = true;

  constructor() {}

  ngOnInit(): void {}
}
