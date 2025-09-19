// Clinically Validated Mental Health Assessments
// PHQ-9 (Patient Health Questionnaire-9) for Depression
// GAD-7 (Generalized Anxiety Disorder-7) for Anxiety

export const assessmentData = {
  phq9: {
    title: "PHQ-9 Depression Screening",
    description: "The PHQ-9 is a clinically validated tool for screening, diagnosing, monitoring and measuring the severity of depression.",
    instructions: "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
    timeframe: "Past 2 weeks",
    questions: [
      {
        id: 1,
        text: "Little interest or pleasure in doing things",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" }
        ]
      },
      {
        id: 2,
        text: "Feeling down, depressed, or hopeless",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" }
        ]
      },
      {
        id: 3,
        text: "Trouble falling or staying asleep, or sleeping too much",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" }
        ]
      },
      {
        id: 4,
        text: "Feeling tired or having little energy",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" }
        ]
      },
      {
        id: 5,
        text: "Poor appetite or overeating",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" }
        ]
      },
      {
        id: 6,
        text: "Feeling bad about yourself - or that you are a failure or have let yourself or your family down",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" }
        ]
      },
      {
        id: 7,
        text: "Trouble concentrating on things, such as reading the newspaper or watching television",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" }
        ]
      },
      {
        id: 8,
        text: "Moving or speaking so slowly that other people could have noticed. Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" }
        ]
      },
      {
        id: 9,
        text: "Thoughts that you would be better off dead, or of hurting yourself in some way",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" }
        ]
      }
    ],
    scoring: {
      ranges: [
        {
          min: 0,
          max: 4,
          severity: "Minimal",
          color: "green",
          description: "Minimal depression symptoms",
          recommendations: [
            "Your responses suggest minimal depression symptoms",
            "Continue maintaining good mental health practices",
            "Regular exercise, healthy sleep, and social connections are beneficial",
            "Consider mindfulness or stress-reduction techniques"
          ],
          showEmergencyContact: false
        },
        {
          min: 5,
          max: 9,
          severity: "Mild",
          color: "yellow",
          description: "Mild depression symptoms",
          recommendations: [
            "Your responses suggest mild depression symptoms",
            "Consider speaking with a healthcare professional or counselor",
            "Maintain regular exercise and social activities",
            "Monitor your symptoms and seek help if they worsen",
            "Practice stress management and self-care techniques"
          ],
          showEmergencyContact: false
        },
        {
          min: 10,
          max: 14,
          severity: "Moderate",
          color: "orange",
          description: "Moderate depression symptoms",
          recommendations: [
            "Your responses suggest moderate depression symptoms",
            "It's important to speak with a mental health professional",
            "Consider therapy, counseling, or psychiatric evaluation",
            "Maintain support from family and friends",
            "Regular exercise and healthy lifestyle choices are crucial"
          ],
          showEmergencyContact: true
        },
        {
          min: 15,
          max: 19,
          severity: "Moderately Severe",
          color: "red",
          description: "Moderately severe depression symptoms",
          recommendations: [
            "Your responses suggest moderately severe depression symptoms",
            "Immediate consultation with a mental health professional is recommended",
            "Consider comprehensive treatment including therapy and/or medication",
            "Ensure you have strong support systems in place",
            "Monitor closely for any worsening of symptoms"
          ],
          showEmergencyContact: true
        },
        {
          min: 20,
          max: 27,
          severity: "Severe",
          color: "red",
          description: "Severe depression symptoms",
          recommendations: [
            "Your responses suggest severe depression symptoms",
            "Immediate professional help is strongly recommended",
            "Contact a mental health professional or your doctor right away",
            "Consider intensive treatment options",
            "Ensure you have 24/7 support available"
          ],
          showEmergencyContact: true
        }
      ]
    }
  },
  
  gad7: {
    title: "GAD-7 Anxiety Screening",
    description: "The GAD-7 is a clinically validated tool for screening and measuring the severity of generalized anxiety disorder.",
    instructions: "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
    timeframe: "Past 2 weeks",
    questions: [
      {
        id: 1,
        text: "Feeling nervous, anxious, or on edge",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" }
        ]
      },
      {
        id: 2,
        text: "Not being able to stop or control worrying",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" }
        ]
      },
      {
        id: 3,
        text: "Worrying too much about different things",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" }
        ]
      },
      {
        id: 4,
        text: "Trouble relaxing",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" }
        ]
      },
      {
        id: 5,
        text: "Being so restless that it is hard to sit still",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" }
        ]
      },
      {
        id: 6,
        text: "Becoming easily annoyed or irritable",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" }
        ]
      },
      {
        id: 7,
        text: "Feeling afraid, as if something awful might happen",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" }
        ]
      }
    ],
    scoring: {
      ranges: [
        {
          min: 0,
          max: 4,
          severity: "Minimal",
          color: "green",
          description: "Minimal anxiety symptoms",
          recommendations: [
            "Your responses suggest minimal anxiety symptoms",
            "Continue maintaining healthy stress management practices",
            "Regular relaxation techniques can be beneficial",
            "Physical exercise is excellent for managing anxiety"
          ],
          showEmergencyContact: false
        },
        {
          min: 5,
          max: 9,
          severity: "Mild",
          color: "yellow",
          description: "Mild anxiety symptoms",
          recommendations: [
            "Your responses suggest mild anxiety symptoms",
            "Consider learning stress management and relaxation techniques",
            "Regular exercise and mindfulness can be helpful",
            "Monitor your symptoms and seek professional help if they worsen",
            "Practice deep breathing and grounding exercises"
          ],
          showEmergencyContact: false
        },
        {
          min: 10,
          max: 14,
          severity: "Moderate",
          color: "orange",
          description: "Moderate anxiety symptoms",
          recommendations: [
            "Your responses suggest moderate anxiety symptoms",
            "Consider speaking with a mental health professional",
            "Cognitive-behavioral therapy (CBT) can be very effective for anxiety",
            "Practice regular relaxation and mindfulness techniques",
            "Maintain healthy lifestyle habits including regular sleep and exercise"
          ],
          showEmergencyContact: true
        },
        {
          min: 15,
          max: 21,
          severity: "Severe",
          color: "red",
          description: "Severe anxiety symptoms",
          recommendations: [
            "Your responses suggest severe anxiety symptoms",
            "Professional help is strongly recommended",
            "Contact a mental health professional or your doctor",
            "Consider comprehensive treatment including therapy and/or medication",
            "Ensure you have support systems available"
          ],
          showEmergencyContact: true
        }
      ]
    }
  }
};

// Utility functions for scoring and classification
export const calculateScore = (answers, assessmentType) => {
  const total = Object.values(answers).reduce((sum, value) => sum + value, 0);
  return total;
};

export const classifyScore = (score, assessmentType) => {
  const assessment = assessmentData[assessmentType];
  const range = assessment.scoring.ranges.find(
    range => score >= range.min && score <= range.max
  );
  return range;
};

export const shouldShowEmergencyContact = (score, assessmentType) => {
  const classification = classifyScore(score, assessmentType);
  return classification?.showEmergencyContact || false;
};

// Check if user needs to complete any assessment
export const getIncompleteAssessments = (userAssessments) => {
  const allAssessments = ['phq9', 'gad7'];
  const incomplete = allAssessments.filter(assessment => {
    // Consider assessment complete if it's either completed OR skipped
    const assessmentData = userAssessments && userAssessments[assessment];
    return !assessmentData || 
           (!assessmentData.completed && !assessmentData.skipped);
  });
  return incomplete;
};

export const getNextAssessment = (userAssessments) => {
  const incomplete = getIncompleteAssessments(userAssessments);
  return incomplete.length > 0 ? incomplete[0] : null;
};