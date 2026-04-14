// ============================================
// DEFAULT DATA
// ============================================
// Shared defaults used by both newtab.js and options.js
// ============================================

const DEFAULT_LINKS = {
  dsa: [
    { url: 'https://leetcode.com/problemset/' },
    { url: 'https://neetcode.io/' },
    { url: 'https://www.algoexpert.io/' },
    { url: 'https://codeforces.com/' },
    { url: 'https://www.hackerrank.com/domains/algorithms' },
    { url: 'https://www.geeksforgeeks.org/data-structures/' },
    { url: 'https://visualgo.net/' },
    { url: 'https://www.bigocheatsheet.com/' }
  ],
  system_design: [
    { url: 'https://github.com/donnemartin/system-design-primer' },
    { url: 'https://www.designgurus.io/' },
    { url: 'https://bytebytego.com/' },
    { url: 'https://systemdesignprimer.com/' },
    { url: 'https://www.youtube.com/@ByteByteGo' },
    { url: 'https://www.interviewbit.com/system-design-interview-questions/' }
  ],
  backend: [
    { url: 'https://roadmap.sh/backend' },
    { url: 'https://12factor.net/' },
    { url: 'https://martinfowler.com/' },
    { url: 'https://github.com/kamranahmedse/developer-roadmap' },
    { url: 'https://www.postgresql.org/docs/' },
    { url: 'https://redis.io/docs/' },
    { url: 'https://docs.docker.com/' }
  ],
  behavioral: [
    { url: 'https://www.techinterviewhandbook.org/behavioral-interview/' },
    { url: 'https://www.levels.fyi/' },
    { url: 'https://www.amazon.jobs/content/en/our-workplace/leadership-principles' },
    { url: 'https://www.themuse.com/advice/star-interview-method' },
    { url: 'https://yangshun.github.io/tech-interview-handbook/behavioral-questions/' },
    { url: 'https://www.indeed.com/career-advice/interviewing/how-to-prepare-for-a-behavioral-interview' }
  ]
};

const DEFAULT_CATEGORIES = {
  dsa: { name: 'DSA', order: 0 },
  system_design: { name: 'System Design', order: 1 },
  backend: { name: 'Backend', order: 2 },
  behavioral: { name: 'Behavioral', order: 3 }
};
