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

window.addEventListener("load", function() {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500); // matches the CSS transition (0.5s)
  }, 1000); // stays for 2 seconds before fade
});

// Placeholder for future API integration
// This will later fetch live trading data dynamically

window.addEventListener("load", function() {
  const stats = {
    daily: 0.46,
    weekly: 3.91,
    monthly: 17.13,
  };

  // Simulated update animation
  const updateValues = () => {
    document.getElementById("dailyValue").textContent = stats.daily.toFixed(2) + "%";
    document.getElementById("weeklyValue").textContent = stats.weekly.toFixed(2) + "%";
    document.getElementById("monthlyValue").textContent = stats.monthly.toFixed(2) + "%";
  };

  updateValues();

  // API placeholder for real data
  // fetch("https://api.traider.com/performance")
  //   .then(res => res.json())
  //   .then(data => {
  //     document.getElementById("dailyValue").textContent = data.daily + "%";
  //     document.getElementById("weeklyValue").textContent = data.weekly + "%";
  //     document.getElementById("monthlyValue").textContent = data.monthly + "%";
  //   })
  //   .catch(err => console.error("API error:", err));
});