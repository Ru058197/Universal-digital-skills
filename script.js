
const questions = [
  {
    question: "You’re assigned a last-minute project with little instruction. What’s your first move?",
    answers: [
      { text: "Gather what info I can and take initiative.", type: "Builder" },
      { text: "Ask others how they’ve done it before.", type: "Collaborator" },
      { text: "Experiment with options to see what works.", type: "Explorer" },
      { text: "Wait for clarification to avoid missteps.", type: "Guardian" }
    ]
  },
  {
    question: "How do you handle conflicting deadlines?",
    answers: [
      { text: "I create a structured timeline and stick to it.", type: "Strategist" },
      { text: "I triage tasks based on priority and flexibility.", type: "Thinker" },
      { text: "I ask my team to help cover where needed.", type: "Collaborator" },
      { text: "I push through the pressure on my own.", type: "Builder" }
    ]
  }
];

let currentQuestionIndex = 0;
const questionSection = document.getElementById("question-section");
const questionText = document.getElementById("question-text");
const answerOptions = document.getElementById("answer-options");
const nextBtn = document.getElementById("next-btn");
const startBtn = document.getElementById("start-btn");
const resultSection = document.getElementById("result-section");
const resultDescription = document.getElementById("result-description");
const profileBadge = document.getElementById("profile-badge");

let scores = {
  Builder: 0,
  Collaborator: 0,
  Explorer: 0,
  Guardian: 0,
  Strategist: 0,
  Thinker: 0
};

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  questionSection.style.display = "block";
  showQuestion();
});

function showQuestion() {
  const current = questions[currentQuestionIndex];
  questionText.innerText = current.question;
  answerOptions.innerHTML = "";
  current.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.innerText = answer.text;
    btn.addEventListener("click", () => selectAnswer(answer.type));
    answerOptions.appendChild(btn);
  });
}

function selectAnswer(type) {
  scores[type]++;
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  nextBtn.style.display = "none";
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionSection.style.display = "none";
  resultSection.style.display = "block";
  const topType = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  const summary = `You are most aligned with the "${topType}" Behavioral Twin profile.`;

  resultDescription.innerText = summary;
  profileBadge.src = `images/${topType.toLowerCase()}.png`;

  // Generate and assign downloadable results
  const blob = new Blob([summary], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.getElementById("download-results");
  downloadLink.href = url;
  downloadLink.download = "certivue-results.txt";
}

}
