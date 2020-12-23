import { Component, OnInit } from "@angular/core";
import { SITE_NAME } from "../../../constants";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  siteName = SITE_NAME;
  constructor() {}

  ngOnInit(): void {}
}
