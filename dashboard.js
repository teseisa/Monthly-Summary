// Animate the chart bars on page load
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    const currentBars = document.querySelectorAll(
      "#current-month-data .chart-bar"
    );
    currentBars[0].style.width = "75%";
    currentBars[1].style.width = "62%";
    currentBars[2].style.width = "45%";

    const previousBars = document.querySelectorAll(
      "#previous-month-data .chart-bar"
    );
    previousBars[0].style.width = "70%";
    previousBars[1].style.width = "55%";
    previousBars[2].style.width = "38%";
  }, 300);

  // Toggle buttons for comparisons
  const toggleBtns = document.querySelectorAll(".toggle-btn");
  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetElement = document.getElementById(targetId);

      this.classList.toggle("active");
      this.classList.toggle("btn-active")
      targetElement.classList.toggle("show");

      if (this.classList.contains("active")) {
        this.textContent = "Hide Comparison";
      } else {
        this.textContent = this.textContent.replace("Hide", "Show");
      }
    });
  });

  // Month toggle for platform performance
  const monthToggles = document.querySelectorAll(".month-toggle");
  monthToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const month = this.getAttribute("data-month");

      // Update toggle buttons
      monthToggles.forEach((btn) => {
        btn.classList.remove("bg-indigo-600", "text-white");
        btn.classList.add("bg-gray-200");
      });
      this.classList.remove("bg-gray-200");
      this.classList.add("bg-indigo-600", "text-white");

      // Show/hide appropriate data
      if (month === "current") {
        document
          .getElementById("current-month-data")
          .classList.remove("hidden");
        document.getElementById("previous-month-data").classList.add("hidden");
      } else {
        document.getElementById("current-month-data").classList.add("hidden");
        document
          .getElementById("previous-month-data")
          .classList.remove("hidden");

        // Animate previous month bars
        setTimeout(() => {
          const previousBars = document.querySelectorAll(
            "#previous-month-data .chart-bar"
          );
          previousBars[0].style.width = "70%";
          previousBars[1].style.width = "55%";
          previousBars[2].style.width = "38%";
        }, 100);
      }
    });
  });

  // Create mini charts
  createMiniChart(
    "followersChart",
    [19450, 21870, 24582],
    ["June", "July", "August"],
    "rgba(79, 70, 229, 0.8)"
  );
  createMiniChart(
    "engagementChart",
    [4.8, 5.1, 5.8],
    ["June", "July", "August"],
    "rgba(147, 51, 234, 0.8)"
  );
  createMiniChart(
    "reachChart",
    [98.2, 126.5, 156.3],
    ["June", "July", "August"],
    "rgba(225, 29, 72, 0.8)"
  );

  // Create comparison charts
  createComparisonChart("followerGrowthChart", ["June", "July", "August"], {
    Instagram: [10800, 11500, 12400],
    TikTok: [6200, 7500, 8700],
    VGen: [2450, 2900, 3500],
  });

  createComparisonChart("engagementRateChart", ["June", "July", "August"], {
    Instagram: [5.2, 5.6, 6.1],
    TikTok: [4.5, 4.8, 5.7],
    VGen: [3.9, 4.2, 5.1],
  });

  createComparisonChart("postReachChart", ["June", "July", "August"], {
    Instagram: [45.3, 58.2, 72.5],
    TikTok: [32.8, 41.5, 52.3],
    VGen: [20.1, 26.8, 31.5],
  });
});

function createMiniChart(id, data, labels, color) {
  const ctx = document.getElementById(id).getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          borderColor: color,
          backgroundColor: color.replace("0.8", "0.1"),
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        y: {
          display: false,
          beginAtZero: false,
        },
        x: {
          display: true,
          grid: {
            display: false,
          },
        },
      },
    },
  });
}

function createComparisonChart(id, labels, datasets) {
  const ctx = document.getElementById(id).getContext("2d");

  const colors = {
    Instagram: {
      border: "rgba(236, 72, 153, 0.8)",
      background: "rgb(236, 72, 153, 0.1)",
    },
    TikTok: {
      border: "rgba(101, 103, 107, 0.8)",
      background: "rgba(101, 103, 107, 0.1)",
    },
    VGen: {
      border: "rgba(16, 185, 129, 0.8)",
      background: "rgba(16, 185, 129, 0.1)",
    },
  };

  const chartDatasets = [];
  // Prepare datasets
  for (const [platform, data] of Object.entries(datasets)) {
    chartDatasets.push({
      label: platform,
      data: data,
      borderColor: colors[platform].border,
      backgroundColor: colors[platform].background,
      tension: 0.3,
      fill: true,
    });
  }

  // Create the chart
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: chartDatasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            boxWidth: 16,
            boxHeight: 16,
            useBorderRadius: true,
            borderRadius: 8,
            font: {
              size: 10,
            },
          },
        },
      },
      scales: {
        y: {
          display: false,
          beginAtZero: false,
        },
        x: {
          display: true,
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 12,
            },
          },
        },
      },
    },
  });
}

(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement("script");
      d.innerHTML =
        "window.__CF$cv$params={r:'94ed001c91c2ae73',t:'MTc0OTc2OTYwNC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName("head")[0].appendChild(d);
    }
  }
  if (document.body) {
    var a = document.createElement("iframe");
    a.height = 1;
    a.width = 1;
    a.style.position = "absolute";
    a.style.top = 0;
    a.style.left = 0;
    a.style.border = "none";
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    if ("loading" !== document.readyState) c();
    else if (window.addEventListener)
      document.addEventListener("DOMContentLoaded", c);
    else {
      var e = document.onreadystatechange || function () {};
      document.onreadystatechange = function (b) {
        e(b);
        "loading" !== document.readyState &&
          ((document.onreadystatechange = e), c());
      };
    }
  }
})();
