// ============================================
// DEFAULT DATA
// ============================================
// Shared defaults used by both newtab.js and options.js
// 2-level nested structure: category → subcategory → links
// ============================================

const DEFAULT_LINKS = {
  dsa: {
    arrays: [
      { url: 'https://leetcode.com/tag/array/' },
      { url: 'https://neetcode.io/roadmap' },
      { url: 'https://www.geeksforgeeks.org/array-data-structure/' }
    ],
    trees: [
      { url: 'https://leetcode.com/tag/tree/' },
      { url: 'https://visualgo.net/en/bst' },
      { url: 'https://www.geeksforgeeks.org/binary-tree-data-structure/' }
    ],
    graphs: [
      { url: 'https://leetcode.com/tag/graph/' },
      { url: 'https://visualgo.net/en/dfsbfs' },
      { url: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/' }
    ],
    dp: [
      { url: 'https://leetcode.com/tag/dynamic-programming/' },
      { url: 'https://www.geeksforgeeks.org/dynamic-programming/' }
    ]
  },
  system_design: {
    lld: [
      { url: 'https://github.com/tssovi/grokking-the-object-oriented-design-interview' },
      { url: 'https://www.designgurus.io/course/grokking-the-low-level-design-interview' },
      { url: 'https://refactoring.guru/design-patterns' }
    ],
    hld: [
      { url: 'https://github.com/donnemartin/system-design-primer' },
      { url: 'https://bytebytego.com/' },
      { url: 'https://www.youtube.com/@ByteByteGo' }
    ],
    databases: [
      { url: 'https://www.postgresql.org/docs/' },
      { url: 'https://redis.io/docs/' },
      { url: 'https://www.mongodb.com/docs/' }
    ]
  },
  backend: {
    apis: [
      { url: 'https://roadmap.sh/backend' },
      { url: 'https://restfulapi.net/' },
      { url: 'https://graphql.org/learn/' }
    ],
    architecture: [
      { url: 'https://12factor.net/' },
      { url: 'https://martinfowler.com/architecture/' },
      { url: 'https://microservices.io/' }
    ],
    devops: [
      { url: 'https://docs.docker.com/' },
      { url: 'https://kubernetes.io/docs/' }
    ]
  },
  behavioral: {
    star_method: [
      { url: 'https://www.themuse.com/advice/star-interview-method' },
      { url: 'https://www.indeed.com/career-advice/interviewing/how-to-prepare-for-a-behavioral-interview' }
    ],
    company_research: [
      { url: 'https://www.levels.fyi/' },
      { url: 'https://www.glassdoor.com/' }
    ],
    leadership: [
      { url: 'https://www.amazon.jobs/content/en/our-workplace/leadership-principles' },
      { url: 'https://www.techinterviewhandbook.org/behavioral-interview/' }
    ]
  }
};
