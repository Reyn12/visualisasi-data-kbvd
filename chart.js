const data = [
  {
    No: 1,
    NIM: 613091003,
    Quiz: 80,
    Tugas: 80,
    UTS: 56,
    UAS: 78,
    NilaiAkhir: 69.6,
  },
  {
    No: 2,
    NIM: 613120057,
    Quiz: 30,
    Tugas: 56,
    UTS: 64,
    UAS: 45,
    NilaiAkhir: 52.2,
  },
  {
    No: 3,
    NIM: 613090071,
    Quiz: 69,
    Tugas: 78,
    UTS: 67,
    UAS: 35,
    NilaiAkhir: 55.5,
  },
  {
    No: 4,
    NIM: 613120058,
    Quiz: 87,
    Tugas: 57,
    UTS: 78,
    UAS: 67,
    NilaiAkhir: 72.4,
  },
  {
    No: 5,
    NIM: 613120067,
    Quiz: 34,
    Tugas: 67,
    UTS: 89,
    UAS: 87,
    NilaiAkhir: 80.5,
  },
  {
    No: 6,
    NIM: 613120059,
    Quiz: 34,
    Tugas: 35,
    UTS: 35,
    UAS: 45,
    NilaiAkhir: 38.9,
  },
  {
    No: 7,
    NIM: 613120050,
    Quiz: 67,
    Tugas: 64,
    UTS: 46,
    UAS: 35,
    NilaiAkhir: 45.5,
  },
  {
    No: 8,
    NIM: 613120100,
    Quiz: 35,
    Tugas: 35,
    UTS: 46,
    UAS: 46,
    NilaiAkhir: 43.8,
  },
  {
    No: 9,
    NIM: 613120048,
    Quiz: 57,
    Tugas: 25,
    UTS: 46,
    UAS: 56,
    NilaiAkhir: 49,
  },
  {
    No: 10,
    NIM: 613120044,
    Quiz: 35,
    Tugas: 89,
    UTS: 46,
    UAS: 67,
    NilaiAkhir: 57.6,
  },
];

// Fungsi untuk membuat grafik
function createChart() {
  const options = {
    series: [
      {
        name: "Quiz",
        data: data.map((item) => item.Quiz),
      },
      {
        name: "Tugas",
        data: data.map((item) => item.Tugas),
      },
      {
        name: "UTS",
        data: data.map((item) => item.UTS),
      },
      {
        name: "UAS",
        data: data.map((item) => item.UAS),
      },
    ],
    chart: {
      type: "bar",
      height: 350,
      stacked: true, // Aktifkan stacking
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        borderRadiusWhenStacked: "last", // Pengaturan untuk radius
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {
      categories: data.map((item) => item.NIM), // NIM sebagai kategori
    },
    legend: {
      position: "right",
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
    title: {
      text: "Nilai Quiz, Tugas, UTS, UAS, Nilai Akhir",
      align: "center",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
  };

  const chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}

// Mengisi tabel dengan data
function populateTable() {
  const tableBody = document.querySelector("tbody");
  data.forEach((item, index) => {
    const row = document.createElement("tr");
    row.className =
      index % 2 === 0 ? "bg-blue-500 text-white" : "bg-blue-100 text-black"; // Mengatur warna berdasarkan indeks
    row.innerHTML = `
            <td class="py-2 px-4">${item.No}</td>
            <td class="py-2 px-4">${item.NIM}</td>
            <td class="py-2 px-4">${item.Quiz}</td>
            <td class="py-2 px-4">${item.Tugas}</td>
            <td class="py-2 px-4">${item.UTS}</td>
            <td class="py-2 px-4">${item.UAS}</td>
            <td class="py-2 px-4">${item.NilaiAkhir}</td>
        `;
    tableBody.appendChild(row);
  });
}

function renderPassFailChart(data) {
  const passCount = data.filter(student => student.NilaiAkhir >= 60).length;
  const failCount = data.filter(student => student.NilaiAkhir < 60).length;

  const options = {
      series: [passCount, failCount],
      chart: {
          type: 'pie',
          height: 300
      },
      labels: ['Lulus', 'Tidak Lulus'],
      colors: ['#4CAF50', '#F44336'],
      title: {
          text: 'Patokan Nilai Akhir = 60', 
          align: 'center'
      },
  };

  const chart = new ApexCharts(document.querySelector('#passFailChart'), options);
  chart.render();
}

function nilaiUtsUas() {
  // Assuming your existing data is stored in a variable called 'data'
  const nimList = data.map(student => student.NIM); // Extract NIMs
  const utsScores = data.map(student => student.UTS); // Extract UTS scores
  const uasScores = data.map(student => student.UAS); // Extract UAS scores

  var options = {
    series: [
      {
        name: 'UTS',
        data: utsScores
      },
      {
        name: 'UAS',
        data: uasScores
      }
    ],
    chart: {
      height: 350,
      type: 'bar',
    },
    title: {
      text: 'Nilai UTS dan UAS',
      align: 'center'
    },
    xaxis: {
      categories: nimList,
    },
    yaxis: {
      title: {
        text: 'Nilai'
      }
    },
    legend: {
      position: 'top'
    },
    dataLabels: {
      enabled: false // Disable data labels
    }
  };

  var chart = new ApexCharts(document.querySelector("#nilaiUtsUas"), options);
  chart.render();
}

// Panggil fungsi untuk membuat grafik
createChart();
populateTable();
renderPassFailChart(data);
nilaiUtsUas();