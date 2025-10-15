document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("reviewTrack");
  if (!track) return;

  // Clone every child once to create a perfect loop (A + A)
  const originals = Array.from(track.children);
  originals.forEach(card => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true"); // keep screen readers happy
    track.appendChild(clone);
  });
});

// ============================================
// Loader fade-out animation
// ============================================
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  if (!loader) return;

  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500); // matches CSS transition (0.5s)
  }, 1000); // stays for 1s before fade
});

// ============================================
// Fetch live trading performance data (API)
// ============================================
window.addEventListener("load", function () {
  const fallback = {
    daily: 0.46,
    weekly: 3.91,
    monthly: 17.13,
  };

  // Function to update displayed values
  const updateValues = (data) => {
    document.getElementById("dailyValue").textContent =
      data.daily.toFixed(2) + "%";
    document.getElementById("weeklyValue").textContent =
      data.weekly.toFixed(2) + "%";
    document.getElementById("monthlyValue").textContent =
      data.monthly.toFixed(2) + "%";
  };

  // Function to fetch live data
  const fetchLiveStats = () => {
    fetch("http://78.141.201.40:3000/trade/global-stats")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        console.log("✅ Live stats received:", data);
        // API already returns percentages, not decimals — no multiply
        updateValues({
          daily: data.daily ?? fallback.daily,
          weekly: data.weekly ?? fallback.weekly,
          monthly: data.monthly ?? fallback.monthly,
        });
      })
      .catch((err) => {
        console.warn("⚠️ API error, using fallback:", err);
        updateValues(fallback);
      });
  };

  // Initial render + auto-refresh every 10s
  updateValues(fallback);
  fetchLiveStats();
  setInterval(fetchLiveStats, 10000);
});
