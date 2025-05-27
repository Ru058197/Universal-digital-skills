
document.addEventListener("DOMContentLoaded", () => {
  const skills = [
    "analytical", "communication", "conflict", "adaptability",
    "python", "javascript", "sql", "cybersecurity"
  ];

  const resultsContainer = document.getElementById("dashboard-results");

  skills.forEach(skill => {
    const score = localStorage.getItem(skill) || "Not Attempted";
    const card = document.createElement("div");
    card.className = "skill-card";
    card.innerHTML = `<strong>${skill.charAt(0).toUpperCase() + skill.slice(1)}</strong><br/><span>${score}</span>`;
    resultsContainer.appendChild(card);
  });
});
