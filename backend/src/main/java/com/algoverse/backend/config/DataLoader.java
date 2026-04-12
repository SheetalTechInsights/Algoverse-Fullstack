package com.algoverse.backend.config;

import com.algoverse.backend.model.Pattern;
import com.algoverse.backend.model.Problem;
import com.algoverse.backend.repository.PatternRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final PatternRepository patternRepository;

    public DataLoader(PatternRepository patternRepository) {
        this.patternRepository = patternRepository;
    }

    @Override
    public void run(String... args) {

        if (patternRepository.count() == 0) {

            /* =========================
               1️⃣ Sliding Window
            ========================== */

            Pattern slidingWindow = Pattern.builder()
                    .title("Sliding Window")
                    .theory("""
                            Sliding Window is used to optimize subarray/substring problems.
                            Maintain a window and slide it instead of using nested loops.
                            """)
                    .build();

            Problem sw1 = Problem.builder()
                    .name("Maximum Sum Subarray of Size K")
                    .difficulty("Medium")
                    .description("Find maximum sum of any contiguous subarray of size k.")
                    .approach("""
                            Use a fixed-size sliding window.
                            Calculate first window sum.
                            Slide the window by removing left element and adding right element.
                            Track maximum sum.
                            """)
                    .pseudoCode("""
                            windowSum = sum of first k elements
                            maxSum = windowSum

                            for i from k to n-1:
                                windowSum += arr[i] - arr[i-k]
                                maxSum = max(maxSum, windowSum)

                            return maxSum
                            """)
                    .starterCode("""
                            public int maxSum(int[] arr, int k) {
                                int windowSum = 0;
                                int maxSum = 0;

                                for(int i=0;i<k;i++){
                                    windowSum += arr[i];
                                }

                                maxSum = windowSum;

                                for(int i=k;i<arr.length;i++){
                                    windowSum += arr[i] - arr[i-k];
                                    maxSum = Math.max(maxSum, windowSum);
                                }

                                return maxSum;
                            }
                            """)
                    .pattern(slidingWindow)
                    .build();

            slidingWindow.setProblems(List.of(sw1));


            /* =========================
               2️⃣ Two Pointers
            ========================== */

            Pattern twoPointers = Pattern.builder()
                    .title("Two Pointers")
                    .theory("""
                            Two pointers technique uses left and right indices
                            moving toward each other or forward together.
                            """)
                    .build();

            Problem tp1 = Problem.builder()
                    .name("Two Sum (Sorted Array)")
                    .difficulty("Easy")
                    .description("Return indices of two numbers that add up to target.")
                    .approach("""
                            Use two pointers: left at start, right at end.
                            If sum < target → move left.
                            If sum > target → move right.
                            """)
                    .pseudoCode("""
                            left = 0
                            right = n-1

                            while left < right:
                                sum = arr[left] + arr[right]
                                if sum == target return indices
                                if sum < target left++
                                else right--

                            return [-1,-1]
                            """)
                    .starterCode("""
                            public int[] twoSum(int[] arr, int target) {
                                int left = 0;
                                int right = arr.length - 1;

                                while (left < right) {
                                    int sum = arr[left] + arr[right];

                                    if (sum == target)
                                        return new int[]{left, right};
                                    else if (sum < target)
                                        left++;
                                    else
                                        right--;
                                }

                                return new int[]{-1, -1};
                            }
                            """)
                    .pattern(twoPointers)
                    .build();

            twoPointers.setProblems(List.of(tp1));


            /* =========================
               3️⃣ Prefix Sum
            ========================== */

            Pattern prefixSum = Pattern.builder()
                    .title("Prefix Sum")
                    .theory("""
                            Precompute cumulative sums to answer range queries in O(1).
                            """)
                    .build();

            Problem ps1 = Problem.builder()
                    .name("Range Sum Query")
                    .difficulty("Medium")
                    .description("Preprocess array to answer sum queries in O(1).")
                    .approach("""
                            Build prefix array where:
                            prefix[i] = sum of elements from 0 to i.
                            Range sum = prefix[right] - prefix[left-1]
                            """)
                    .pseudoCode("""
                            prefix[0] = nums[0]

                            for i from 1 to n-1:
                                prefix[i] = prefix[i-1] + nums[i]

                            sumRange(left,right):
                                if left == 0 return prefix[right]
                                return prefix[right] - prefix[left-1]
                            """)
                    .starterCode("""
                            class NumArray {

                                int[] prefix;

                                public NumArray(int[] nums) {
                                    prefix = new int[nums.length];
                                    prefix[0] = nums[0];

                                    for(int i=1;i<nums.length;i++){
                                        prefix[i] = prefix[i-1] + nums[i];
                                    }
                                }

                                public int sumRange(int left, int right) {
                                    if(left == 0)
                                        return prefix[right];

                                    return prefix[right] - prefix[left-1];
                                }
                            }
                            """)
                    .pattern(prefixSum)
                    .build();

            prefixSum.setProblems(List.of(ps1));


            /* =========================
               4️⃣ Kadane’s Algorithm
            ========================== */

            Pattern kadane = Pattern.builder()
                    .title("Kadane’s Algorithm")
                    .theory("""
                            Kadane’s Algorithm finds maximum subarray sum in O(n).
                            """)
                    .build();

            Problem k1 = Problem.builder()
                    .name("Maximum Subarray")
                    .difficulty("Medium")
                    .description("Find contiguous subarray with maximum sum.")
                    .approach("""
                            At each index:
                            Either extend previous subarray
                            Or start new subarray from current element.
                            """)
                    .pseudoCode("""
                            current = nums[0]
                            max = nums[0]

                            for i from 1 to n-1:
                                current = max(nums[i], current + nums[i])
                                max = max(max, current)

                            return max
                            """)
                    .starterCode("""
                            public int maxSubArray(int[] nums) {

                                int current = nums[0];
                                int max = nums[0];

                                for(int i=1;i<nums.length;i++){
                                    current = Math.max(nums[i], current + nums[i]);
                                    max = Math.max(max, current);
                                }

                                return max;
                            }
                            """)
                    .pattern(kadane)
                    .build();

            kadane.setProblems(List.of(k1));


            /* =========================
               5️⃣ Binary Search
            ========================== */

            Pattern binarySearch = Pattern.builder()
                    .title("Binary Search")
                    .theory("""
                            Binary Search works on sorted arrays.
                            Reduce search space by half every iteration.
                            """)
                    .build();

            Problem bs1 = Problem.builder()
                    .name("Binary Search")
                    .difficulty("Easy")
                    .description("Find target index in sorted array.")
                    .approach("""
                            Compare mid with target.
                            If equal return index.
                            If target smaller search left half.
                            Else search right half.
                            """)
                    .pseudoCode("""
                            left = 0
                            right = n-1

                            while left <= right:
                                mid = (left + right)/2

                                if arr[mid] == target return mid
                                if arr[mid] < target left = mid+1
                                else right = mid-1

                            return -1
                            """)
                    .starterCode("""
                            public int binarySearch(int[] arr, int target) {

                                int left = 0;
                                int right = arr.length - 1;

                                while (left <= right) {
                                    int mid = left + (right - left) / 2;

                                    if (arr[mid] == target)
                                        return mid;
                                    else if (arr[mid] < target)
                                        left = mid + 1;
                                    else
                                        right = mid - 1;
                                }

                                return -1;
                            }
                            """)
                    .pattern(binarySearch)
                    .build();

            binarySearch.setProblems(List.of(bs1));


            /* =====================================================
   1️⃣ RECURSION
===================================================== */

            Pattern recursion = Pattern.builder()
                    .title("Recursion")
                    .theory("A function calling itself to solve smaller subproblems.")
                    .build();

            Problem rec1 = Problem.builder()
                    .name("Factorial")
                    .difficulty("Easy")
                    .description("Find factorial of a number n.")
                    .approach("n! = n * (n-1)!")
                    .pseudoCode("if n<=1 return 1 else return n*fact(n-1)")
                    .starterCode("""
                public int factorial(int n){
                    if(n<=1) return 1;
                    return n * factorial(n-1);
                }
                """)
                    .pattern(recursion)
                    .build();

            Problem rec2 = Problem.builder()
                    .name("Power of X")
                    .difficulty("Medium")
                    .description("Calculate x raised to power n.")
                    .approach("Use recursion with divide and conquer.")
                    .pseudoCode("pow(x,n)=pow(x,n/2)^2")
                    .starterCode("""
                public double myPow(double x, int n){
                    if(n==0) return 1;
                    double half = myPow(x, n/2);
                    if(n%2==0) return half*half;
                    return half*half*x;
                }
                """)
                    .pattern(recursion)
                    .build();

            recursion.setProblems(List.of(rec1,rec2));


/* =====================================================
   2️⃣ LINKED LIST
===================================================== */

            Pattern linkedList = Pattern.builder()
                    .title("Linked List")
                    .theory("Linear structure where each node points to next node.")
                    .build();

            Problem ll1 = Problem.builder()
                    .name("Reverse Linked List")
                    .difficulty("Easy")
                    .description("Reverse a singly linked list.")
                    .approach("Iteratively reverse pointers.")
                    .pseudoCode("prev=null; while(curr!=null)")
                    .starterCode("""
                public ListNode reverseList(ListNode head){
                    ListNode prev=null;
                    while(head!=null){
                        ListNode next=head.next;
                        head.next=prev;
                        prev=head;
                        head=next;
                    }
                    return prev;
                }
                """)
                    .pattern(linkedList)
                    .build();

            linkedList.setProblems(List.of(ll1));


/* =====================================================
   3️⃣ FAST & SLOW POINTER
===================================================== */

            Pattern fastSlow = Pattern.builder()
                    .title("Fast & Slow Pointer")
                    .theory("Two pointers moving at different speeds.")
                    .build();

            Problem fs1 = Problem.builder()
                    .name("Detect Cycle")
                    .difficulty("Medium")
                    .description("Detect cycle in linked list.")
                    .approach("Floyd's cycle detection.")
                    .pseudoCode("slow=head; fast=head")
                    .starterCode("""
                public boolean hasCycle(ListNode head){
                    if(head==null) return false;
                    ListNode slow=head, fast=head;
                    while(fast!=null && fast.next!=null){
                        slow=slow.next;
                        fast=fast.next.next;
                        if(slow==fast) return true;
                    }
                    return false;
                }
                """)
                    .pattern(fastSlow)
                    .build();

            fastSlow.setProblems(List.of(fs1));


/* =====================================================
   4️⃣ GREEDY
===================================================== */

            Pattern greedy = Pattern.builder()
                    .title("Greedy")
                    .theory("Make locally optimal choice at each step.")
                    .build();

            Problem g1 = Problem.builder()
                    .name("Assign Cookies")
                    .difficulty("Easy")
                    .description("Assign cookies to maximize content children.")
                    .approach("Sort both arrays and match smallest.")
                    .pseudoCode("Two pointer approach.")
                    .starterCode("""
                public int findContentChildren(int[] g, int[] s){
                    Arrays.sort(g);
                    Arrays.sort(s);
                    int i=0,j=0;
                    while(i<g.length && j<s.length){
                        if(s[j]>=g[i]) i++;
                        j++;
                    }
                    return i;
                }
                """)
                    .pattern(greedy)
                    .build();

            greedy.setProblems(List.of(g1));


/* =====================================================
   5️⃣ BACKTRACKING
===================================================== */

            Pattern backtracking = Pattern.builder()
                    .title("Backtracking")
                    .theory("Explore all possibilities recursively.")
                    .build();

            Problem b1 = Problem.builder()
                    .name("Generate Parentheses")
                    .difficulty("Medium")
                    .description("Generate valid parentheses combinations.")
                    .approach("Track open and close brackets.")
                    .pseudoCode("Add '(' if open<n; ')' if close<open")
                    .starterCode("""
                public void backtrack(List<String> res,String cur,int open,int close,int n){
                    if(cur.length()==2*n){
                        res.add(cur);
                        return;
                    }
                    if(open<n)
                        backtrack(res,cur+"(",open+1,close,n);
                    if(close<open)
                        backtrack(res,cur+")",open,close+1,n);
                }
                """)
                    .pattern(backtracking)
                    .build();

            backtracking.setProblems(List.of(b1));


/* =====================================================
   6️⃣ TREE TRAVERSAL
===================================================== */

            Pattern tree = Pattern.builder()
                    .title("Tree Traversal")
                    .theory("DFS and BFS traversal of binary tree.")
                    .build();

            Problem t1 = Problem.builder()
                    .name("Inorder Traversal")
                    .difficulty("Easy")
                    .description("Return inorder traversal.")
                    .approach("Left → Root → Right.")
                    .pseudoCode("Recursive DFS.")
                    .starterCode("""
                public void inorder(TreeNode root,List<Integer> res){
                    if(root==null) return;
                    inorder(root.left,res);
                    res.add(root.val);
                    inorder(root.right,res);
                }
                """)
                    .pattern(tree)
                    .build();

            tree.setProblems(List.of(t1));


/* =====================================================
   7️⃣ GRAPH BFS
===================================================== */

            Pattern graph = Pattern.builder()
                    .title("Graph BFS")
                    .theory("Traverse graph level by level.")
                    .build();

            Problem gr1 = Problem.builder()
                    .name("Number of Islands")
                    .difficulty("Medium")
                    .description("Count islands in grid.")
                    .approach("Use BFS/DFS.")
                    .pseudoCode("Visit connected 1's.")
                    .starterCode("""
                public int numIslands(char[][] grid){
                    int count=0;
                    for(int i=0;i<grid.length;i++){
                        for(int j=0;j<grid[0].length;j++){
                            if(grid[i][j]=='1'){
                                dfs(grid,i,j);
                                count++;
                            }
                        }
                    }
                    return count;
                }
                """)
                    .pattern(graph)
                    .build();

            graph.setProblems(List.of(gr1));


/* =====================================================
   8️⃣ HEAP
===================================================== */

            Pattern heap = Pattern.builder()
                    .title("Heap / Priority Queue")
                    .theory("Use heap to get min/max efficiently.")
                    .build();

            Problem h1 = Problem.builder()
                    .name("Kth Largest Element")
                    .difficulty("Medium")
                    .description("Find kth largest element.")
                    .approach("Use min heap of size k.")
                    .pseudoCode("Maintain heap size k.")
                    .starterCode("""
                public int findKthLargest(int[] nums, int k){
                    PriorityQueue<Integer> pq=new PriorityQueue<>();
                    for(int num:nums){
                        pq.offer(num);
                        if(pq.size()>k)
                            pq.poll();
                    }
                    return pq.peek();
                }
                """)
                    .pattern(heap)
                    .build();

            heap.setProblems(List.of(h1));


/* =====================================================
   SAVE ALL
===================================================== */


            /* =========================
               SAVE ALL
            ========================== */

            patternRepository.saveAll(
                    List.of(
                            slidingWindow,
                            twoPointers,
                            prefixSum,
                            kadane,
                            binarySearch,
                            recursion,
                            linkedList,
                            fastSlow,
                            greedy,
                            backtracking,
                            tree,
                            graph,
                            heap
                    )
            );

            System.out.println("All Patterns Loaded Successfully 🚀");
        }
    }
}