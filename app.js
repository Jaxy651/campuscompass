// Campus Compass demo knowledge base.
// Replace these sample entries and links with verified information for your university.
const knowledgeBase = [
  { id: 'printing', title: 'Where can I print on campus?', keywords: ['print', 'printing', 'printer', 'photocopy', 'copy'], summary: 'You can print from the self-service printers in the Main Library and Student Commons. The Main Library printers are on the ground floor beside the help desk; the Commons printer is next to the computer lab.', steps: ['Sign in to a campus computer or use the library print portal.', 'Upload your document and choose black-and-white or colour.', 'Release your print job at a printer using your student card.'], sources: [{ label: 'Library printing guide', url: 'https://example.edu/library/printing' }, { label: 'IT help desk', url: 'https://example.edu/it/printing-help' }], confidence: 'Campus guide · Updated this semester' },
  { id: 'deadline', title: 'I missed a deadline. What should I do?', keywords: ['missed', 'deadline', 'late', 'extension', 'assignment', 'submit', 'extenuating', 'coursework'], summary: 'Contact your course instructor as soon as possible and check your faculty’s late-submission policy. If illness or an unexpected event affected your work, the student support office can explain the formal extension or extenuating-circumstances process.', steps: ['Email your instructor with your course name, assignment, and a brief explanation.', 'Check the policy and form for your faculty before submitting a request.', 'Contact Student Support if you need help with the process or supporting documents.'], sources: [{ label: 'Academic deadlines & extensions', url: 'https://example.edu/academics/extensions' }, { label: 'Student Support', url: 'https://example.edu/students/support' }], confidence: 'Academic policy · Check your faculty rules' },
  { id: 'study-room', title: 'How do I book a study room?', keywords: ['study room', 'room', 'book', 'reserve', 'reservation', 'group study', 'library space'], summary: 'Group study rooms in the Main Library can be reserved online by current students. You’ll need your university login, and availability is shown on the library booking calendar.', steps: ['Open the library room-booking page and sign in with your student account.', 'Choose a room, date, and available time slot.', 'Check the confirmation email for room details and cancellation instructions.'], sources: [{ label: 'Book a library study room', url: 'https://example.edu/library/rooms' }, { label: 'Library opening hours', url: 'https://example.edu/library/hours' }], confidence: 'Library guide · Updated this semester' },
  { id: 'dining', title: 'Where can I find campus dining hours?', keywords: ['food', 'dining', 'eat', 'cafe', 'cafeteria', 'hours', 'meal', 'lunch'], summary: 'The Student Commons café and North Hall dining room post their current hours on the campus dining page. Hours can change during weekends, holidays, and academic breaks, so check the live schedule before you go.', steps: ['Open the campus dining page for today’s hours and location details.', 'Check the notice at each venue for holiday or temporary changes.'], sources: [{ label: 'Campus dining & hours', url: 'https://example.edu/campus/dining' }], confidence: 'Campus services · Hours may change' },
  { id: 'counselling', title: 'How do I contact student wellbeing support?', keywords: ['wellbeing', 'well-being', 'counselling', 'counseling', 'mental health', 'stress', 'support', 'crisis'], summary: 'Student Wellbeing offers confidential support and can help you find the right next step. For urgent or immediate danger, contact local emergency services or go to the nearest emergency department.', steps: ['Visit the Student Wellbeing page to see appointment options and current availability.', 'If you are unsure where to start, contact the student support desk and ask for a wellbeing referral.'], sources: [{ label: 'Student Wellbeing', url: 'https://example.edu/students/wellbeing' }, { label: 'Urgent support information', url: 'https://example.edu/students/urgent-support' }], confidence: 'Student services · Confirm current availability' },
  { id: 'transit', title: 'How do I get to campus by public transport?', keywords: ['bus', 'transit', 'transport', 'shuttle', 'commute', 'train', 'parking', 'get to campus'], summary: 'The university transit page lists shuttle routes, public transport options, and accessible travel information. Check the operator’s live timetable for service changes before travelling.', steps: ['Choose your campus on the transit page to see routes and stops.', 'Check live departures and service alerts with the local transport operator.', 'For accessible travel or parking questions, contact Campus Services.'], sources: [{ label: 'Getting to campus', url: 'https://example.edu/campus/transit' }], confidence: 'Campus guide · Verify live schedules' }
];

const form = document.querySelector('#questionForm');
const input = document.querySelector('#questionInput');
const answerSection = document.querySelector('#answerSection');
const toast = document.querySelector('#toast');
let toastTimer;

function normalize(value) { return value.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ').trim(); }
function findAnswer(question) {
  const query = normalize(question);
  if (!query) return null;
  const words = query.split(' ').filter(word => word.length > 2);
  let best = null;
  let bestScore = 0;
  for (const entry of knowledgeBase) {
    let score = 0;
    const title = normalize(entry.title);
    if (query.includes(title) || title.includes(query)) score += 5;
    for (const keyword of entry.keywords) {
      const normalizedKeyword = normalize(keyword);
      if (query.includes(normalizedKeyword)) score += normalizedKeyword.includes(' ') ? 3 : 2;
    }
    for (const word of words) if (entry.keywords.some(key => normalize(key).split(' ').includes(word))) score += 0.5;
    if (score > bestScore) { best = entry; bestScore = score; }
  }
  return bestScore >= 2 ? best : null;
}
function renderAnswer(question) {
  const entry = findAnswer(question);
  answerSection.hidden = false;
  if (!entry) {
    answerSection.innerHTML = `<article class="answer-card"><div class="answer-top"><div class="answer-badge"><span>✳</span> CAMPUS COMPASS</div><span class="confidence">No verified match yet</span></div><h3>I don’t have a reliable answer for that yet.</h3><p class="unknown-note">I couldn’t find this in the campus information available to me. I don’t want to guess. Try a different wording, browse a topic below, or check with the relevant university office.</p><div class="answer-actions"><button type="button" data-action="suggest">Suggest this question</button><button type="button" data-action="clear">Ask another question</button></div></article>`;
  } else {
    const sources = entry.sources.map(source => `<a class="source-link" href="${source.url}" target="_blank" rel="noopener noreferrer">↗ ${source.label}</a>`).join('');
    const steps = entry.steps.length ? `<ol>${entry.steps.map(step => `<li>${step}</li>`).join('')}</ol>` : '';
    answerSection.innerHTML = `<article class="answer-card"><div class="answer-top"><div class="answer-badge"><span>✳</span> CAMPUS COMPASS</div><span class="confidence">${entry.confidence}</span></div><h3>${entry.title}</h3><p>${entry.summary}</p>${steps}<div class="source-list"><span>OFFICIAL CAMPUS SOURCES</span><div>${sources}</div></div><div class="answer-actions"><button type="button" data-action="helpful">♡ Helpful</button><button type="button" data-action="suggest">Report an issue</button></div></article>`;
  }
  answerSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
form.addEventListener('submit', event => { event.preventDefault(); const question = input.value.trim(); if (!question) { input.focus(); return; } renderAnswer(question); });
document.querySelectorAll('[data-question]').forEach(button => button.addEventListener('click', () => { input.value = button.dataset.question; renderAnswer(input.value); }));
function showToast(message) { toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2800); }
answerSection.addEventListener('click', event => { const action = event.target.closest('[data-action]')?.dataset.action; if (!action) return; if (action === 'clear') { input.value = ''; input.focus(); answerSection.hidden = true; } else if (action === 'helpful') showToast('Thanks — your feedback helps improve campus answers.'); else showToast('Thanks! This demo would send your suggestion to the campus info team.'); });
document.querySelector('#campusButton').addEventListener('click', () => showToast('Campus switching is ready to connect to your university directory.'));
document.querySelector('#contributeButton').addEventListener('click', () => showToast('Thanks! A campus information submission form can be connected here.'));
document.querySelector('#helpButton').addEventListener('click', () => showToast('Ask a question or choose one of the examples to get started.'));
document.querySelector('#sourceInfo').addEventListener('click', event => { event.preventDefault(); showToast('Answers in this demo come from a small sample campus knowledge base.'); });
document.querySelector('#allTopics').addEventListener('click', event => { event.preventDefault(); showToast('More campus topics can be added as the knowledge base grows.'); });
