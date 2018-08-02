import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { MENU_ITEMS } from "./pages-menu";

@Component({
  selector: "ngx-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  menu = MENU_ITEMS;
  constructor(private router: Router) {}

  ngOnInit() {}

  changeAdmin() {
    this.router.navigate(["/pages"]);
  }
}
