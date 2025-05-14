
// Placeholder question sets (can be expanded later)
const delegationQuestions = [
  { question: "How do you assign tasks?", answers: [{ text: "Strategically", score: 1 }, { text: "Randomly", score: 0 }] }
];
const ethicsQuestions = [
  { question: "How do you handle ethical dilemmas?", answers: [{ text: "Follow principles", score: 1 }, { text: "Look the other way", score: 0 }] }
];
const communicationQuestions = [
  { question: "What’s key to great communication?", answers: [{ text: "Clarity", score: 1 }, { text: "Guesswork", score: 0 }] }
];
const timeManagementQuestions = [
  { question: "How do you prioritize tasks?", answers: [{ text: "By impact and urgency", score: 1 }, { text: "At random", score: 0 }] }
];
const projectManagementQuestions = [
  { question: "What defines successful project management?", answers: [{ text: "Planning and delivery", score: 1 }, { text: "Guessing", score: 0 }] }
];
const problemSolvingQuestions = [
  { question: "How do you solve problems?", answers: [{ text: "Structured thinking", score: 1 }, { text: "Panic", score: 0 }] }
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
  if (skill === 'communication') currentSkillQuestions = communicationQuestions;
  if (skill === 'timeManagement') currentSkillQuestions = timeManagementQuestions;
  if (skill === 'projectManagement') currentSkillQuestions = projectManagementQuestions;
  if (skill === 'problemSolving') currentSkillQuestions = problemSolvingQuestions;

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
