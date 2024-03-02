import { Component, OnInit } from '@angular/core';
import { Model } from "survey-core";

const surveyJson = {
  elements: [{
    name: "FirstName",
    title: "Enter your first name:",
    type: "text"
  }, {
    name: "LastName",
    title: "Enter your last name:",
    type: "text"
  }]
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  surveyModel: any;
  ngOnInit() {
    const survey = new Model(surveyJson);
    this.surveyModel = survey;
  }
  title = 'survey-app';
}
