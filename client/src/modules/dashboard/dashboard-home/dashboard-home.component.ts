import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {

  constructor() { }

  chartData = [
    {
      data: [330, 600, 260, 700],
      label: 'Project Euthopia',
      fill: true
    },
    {
      data: [120, 455, 100, 340],
      label: 'Campaign Colombia',
      fill: true
    },
    {
      data: [45, 67, 800, 500],
      label: 'Coffee Sales',
      fill: true
    }
  ]

  chartLabels = [
    'January',
    'February',
    'March',
    'April'
  ];

  chartOptions = {
    responsive: true
  }

  chartColors = [
    {
      borderColor: 'black',
      backgroundColor: '#4e73df',
    },
  ]

  ngOnInit(): void {
  }

}
