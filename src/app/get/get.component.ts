import {Component, Inject, OnInit, PLATFORM_ID} from "@angular/core";
import {isPlatformBrowser} from "@angular/common";
import {Chart, ChartItem} from "chart.js/auto";

interface Item {
  job: string,
  major: string,
  favorite_language: string
}

@Component({
  selector: 'app-root',
  templateUrl: './get.component.html',
  styleUrl: './get.component.css'
})
export class GetComponent implements OnInit {
  title = 'survey-app';
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

  }

  ngOnInit() {
    const options = {
      method: 'GET',
      headers: {'Content-type': 'application/json; charset=utf-8'}
    }
    fetch(
      "https://nk82oxoc68.execute-api.us-east-1.amazonaws.com/default/DynamoDB-Access",
      options
    )
      .then(response => response.json())
      .then(tempResponse => {
        const response = tempResponse as Item[];
        const languageData: Map<string, number> = new Map();
        const majorData: Map<string, number> = new Map();
        const jobData: Map<string, number> = new Map();

        response.forEach(item => {
          const favoriteLanguage = item.favorite_language;
          const major = item.major;
          const job = item.job;
          languageData.set(favoriteLanguage, languageData.has(favoriteLanguage) ? <number>languageData.get(favoriteLanguage) + 1 : 1);
          majorData.set(major, majorData.has(major) ? <number>majorData.get(major) + 1 : 1);
          jobData.set(job, jobData.has(job) ? <number>jobData.get(job) + 1 : 1);
        });

        const languages: string[] = Array.from(languageData.keys())
        const jobs: string[] = Array.from(jobData.keys())
        const majorToLanguage: Map<string, number[]> = new Map();
        const majorToJob: Map<string, number[]> = new Map();
        response.forEach(item => {
          const languageArray = majorToLanguage.get(item.major) ?? Array(languages.length).fill(0);
          const languagesIndex = languages.findIndex(it => it == item.favorite_language);
          languageArray[languagesIndex] += 1;
          majorToLanguage.set(item.major, languageArray);

          const jobArray = majorToJob.get(item.major) ?? Array(jobs.length).fill(0);
          const jobsIndex = jobs.findIndex(it => it == item.job);
          jobArray[jobsIndex] += 1;
          majorToJob.set(item.major, jobArray);
        });

        const ctx1 = <ChartItem>document.getElementById('myChart1');
        this.makeBarChart(ctx1, languageData)
        const ctx2 = <ChartItem>document.getElementById('myChart2');
        this.makeBarChart(ctx2, majorData)
        const ctx3 = <ChartItem>document.getElementById('myChart3');
        this.makeBarChart(ctx3, jobData)
        const ctx4 = <ChartItem>document.getElementById('myChart4');
        this.makeStackedBarChart(ctx4, majorToLanguage, languages)
        const ctx5 = <ChartItem>document.getElementById('myChart5');
        this.makeStackedBarChart(ctx5, majorToJob, jobs)
      });
  }

  makeBarChart(ctx: ChartItem, data: Map<string, number>) {
    const hart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Array.from(data.keys()),
        datasets: [{
          label: '# of Votes',
          data: Array.from(data.values()),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // x axis will be job or language
  // y axis will be count of which major
  // data set is horizontal, so I need a map of major -> [countForJob/Language]
  makeStackedBarChart(ctx: ChartItem, majorData: Map<string, number[]>, types: string[]) {
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: types,
        datasets: Array.from(majorData.entries()).map(it => {
          return {
            label: it[0],
            data: it[1]
          }
        })
      },
      options: {
        plugins: {
          title: {
            display: true,
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      }
    });
  }
}
