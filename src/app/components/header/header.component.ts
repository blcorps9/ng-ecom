import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      query: "",
    });
  }

  onSubmit() {
    if (this.searchForm?.status === "VALID") {
      console.log(" onSubmit =---- > ", this.searchForm?.value);
    }
  }
}
