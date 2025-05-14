
const delegationQuestions = [
  {
    question: "You’re overwhelmed with tasks. What do you do first?",
    answers: [
      { text: "Decide what I can delegate and to whom.", score: 1 },
      { text: "Do it all myself to stay in control.", score: 0 }
    ]
  },
  {
    question: "Someone on your team makes a mistake on a task you delegated. What’s your reaction?",
    answers: [
      { text: "Coach them to learn from it.", score: 1 },
      { text: "Take it back and fix it myself.", score: 0 }
    ]
  },
  {
    question: "How often do you follow up after delegating?",
    answers: [
      { text: "I check in periodically and offer support.", score: 1 },
      { text: "I wait until the deadline to see the result.", score: 0 }
    ]
  }
];

const ethicsQuestions = [
  {
    question: "You see a coworker take credit for someone else's work. What do you do?",
    answers: [
      { text: "Raise it privately or with a supervisor.", score: 1 },
      { text: "Stay out of it — not my problem.", score: 0 }
    ]
  },
  {
    question: "You’re asked to bend the rules slightly for a client. How do you respond?",
    answers: [
      { text: "I politely refuse and explain the policy.", score: 1 },
      { text: "I do it anyway to keep them happy.", score: 0 }
    ]
  },
  {
    question: "You find a mistake in data that supports a decision. What do you do?",
    answers: [
      { text: "Report it and fix the decision.", score: 1 },
      { text: "Ignore it — it helps my case.", score: 0 }
    ]
  }
];

let currentSkillQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

const questionSection = document.getElementById("question-section");
const questionText = document.getElementById("question-text");
const answerOptions = document.getElementById("answer-options");
const nextBtn = document.getElementById("next-btn");
const resultSection = document.getElementById("result-section");
const resultDescription = document.getElementById("result-description");
const downloadLink = document.getElementById("download-results");

function startSkill(skill) {
  document.getElementById("skill-select").style.display = "none";
  questionSection.style.display = "block";
  currentQuestionIndex = 0;
  score = 0;

  if (skill === 'delegation') currentSkillQuestions = delegationQuestions;
  if (skill === 'ethics') currentSkillQuestions = ethicsQuestions;

  showQuestion();
}

function showQuestion() {
  const current = currentSkillQuestions[currentQuestionIndex];
  questionText.innerText = current.question;
  answerOptions.innerHTML = "";
  current.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.innerText = answer.text;
    btn.addEventListener("click", () => selectAnswer(answer.score));
    answerOptions.appendChild(btn);
  });
}

function selectAnswer(answerScore) {
  score += answerScore;
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  nextBtn.style.display = "none";
  if (currentQuestionIndex < currentSkillQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionSection.style.display = "none";
  resultSection.style.display = "block";

  const resultText = score >= currentSkillQuestions.length * 0.7
    ? "You demonstrated strong understanding of this skill."
    : "You may benefit from more development in this skill.";

  resultDescription.innerText = resultText;

  const blob = new Blob([resultText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = "certivue-results.txt";
}
