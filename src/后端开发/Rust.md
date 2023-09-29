# 类型

## 指针类型

References: a value of type &String is a reference to a String value. 

# 集合

在Rust标准库中定义了下面8种集合类型：

|             Collection             |                Description                |      C++       |     Java      |      Python       |
| :--------------------------------: | :---------------------------------------: | :------------: | :-----------: | :---------------: |
|              `Vec<T>`              |              Growable array               |     vector     |   ArrayList   |       list        |
|           `VecDeque<T>`            | Double-ended queue (growable ring buffer) |     deque      | ArrayDequeue  | collections.deque |
|          `LinkedList<T>`           |            Doubly linked list             |      list      |  LinkedList   |         -         |
|    `BinaryHeap<T> where T: Ord`    |                 Max heap                  | priority_queue | PriorityQueue |       heapq       |
| `HashMap<K, V> where K: Eq + Hash` |           Key-value hash table            | unordered_map  |    HashMap    |       dict        |
|    `BTreeMap<K,V> where K: Ord`    |          Sorted key-value table           |      map       |    TreeMap    |         -         |
|  `HashSet<T> where T: Eq + Hash`   |                Hash table                 | unordered_set  |    HashSet    |        set        |
|     `BTreeSet<T> where T: Ord`     |                Sorted set                 |      set       |    TreeSet    |         -         |

- `Vec<T>` is a growable, heap-allocated array of values of type T.
- `VecDeque<T>` is like `Vec<T>`, but better for use as a **first-in-first-out** queue. It supports efficiently adding and removing values at the front of the list as well as the back, but all other operations slightly slower.
