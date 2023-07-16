const tbody = document.getElementById("tbody");
const pagination = document.getElementById("pagination");
let perPage = 5;
let totalPageCount = 0;
let countries = [];
let activePage = 1;
let chart = null;
fetch("https://restcountries.com/v3.1/all")
  .then((a) => a.json())
  .then((a) => {
    countries = a;
    showCountries();
    totalPageCount = Math.ceil(countries.length / perPage); //50
    makePagination();
  });
let arr = [];
let area = [];
const showCountries = () => {
  arr = [];
  area = [];
  let s = (activePage - 1) * perPage;
  let e = s + perPage;
  countries.slice(s, e).map((country, index) => {
    arr.push(country.name.common);
    area.push(country.area);
  });

  var xValues = arr;
  var yValues = area;
  var barColors = ["red", "green", "blue", "orange", "brown"];
  if (!chart) {
    chart = new Chart("myChart", {
      type: "bar",
      data: {
        labels: xValues,
        datasets: [
          {
            backgroundColor: barColors,
            data: yValues,
          },
        ],
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: "Countries",
        },
      },
    });
  } else {
    chart.data.datasets[0].data = yValues;
    chart.data.labels = xValues;
    chart.update();
  }
};
const makePagination = () => {
  pagination.innerHTML = "";
  const firsPage = document.createElement("li");
  firsPage.innerHTML = "&larr;";

  pagination.append(firsPage);
  if (activePage === 1) {
    firsPage.remove();
  }

  const lastPage = document.createElement("li");
  lastPage.innerHTML = "&rarr;";

  let start = activePage - 3 > 0 ? activePage - 3 : 1;
  let end = activePage + 3;

  for (let i = start; i <= end && i <= totalPageCount; i++) {
    let page = document.createElement("li");
    page.textContent = i;

    if (i === activePage) {
      page.classList.add("active");
    }

    firsPage.addEventListener("click", () => {
      activePage = i - 4 > 0 ? i - 4 : 1;
      makePagination();
      showCountries();
    });

    page.addEventListener("click", () => {
      activePage = i;
      makePagination();
      showCountries();
    });

    pagination.append(page);

    lastPage.addEventListener("click", () => {
      activePage = i - 2 > 0 ? i - 2 : 1;
      makePagination();
      showCountries();
    });
    if (activePage === totalPageCount) {
      lastPage.remove();
    }

    pagination.append(lastPage);
  }
};
