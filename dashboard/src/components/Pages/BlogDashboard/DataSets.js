export const graphDataSets = {
  labels: ["April", "May", "June", "July", "August", "September"],
  datasets: [
    {
      label: "Users 2020",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: ["rgba(255, 99, 132, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)"],
      borderWidth: 1,
    },
    {
      label: "Users 2019",
      data: [15, 12, 5, 2, 9, 7],
      backgroundColor: ["rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
  ],
};

export const graphOptions = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export const cardDataSets = [
  {
    label: "POSTS",
    value: "2,315",
    percent: "81.25%",
    type: "positive",
    datasets: [
      {
        label: "POSTS",
        data: [4, 1, 2, 3, 6],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  },
  {
    label: "PAGES",
    value: "3,315",
    percent: "19.25%",
    type: "negative",
    datasets: [
      {
        label: "PAGES",
        data: [1, 5, 3, 6, 7],
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  },
  {
    label: "COMMENTS",
    value: "2,995",
    percent: "41.25%",
    type: "positive",
    datasets: [
      {
        label: "COMMENTS",
        data: [1, 2, 8, 4, 0],
        backgroundColor: ["rgb(255, 255, 77, 0.4)"],
        borderColor: ["rgba(255, 255, 77)"],
        borderWidth: 1,
      },
    ],
  },
  {
    label: "SUBSCRIBERS",
    value: "5,315",
    percent: "58.25%",
    type: "negative",
    datasets: [
      {
        label: "SUBSCRIBERS",
        data: [2, 4, 2, 4, 2],
        backgroundColor: ["rgb(102, 255, 102, 0.4)"],
        borderColor: ["rgb(102, 255, 102)"],
        borderWidth: 1,
      },
    ],
  },
];

export const cardOptions = {
  legend: {
    display: false,
  },
  tooltips: {
    callbacks: {
      label: function (tooltipItem) {
        return tooltipItem.yLabel;
      },
    },
  },
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        ticks: {
          display: false,
        },
        gridLines: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          display: false,
        },
        gridLines: {
          display: false,
        },
      },
    ],
  },
};

export const pieChartDataSets = {
  labels: ["Desktop", "Tablet", "Mobile"],
  datasets: [
    {
      label: "Users 2020",
      data: [12, 19, 9],
      backgroundColor: [
        "rgba(54, 162, 235, 0.1)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(54, 162, 235, 0.2)",
      ],
      borderColor: [
        "rgba(54, 162, 235, 0.1)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(54, 162, 235, 0.2)",
      ],
      borderWidth: 1,
    },
  ],
};

export const pieChartOptions = {
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        ticks: {
          display: false,
        },
        gridLines: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          display: false,
        },
        gridLines: {
          display: false,
        },
      },
    ],
  },
};
