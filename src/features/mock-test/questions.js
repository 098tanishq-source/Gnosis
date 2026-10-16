export const QUESTIONS = [
  {
    text: 'A body starts from rest and accelerates uniformly at 2 m/s². What distance does it travel in 5 s?',
    options: ['10 m', '25 m', '50 m', '100 m'], correct: 1,
    explanation: 'Use s = ut + ½at². With u = 0, s = ½ × 2 × 25 = 25 m.',
    topic: 'Motion in a Straight Line',
  },
  {
    text: 'Which of the following is the dimensional formula of force?',
    options: ['[MLT⁻¹]', '[ML²T⁻²]', '[MLT⁻²]', '[M⁰LT⁻²]'], correct: 2,
    explanation: 'From F = ma, multiply [M] by [LT⁻²] to obtain [MLT⁻²].',
    topic: 'Units and Measurements',
  },
  {
    text: 'A net force of 12 N acts on a body of mass 3 kg. What is its acceleration?',
    options: ['4 m/s²', '9 m/s²', '15 m/s²', '36 m/s²'], correct: 0,
    explanation: 'Newton’s second law gives a = F/m = 12/3 = 4 m/s².',
    topic: 'Laws of Motion',
  },
];
