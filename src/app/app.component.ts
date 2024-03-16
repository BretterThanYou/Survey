import { Component, OnInit } from '@angular/core';
import { Model } from "survey-core";

const surveyJson = {
  elements: [{
    name: "FirstName",
    title: "Please Enter your first name:",
    type: "text"
  }, {
    name: "LastName",
    title: "Enter your last name:",
    type: "text"
  },
  {
    "type": "radiogroup",
    "name": "car",
    "title": "Which is the brand of your car?",
    "isRequired": true,
    "showNoneItem": true,
    "showOtherItem": true,
    "colCount": 1,
    "choices": [ "Ford", "Vauxhall", "Volkswagen", "Nissan", "Audi", "Mercedes-Benz", "BMW", "Peugeot", "Toyota" ],
    "separateSpecialChoices": true,
    "showClearButton": true
  }]
};

const survey = new Model(surveyJson);
survey.onComplete.add(function (sender, options) {
  // Display the "Saving..." message (pass a string value to display a custom message)
  options.showSaveInProgress();
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "databaselink");
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  xhr.onload = xhr.onerror = function () {
    if (xhr.status == 200) {
      // Display the "Success" message (pass a string value to display a custom message)
      options.showSaveSuccess();
      // Alternatively, you can clear all messages:
      // options.clearSaveMessages();
    } else {
      // Display the "Error" message (pass a string value to display a custom message)
      options.showSaveError();
    }
  };
  xhr.send(JSON.stringify(sender.data));
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'survey-app';
  surveyModel: any;

  ngOnInit() {
    const survey = new Model(surveyJson);
    this.surveyModel = survey;
  }
}
