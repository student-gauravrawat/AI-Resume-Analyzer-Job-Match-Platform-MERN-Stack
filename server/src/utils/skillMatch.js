import natural from "natural"
import stopword from "stopword"


function extractSkills(text, allowedSkills){
  const tokenizer = new natural.WordTokenizer()
  let words = tokenizer.tokenize(text.toLowerCase())
  words = stopword.removeStopwords(words)

  return allowedSkills.filter((skill)=> words.includes(skill))
  
}

export function skillMatch(resumeText, jdText, roleSkills){
   const resumeSkills = extractSkills(resumeText, roleSkills);
   const jdSkills = extractSkills(jdText, roleSkills);

   const matched = resumeSkills.filter(skill => jdSkills.includes(skill))
   const missing = jdSkills.filter(skill => !resumeSkills.includes(skill))

   const score = jdSkills.length 
   ? Math.round( (matched.length / jdSkills.length) * 100 ) // ( 2/3 ) * 100 = 66.66 => 67, score will be 67
   : 0;

   return { resumeSkills, jdSkills, matched, missing, score };
}
