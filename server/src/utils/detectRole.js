import roles from "./skillsByRole.json" with { type: "json" };

export function detectRole(jdText) {
  const text = jdText.toLowerCase();
  let bestRole = "unknown";
  let maxScore = 0;

  for (const role in roles) {
    let score = 0;

    for (const keyword of roles[role].keywords) {
      if (text.includes(keyword)) {
        score++;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestRole = role;
    }
  }

  return maxScore > 0 ? bestRole : "unknown";
}


