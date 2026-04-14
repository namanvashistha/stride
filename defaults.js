// ============================================
// DEFAULT DATA
// ============================================
// NeetCode 150 Problems organized by topic
// 2-level nested structure: category → subcategory → links
//
// Link Formats:
// 1. Single URL: { url: 'https://...' }
// 2. Multiple URLs (displays side by side): 
//    { 
//      title: 'Problem Name',  // optional, auto-generated if not provided
//      urls: ['https://...', 'https://...'] 
//    }
// ============================================

const DEFAULT_LINKS = {
  dsa: {
    arrays_hashing: [
      // Example with multiple URLs (GitHub + LeetCode) - displays side by side
      {
        title: 'Contains Duplicate',
        urls: [
          'https://github.com/namanvashistha/dsa/blob/main/01-arrays-hashing/01-contains-duplicate.md',
          'https://leetcode.com/problems/contains-duplicate/'
        ]
      },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/01-arrays-hashing/02-valid-anagram.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/01-arrays-hashing/03-two-sum.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/01-arrays-hashing/04-group-anagrams.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/01-arrays-hashing/05-top-k-frequent-elements.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/01-arrays-hashing/06-product-of-array-except-self.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/01-arrays-hashing/07-valid-sudoku.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/01-arrays-hashing/08-encode-and-decode-strings.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/01-arrays-hashing/09-longest-consecutive-sequence.md' }
    ],
    two_pointers: [
      { url: 'https://github.com/namanvashistha/dsa/blob/main/02-two-pointers/01-valid-palindrome.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/02-two-pointers/02-two-sum-ii.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/02-two-pointers/03-three-sum.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/02-two-pointers/04-container-with-most-water.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/02-two-pointers/05-trapping-rain-water.md' }
    ],
    sliding_window: [
      { url: 'https://github.com/namanvashistha/dsa/blob/main/03-sliding-window/01-best-time-to-buy-sell-stock.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/03-sliding-window/02-longest-substring-without-repeating.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/03-sliding-window/03-longest-repeating-character-replacement.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/03-sliding-window/04-permutation-in-string.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/03-sliding-window/05-minimum-window-substring.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/03-sliding-window/06-sliding-window-maximum.md' }
    ],
    stack: [
      { url: 'https://github.com/namanvashistha/dsa/blob/main/04-stack/01-valid-parentheses.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/04-stack/02-min-stack.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/04-stack/03-evaluate-reverse-polish-notation.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/04-stack/04-generate-parentheses.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/04-stack/05-daily-temperatures.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/04-stack/06-car-fleet.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/04-stack/07-largest-rectangle-in-histogram.md' }
    ],
    binary_search: [
      { url: 'https://github.com/namanvashistha/dsa/blob/main/05-binary-search/01-binary-search.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/05-binary-search/02-search-2d-matrix.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/05-binary-search/03-koko-eating-bananas.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/05-binary-search/04-find-minimum-in-rotated-sorted-array.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/05-binary-search/05-search-in-rotated-sorted-array.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/05-binary-search/06-time-based-key-value-store.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/05-binary-search/07-median-of-two-sorted-arrays.md' }
    ],
    linked_list: [
      { url: 'https://github.com/namanvashistha/dsa/blob/main/06-linked-list/01-reverse-linked-list.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/06-linked-list/02-merge-two-sorted-lists.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/06-linked-list/03-reorder-list.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/06-linked-list/04-remove-nth-node.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/06-linked-list/05-copy-list-with-random-pointer.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/06-linked-list/06-add-two-numbers.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/06-linked-list/07-linked-list-cycle.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/06-linked-list/08-find-duplicate-number.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/06-linked-list/09-lru-cache.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/06-linked-list/10-merge-k-sorted-lists.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/06-linked-list/11-reverse-nodes-in-k-group.md' }
    ],
    trees: [
      { url: 'https://github.com/namanvashistha/dsa/blob/main/07-trees/01-invert-binary-tree.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/07-trees/02-maximum-depth.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/07-trees/03-diameter-of-tree.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/07-trees/04-balanced-binary-tree.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/07-trees/05-same-tree.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/07-trees/06-subtree-of-another-tree.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/07-trees/07-lowest-common-ancestor.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/07-trees/08-level-order-traversal.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/07-trees/09-right-side-view.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/07-trees/10-count-good-nodes.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/07-trees/11-validate-bst.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/07-trees/12-kth-smallest-in-bst.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/07-trees/13-construct-tree-from-preorder-inorder.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/07-trees/14-binary-tree-max-path-sum.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/07-trees/15-serialize-deserialize-tree.md' }
    ],
    tries: [
      { url: 'https://github.com/namanvashistha/dsa/blob/main/08-tries/01-implement-trie.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/08-tries/02-design-add-search-words.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/08-tries/03-word-search-ii.md' }
    ],
    graphs: [
      { url: 'https://github.com/namanvashistha/dsa/blob/main/11-graphs/01-number-of-islands.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/11-graphs/02-clone-graph.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/11-graphs/03-max-area-of-island.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/11-graphs/04-pacific-atlantic-water-flow.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/11-graphs/05-surrounded-regions.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/11-graphs/06-rotting-oranges.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/11-graphs/07-walls-and-gates.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/11-graphs/08-course-schedule.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/11-graphs/09-course-schedule-ii.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/11-graphs/10-redundant-connection.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/11-graphs/11-number-of-connected-components.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/11-graphs/12-graph-valid-tree.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/11-graphs/13-word-ladder.md' }
    ],
    advanced_graphs: [
      { url: 'https://github.com/namanvashistha/dsa/blob/main/12-advanced-graphs/01-reconstruct-itinerary.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/12-advanced-graphs/02-min-cost-to-connect-all-points.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/12-advanced-graphs/03-network-delay-time.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/12-advanced-graphs/04-swim-in-rising-water.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/12-advanced-graphs/05-alien-dictionary.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/12-advanced-graphs/06-cheapest-flights-within-k-stops.md' }
    ],
    dp_1d: [
      { url: 'https://github.com/namanvashistha/dsa/blob/main/13-dynamic-programming-1d/01-climbing-stairs.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/13-dynamic-programming-1d/02-min-cost-climbing-stairs.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/13-dynamic-programming-1d/03-house-robber.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/13-dynamic-programming-1d/04-house-robber-ii.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/13-dynamic-programming-1d/05-longest-palindromic-substring.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/13-dynamic-programming-1d/06-palindromic-substrings.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/13-dynamic-programming-1d/07-decode-ways.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/13-dynamic-programming-1d/08-coin-change.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/13-dynamic-programming-1d/09-maximum-product-subarray.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/13-dynamic-programming-1d/10-word-break.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/13-dynamic-programming-1d/11-longest-increasing-subsequence.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/13-dynamic-programming-1d/12-partition-equal-subset-sum.md' }
    ],
    dp_2d: [
      { url: 'https://github.com/namanvashistha/dsa/blob/main/14-dynamic-programming-2d/01-unique-paths.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/14-dynamic-programming-2d/02-longest-common-subsequence.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/14-dynamic-programming-2d/03-best-time-to-buy-sell-stock-with-cooldown.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/14-dynamic-programming-2d/04-coin-change-ii.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/14-dynamic-programming-2d/05-target-sum.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/14-dynamic-programming-2d/06-interleaving-string.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/14-dynamic-programming-2d/07-longest-increasing-path.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/14-dynamic-programming-2d/08-distinct-subsequences.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/14-dynamic-programming-2d/09-edit-distance.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/14-dynamic-programming-2d/10-burst-balloons.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/14-dynamic-programming-2d/11-regular-expression-matching.md' }
    ],
    heap_priority_queue: [
      { url: 'https://github.com/namanvashistha/dsa/blob/main/09-heap-priority-queue/01-kth-largest-element.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/09-heap-priority-queue/02-last-stone-weight.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/09-heap-priority-queue/03-k-closest-points.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/09-heap-priority-queue/04-kth-largest-in-stream.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/09-heap-priority-queue/05-task-scheduler.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/09-heap-priority-queue/06-design-twitter.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/09-heap-priority-queue/07-find-median-from-data-stream.md' }
    ],
    backtracking: [
      { url: 'https://github.com/namanvashistha/dsa/blob/main/10-backtracking/01-subsets.md' },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/10-backtracking/02-combination-sum.md', "https://leetcode.com/problems/combination-sum"] },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/10-backtracking/03-permutations.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/10-backtracking/04-subsets-ii.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/10-backtracking/05-combination-sum-ii.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/10-backtracking/06-word-search.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/10-backtracking/07-palindrome-partitioning.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/10-backtracking/08-letter-combinations.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/10-backtracking/09-n-queens.md' }
    ],
    greedy: [
      { url: 'https://github.com/namanvashistha/dsa/blob/main/15-greedy/01-maximum-subarray.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/15-greedy/02-jump-game.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/15-greedy/03-jump-game-ii.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/15-greedy/04-gas-station.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/15-greedy/05-hand-of-straights.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/15-greedy/06-merge-triplets.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/15-greedy/07-partition-labels.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/15-greedy/08-valid-parenthesis-string.md' }
    ],
    intervals: [
      { url: 'https://github.com/namanvashistha/dsa/blob/main/16-intervals/01-insert-interval.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/16-intervals/02-merge-intervals.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/16-intervals/03-non-overlapping-intervals.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/16-intervals/04-meeting-rooms.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/16-intervals/05-meeting-rooms-ii.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/16-intervals/06-minimum-interval.md' }
    ],
    math_geometry: [
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/17-math-geometry/01-rotate-image.md', 'https://leetcode.com/problems/rotate-image/'] },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/17-math-geometry/02-spiral-matrix.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/17-math-geometry/03-set-matrix-zeroes.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/17-math-geometry/04-happy-number.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/17-math-geometry/05-plus-one.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/17-math-geometry/06-pow-x-n.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/17-math-geometry/07-multiply-strings.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/17-math-geometry/08-detect-squares.md' }
    ],
    bit_manipulation: [
      { url: 'https://github.com/namanvashistha/dsa/blob/main/18-bit-manipulation/01-single-number.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/18-bit-manipulation/02-number-of-1-bits.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/18-bit-manipulation/03-counting-bits.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/18-bit-manipulation/04-reverse-bits.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/18-bit-manipulation/05-missing-number.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/18-bit-manipulation/06-sum-of-two-integers.md' },
      { url: 'https://github.com/namanvashistha/dsa/blob/main/18-bit-manipulation/07-reverse-integer.md' }
    ],
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
  // },
  // backend: {
  //   apis: [
  //     { url: 'https://roadmap.sh/backend' },
  //     { url: 'https://restfulapi.net/' },
  //     { url: 'https://graphql.org/learn/' }
  //   ],
  //   architecture: [
  //     { url: 'https://12factor.net/' },
  //     { url: 'https://martinfowler.com/architecture/' },
  //     { url: 'https://microservices.io/' }
  //   ],
  //   devops: [
  //     { url: 'https://docs.docker.com/' },
  //     { url: 'https://kubernetes.io/docs/' }
  //   ],
  // },
  // behavioral: {
  //   star_method: [
  //     { url: 'https://www.themuse.com/advice/star-interview-method' },
  //     { url: 'https://www.indeed.com/career-advice/interviewing/how-to-prepare-for-a-behavioral-interview' }
  //   ],
  //   company_research: [
  //     { url: 'https://www.levels.fyi/' },
  //     { url: 'https://www.glassdoor.com/' }
  //   ],
  //   leadership: [
  //     { url: 'https://www.amazon.jobs/content/en/our-workplace/leadership-principles' },
  //     { url: 'https://www.techinterviewhandbook.org/behavioral-interview/' }
  //   ]
  }
};
