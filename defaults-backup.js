// ============================================
// DEFAULT DATA
// ============================================
// NeetCode 150 Problems organized by topic
// 2-level nested structure: category → subcategory → links
//
// Link Formats:
// All DSA problems: GitHub notes + LeetCode link (side by side)
// ============================================

const DEFAULT_LINKS = {
  dsa: {
    arrays_hashing: [
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/01-arrays-hashing/01-contains-duplicate.md', 'https://leetcode.com/problems/contains-duplicate/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/01-arrays-hashing/02-valid-anagram.md', 'https://leetcode.com/problems/valid-anagram/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/01-arrays-hashing/03-two-sum.md', 'https://leetcode.com/problems/two-sum/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/01-arrays-hashing/04-group-anagrams.md', 'https://leetcode.com/problems/group-anagrams/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/01-arrays-hashing/05-top-k-frequent-elements.md', 'https://leetcode.com/problems/top-k-frequent-elements/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/01-arrays-hashing/06-product-of-array-except-self.md', 'https://leetcode.com/problems/product-of-array-except-self/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/01-arrays-hashing/07-valid-sudoku.md', 'https://leetcode.com/problems/valid-sudoku/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/01-arrays-hashing/08-encode-and-decode-strings.md', 'https://leetcode.com/problems/encode-and-decode-strings/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/01-arrays-hashing/09-longest-consecutive-sequence.md', 'https://leetcode.com/problems/longest-consecutive-sequence/'] }
    ],
    two_pointers: [
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/02-two-pointers/01-valid-palindrome.md', 'https://leetcode.com/problems/valid-palindrome/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/02-two-pointers/02-two-sum-ii.md', 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/02-two-pointers/03-three-sum.md', 'https://leetcode.com/problems/3sum/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/02-two-pointers/04-container-with-most-water.md', 'https://leetcode.com/problems/container-with-most-water/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/02-two-pointers/05-trapping-rain-water.md', 'https://leetcode.com/problems/trapping-rain-water/'] }
    ],
    sliding_window: [
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/03-sliding-window/01-best-time-to-buy-sell-stock.md', 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/03-sliding-window/02-longest-substring-without-repeating.md', 'https://leetcode.com/problems/longest-substring-without-repeating-characters/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/03-sliding-window/03-longest-repeating-character-replacement.md', 'https://leetcode.com/problems/longest-repeating-character-replacement/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/03-sliding-window/04-permutation-in-string.md', 'https://leetcode.com/problems/permutation-in-string/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/03-sliding-window/05-minimum-window-substring.md', 'https://leetcode.com/problems/minimum-window-substring/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/03-sliding-window/06-sliding-window-maximum.md', 'https://leetcode.com/problems/sliding-window-maximum/'] }
    ],
    stack: [
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/04-stack/01-valid-parentheses.md', 'https://leetcode.com/problems/valid-parentheses/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/04-stack/02-min-stack.md', 'https://leetcode.com/problems/min-stack/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/04-stack/03-evaluate-reverse-polish-notation.md', 'https://leetcode.com/problems/evaluate-reverse-polish-notation/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/04-stack/04-generate-parentheses.md', 'https://leetcode.com/problems/generate-parentheses/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/04-stack/05-daily-temperatures.md', 'https://leetcode.com/problems/daily-temperatures/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/04-stack/06-car-fleet.md', 'https://leetcode.com/problems/car-fleet/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/04-stack/07-largest-rectangle-in-histogram.md', 'https://leetcode.com/problems/largest-rectangle-in-histogram/'] }
    ],
    binary_search: [
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/05-binary-search/01-binary-search.md', 'https://leetcode.com/problems/binary-search/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/05-binary-search/02-search-2d-matrix.md', 'https://leetcode.com/problems/search-a-2d-matrix/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/05-binary-search/03-koko-eating-bananas.md', 'https://leetcode.com/problems/koko-eating-bananas/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/05-binary-search/04-find-minimum-in-rotated-sorted-array.md', 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/05-binary-search/05-search-in-rotated-sorted-array.md', 'https://leetcode.com/problems/search-in-rotated-sorted-array/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/05-binary-search/06-time-based-key-value-store.md', 'https://leetcode.com/problems/time-based-key-value-store/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/05-binary-search/07-median-of-two-sorted-arrays.md', 'https://leetcode.com/problems/median-of-two-sorted-arrays/'] }
    ],
    linked_list: [
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/06-linked-list/01-reverse-linked-list.md', 'https://leetcode.com/problems/reverse-linked-list/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/06-linked-list/02-merge-two-sorted-lists.md', 'https://leetcode.com/problems/merge-two-sorted-lists/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/06-linked-list/03-reorder-list.md', 'https://leetcode.com/problems/reorder-list/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/06-linked-list/04-remove-nth-node-from-end.md', 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/06-linked-list/05-copy-list-with-random-pointer.md', 'https://leetcode.com/problems/copy-list-with-random-pointer/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/06-linked-list/06-add-two-numbers.md', 'https://leetcode.com/problems/add-two-numbers/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/06-linked-list/07-linked-list-cycle.md', 'https://leetcode.com/problems/linked-list-cycle/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/06-linked-list/08-find-the-duplicate-number.md', 'https://leetcode.com/problems/find-the-duplicate-number/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/06-linked-list/09-lru-cache.md', 'https://leetcode.com/problems/lru-cache/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/06-linked-list/10-merge-k-sorted-lists.md', 'https://leetcode.com/problems/merge-k-sorted-lists/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/06-linked-list/11-reverse-nodes-in-k-group.md', 'https://leetcode.com/problems/reverse-nodes-in-k-group/'] }
    ],
    trees: [
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/07-trees/01-invert-binary-tree.md', 'https://leetcode.com/problems/invert-binary-tree/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/07-trees/02-maximum-depth-of-binary-tree.md', 'https://leetcode.com/problems/maximum-depth-of-binary-tree/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/07-trees/03-diameter-of-binary-tree.md', 'https://leetcode.com/problems/diameter-of-binary-tree/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/07-trees/04-balanced-binary-tree.md', 'https://leetcode.com/problems/balanced-binary-tree/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/07-trees/05-same-tree.md', 'https://leetcode.com/problems/same-tree/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/07-trees/06-subtree-of-another-tree.md', 'https://leetcode.com/problems/subtree-of-another-tree/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/07-trees/07-lowest-common-ancestor-bst.md', 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/07-trees/08-binary-tree-level-order-traversal.md', 'https://leetcode.com/problems/binary-tree-level-order-traversal/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/07-trees/09-binary-tree-right-side-view.md', 'https://leetcode.com/problems/binary-tree-right-side-view/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/07-trees/10-count-good-nodes.md', 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/07-trees/11-validate-binary-search-tree.md', 'https://leetcode.com/problems/validate-binary-search-tree/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/07-trees/12-kth-smallest-element-in-bst.md', 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/07-trees/13-construct-binary-tree-preorder-inorder.md', 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/07-trees/14-binary-tree-maximum-path-sum.md', 'https://leetcode.com/problems/binary-tree-maximum-path-sum/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/07-trees/15-serialize-deserialize-binary-tree.md', 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/'] }
    ],
    tries: [
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/08-tries/01-implement-trie.md', 'https://leetcode.com/problems/implement-trie-prefix-tree/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/08-tries/02-design-add-search-words.md', 'https://leetcode.com/problems/design-add-and-search-words-data-structure/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/08-tries/03-word-search-ii.md', 'https://leetcode.com/problems/word-search-ii/'] }
    ],
    heap_priority_queue: [
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/09-heap-priority-queue/01-kth-largest-element.md', 'https://leetcode.com/problems/kth-largest-element-in-an-array/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/09-heap-priority-queue/02-last-stone-weight.md', 'https://leetcode.com/problems/last-stone-weight/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/09-heap-priority-queue/03-k-closest-points.md', 'https://leetcode.com/problems/k-closest-points-to-origin/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/09-heap-priority-queue/04-kth-largest-in-stream.md', 'https://leetcode.com/problems/kth-largest-element-in-a-stream/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/09-heap-priority-queue/05-task-scheduler.md', 'https://leetcode.com/problems/task-scheduler/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/09-heap-priority-queue/06-design-twitter.md', 'https://leetcode.com/problems/design-twitter/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/09-heap-priority-queue/07-find-median-from-data-stream.md', 'https://leetcode.com/problems/find-median-from-data-stream/'] }
    ],
    backtracking: [
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/10-backtracking/01-subsets.md', 'https://leetcode.com/problems/subsets/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/10-backtracking/02-combination-sum.md', 'https://leetcode.com/problems/combination-sum/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/10-backtracking/03-permutations.md', 'https://leetcode.com/problems/permutations/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/10-backtracking/04-subsets-ii.md', 'https://leetcode.com/problems/subsets-ii/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/10-backtracking/05-combination-sum-ii.md', 'https://leetcode.com/problems/combination-sum-ii/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/10-backtracking/06-word-search.md', 'https://leetcode.com/problems/word-search/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/10-backtracking/07-palindrome-partitioning.md', 'https://leetcode.com/problems/palindrome-partitioning/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/10-backtracking/08-letter-combinations-phone-number.md', 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/10-backtracking/09-n-queens.md', 'https://leetcode.com/problems/n-queens/'] }
    ],
    graphs: [
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/11-graphs/01-number-of-islands.md', 'https://leetcode.com/problems/number-of-islands/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/11-graphs/02-clone-graph.md', 'https://leetcode.com/problems/clone-graph/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/11-graphs/03-max-area-of-island.md', 'https://leetcode.com/problems/max-area-of-island/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/11-graphs/04-pacific-atlantic-water-flow.md', 'https://leetcode.com/problems/pacific-atlantic-water-flow/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/11-graphs/05-surrounded-regions.md', 'https://leetcode.com/problems/surrounded-regions/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/11-graphs/06-rotting-oranges.md', 'https://leetcode.com/problems/rotting-oranges/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/11-graphs/07-walls-and-gates.md', 'https://leetcode.com/problems/walls-and-gates/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/11-graphs/08-course-schedule.md', 'https://leetcode.com/problems/course-schedule/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/11-graphs/09-course-schedule-ii.md', 'https://leetcode.com/problems/course-schedule-ii/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/11-graphs/10-redundant-connection.md', 'https://leetcode.com/problems/redundant-connection/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/11-graphs/11-number-of-connected-components.md', 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/11-graphs/12-graph-valid-tree.md', 'https://leetcode.com/problems/graph-valid-tree/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/11-graphs/13-word-ladder.md', 'https://leetcode.com/problems/word-ladder/'] }
    ],
    advanced_graphs: [
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/12-advanced-graphs/01-reconstruct-itinerary.md', 'https://leetcode.com/problems/reconstruct-itinerary/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/12-advanced-graphs/02-min-cost-to-connect-all-points.md', 'https://leetcode.com/problems/min-cost-to-connect-all-points/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/12-advanced-graphs/03-network-delay-time.md', 'https://leetcode.com/problems/network-delay-time/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/12-advanced-graphs/04-swim-in-rising-water.md', 'https://leetcode.com/problems/swim-in-rising-water/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/12-advanced-graphs/05-alien-dictionary.md', 'https://leetcode.com/problems/alien-dictionary/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/12-advanced-graphs/06-cheapest-flights-within-k-stops.md', 'https://leetcode.com/problems/cheapest-flights-within-k-stops/'] }
    ],
    dp_1d: [
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/13-dynamic-programming-1d/01-climbing-stairs.md', 'https://leetcode.com/problems/climbing-stairs/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/13-dynamic-programming-1d/02-min-cost-climbing-stairs.md', 'https://leetcode.com/problems/min-cost-climbing-stairs/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/13-dynamic-programming-1d/03-house-robber.md', 'https://leetcode.com/problems/house-robber/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/13-dynamic-programming-1d/04-house-robber-ii.md', 'https://leetcode.com/problems/house-robber-ii/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/13-dynamic-programming-1d/05-longest-palindromic-substring.md', 'https://leetcode.com/problems/longest-palindromic-substring/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/13-dynamic-programming-1d/06-palindromic-substrings.md', 'https://leetcode.com/problems/palindromic-substrings/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/13-dynamic-programming-1d/07-decode-ways.md', 'https://leetcode.com/problems/decode-ways/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/13-dynamic-programming-1d/08-coin-change.md', 'https://leetcode.com/problems/coin-change/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/13-dynamic-programming-1d/09-maximum-product-subarray.md', 'https://leetcode.com/problems/maximum-product-subarray/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/13-dynamic-programming-1d/10-longest-increasing-subsequence.md', 'https://leetcode.com/problems/longest-increasing-subsequence/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/13-dynamic-programming-1d/11-word-break.md', 'https://leetcode.com/problems/word-break/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/13-dynamic-programming-1d/12-partition-equal-subset-sum.md', 'https://leetcode.com/problems/partition-equal-subset-sum/'] }
    ],
    dp_2d: [
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/14-dynamic-programming-2d/01-unique-paths.md', 'https://leetcode.com/problems/unique-paths/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/14-dynamic-programming-2d/02-longest-common-subsequence.md', 'https://leetcode.com/problems/longest-common-subsequence/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/14-dynamic-programming-2d/03-best-time-to-buy-sell-stock-with-cooldown.md', 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/14-dynamic-programming-2d/04-coin-change-ii.md', 'https://leetcode.com/problems/coin-change-ii/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/14-dynamic-programming-2d/05-target-sum.md', 'https://leetcode.com/problems/target-sum/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/14-dynamic-programming-2d/06-interleaving-string.md', 'https://leetcode.com/problems/interleaving-string/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/14-dynamic-programming-2d/07-longest-increasing-path.md', 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/14-dynamic-programming-2d/08-distinct-subsequences.md', 'https://leetcode.com/problems/distinct-subsequences/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/14-dynamic-programming-2d/09-edit-distance.md', 'https://leetcode.com/problems/edit-distance/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/14-dynamic-programming-2d/10-burst-balloons.md', 'https://leetcode.com/problems/burst-balloons/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/14-dynamic-programming-2d/11-regular-expression-matching.md', 'https://leetcode.com/problems/regular-expression-matching/'] }
    ],
    greedy: [
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/15-greedy/01-maximum-subarray.md', 'https://leetcode.com/problems/maximum-subarray/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/15-greedy/02-jump-game.md', 'https://leetcode.com/problems/jump-game/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/15-greedy/03-jump-game-ii.md', 'https://leetcode.com/problems/jump-game-ii/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/15-greedy/04-gas-station.md', 'https://leetcode.com/problems/gas-station/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/15-greedy/05-hand-of-straights.md', 'https://leetcode.com/problems/hand-of-straights/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/15-greedy/06-merge-triplets.md', 'https://leetcode.com/problems/merge-triplets-to-form-target-triplet/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/15-greedy/07-partition-labels.md', 'https://leetcode.com/problems/partition-labels/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/15-greedy/08-valid-parenthesis-string.md', 'https://leetcode.com/problems/valid-parenthesis-string/'] }
    ],
    intervals: [
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/16-intervals/01-insert-interval.md', 'https://leetcode.com/problems/insert-interval/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/16-intervals/02-merge-intervals.md', 'https://leetcode.com/problems/merge-intervals/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/16-intervals/03-non-overlapping-intervals.md', 'https://leetcode.com/problems/non-overlapping-intervals/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/16-intervals/04-meeting-rooms.md', 'https://leetcode.com/problems/meeting-rooms/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/16-intervals/05-meeting-rooms-ii.md', 'https://leetcode.com/problems/meeting-rooms-ii/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/16-intervals/06-minimum-interval.md', 'https://leetcode.com/problems/minimum-interval-to-include-each-query/'] }
    ],
    math_geometry: [
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/17-math-geometry/01-rotate-image.md', 'https://leetcode.com/problems/rotate-image/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/17-math-geometry/02-spiral-matrix.md', 'https://leetcode.com/problems/spiral-matrix/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/17-math-geometry/03-set-matrix-zeroes.md', 'https://leetcode.com/problems/set-matrix-zeroes/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/17-math-geometry/04-happy-number.md', 'https://leetcode.com/problems/happy-number/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/17-math-geometry/05-plus-one.md', 'https://leetcode.com/problems/plus-one/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/17-math-geometry/06-pow-x-n.md', 'https://leetcode.com/problems/powx-n/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/17-math-geometry/07-multiply-strings.md', 'https://leetcode.com/problems/multiply-strings/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/17-math-geometry/08-detect-squares.md', 'https://leetcode.com/problems/detect-squares/'] }
    ],
    bit_manipulation: [
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/18-bit-manipulation/01-single-number.md', 'https://leetcode.com/problems/single-number/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/18-bit-manipulation/02-number-of-1-bits.md', 'https://leetcode.com/problems/number-of-1-bits/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/18-bit-manipulation/03-counting-bits.md', 'https://leetcode.com/problems/counting-bits/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/18-bit-manipulation/04-reverse-bits.md', 'https://leetcode.com/problems/reverse-bits/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/18-bit-manipulation/05-missing-number.md', 'https://leetcode.com/problems/missing-number/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/18-bit-manipulation/06-sum-of-two-integers.md', 'https://leetcode.com/problems/sum-of-two-integers/'] },
      { urls: ['https://github.com/namanvashistha/dsa/blob/main/18-bit-manipulation/07-reverse-integer.md', 'https://leetcode.com/problems/reverse-integer/'] }
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
  }
};
