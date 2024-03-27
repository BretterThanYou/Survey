import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  },
  {
    "type": "radiogroup",
    "name": "major",
    "title": "Which is your major at Queensborough Community College?",
    "isRequired": true,
    "colCount": 1,
    "choices": [ "Computer Science", "Internet and Information Technology", "Computer Science and Information Security", "Computer Engineering Technology", "Computer Information Systems", "Cybersecurity" ],
    "separateSpecialChoices": true,
    "showClearButton": true
  },
  {
    "type": "radiogroup",
    "name": "favoritelanguage",
    "title": "What is your favorite computer language?",
    "isRequired": true,
    "colCount": 1,
    "choices": [ "HTML", "CSS", "Javascript", "Python", "C++", "C", "C#", "Java", "Ruby", "SQL", "Swift", "Kotlin", "GoLang", "Rust", "PHP", "R" ],
    "separateSpecialChoices": true,
    "showClearButton": true
  },
  {
    "type": "radiogroup",
    "name": "job",
    "title": "What type of job would you like after you graduate?",
    "isRequired": true,
    "colCount": 1,
    "choices": [ "Software Engineer", "Fullstack Web Developer", "Database Administrator", "Cybersecurity Analyst", "Network Engineer", "Mobile App Developer", "Artificial Intelligence Engineer", "User Interface Developer", "Computer Hardware Engineer", "Video game Developer"],
    "separateSpecialChoices": true,
    "showClearButton": true
  }
]
};

// const survey = new Model(surveyJson);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'survey-app';
  surveyModel: any;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object){
    this.isBrowser  = isPlatformBrowser(this.platformId);

  }
  ngOnInit() {
    const survey = new Model(surveyJson);
    survey.onComplete.add(function (sender, options) {
      //Display the "Saving..." message (pass a string value to display a custom message)
      options.showSaveInProgress();
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://nk82oxoc68.execute-api.us-east-1.amazonaws.com/default/DynamoDB-Access");
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
      xhr.send(JSON.stringify({}));
      let derp = JSON.stringify(sender.data);
      debugger
    });
    this.surveyModel = survey;
  }
}
