import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import {
  ArcElement,
  Chart,
  PieController,
  registerables,
  Title,
  Tooltip,
} from 'chart.js';
import { IChartData } from '@shared/models/IChartData';
import { of } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input()
  set chartData(data: IChartData) {
    if (!data) {
      return;
    }
    this._chartData = data;
    this.onCanvasDataUpdate();
  }
  private _chartData: IChartData = {
    data: [1337],
    labels: ['Loading...'],
  };
  chartCanvas!: HTMLCanvasElement;
  chart!: any;
  colors = [
    '#004691',
    '#5a469a',
    '#8f4298',
    '#ba3c8c',
    '#db3e78',
    '#f14e5f',
    '#fa6942',
    '#f78821',
  ];

  constructor() {}

  ngOnInit() {
    Chart.register(...registerables);
    // @ts-ignore
    this.chartCanvas = document.getElementById('chart-canvas');
    this.chart = new Chart(this.chartCanvas, {
      type: 'pie',
      data: {
        labels: ['Loading...'],
        datasets: [
          {
            backgroundColor: this.colors,
            data: [],
          },
        ],
      },
    });
  }

  get wrappedChartData() {
    return {
      labels: this._chartData.labels,
      datasets: [
        {
          backgroundColor: this.colors,
          data: this._chartData.data,
        },
      ],
    };
  }

  onCanvasDataUpdate() {
    if (!this._chartData?.labels?.length) {
      return;
    }
    this.chart.data = this.wrappedChartData;
    this.chart.update();
  }
}
