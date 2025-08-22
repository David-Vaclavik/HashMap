# HashMap

A **JavaScript HashMap** implementation using separate chaining for collision resolution. This data structure provides efficient key-value storage with O(1) average time complexity for basic operations.

## Features

- **Dynamic resizing** - automatically grows when load factor exceeds 0.75
- **Collision handling** - uses separate chaining with arrays
- **Method chaining** - most methods return `this` for fluent interface
- **HashSet implementation** - bonus HashSet built on top of HashMap
- **Comprehensive API** - full CRUD operations plus utility methods

## Installation

```javascript
// Import the functions
const { hashMap, createHashSet } = require("./hashmap.js");

// Or include directly
<script src="hashmap.js"></script>;
```

## Usage

### Creating a HashMap

```javascript
const map = hashMap();
```

### Basic Operations

```javascript
// Add key-value pairs
map.set("apple", "red").set("banana", "yellow").set("grape", "purple");

// Get values
console.log(map.get("apple")); // "red"
console.log(map.get("orange")); // null

// Check if key exists
console.log(map.has("banana")); // true

// Update existing value
map.set("apple", "green"); // Updates apple to green

// Remove entries
map.remove("grape"); // returns true
map.remove("orange"); // returns false (not found)
```

## API Reference

### Core Methods

#### `set(key, value)`

Stores a key-value pair in the map. Updates value if key already exists.

```javascript
map.set("name", "John");
map.set("age", 30);
// Returns: this (for chaining)
```

#### `get(key)`

Retrieves the value associated with the given key.

```javascript
const value = map.get("name"); // "John"
const missing = map.get("missing"); // null
```

#### `has(key)`

Returns `true` if the key exists in the map, `false` otherwise.

```javascript
map.has("name"); // true
map.has("missing"); // false
```

#### `remove(key)`

Removes the key-value pair from the map.

```javascript
map.remove("name"); // true (removed)
map.remove("missing"); // false (not found)
```

### Utility Methods

#### `length()`

Returns the number of key-value pairs stored.

```javascript
console.log(map.length()); // 2
```

#### `clear()`

Removes all entries from the map.

```javascript
map.clear();
console.log(map.length()); // 0
```

#### `keys()`

Returns an array of all keys in the map.

```javascript
const keys = map.keys(); // ["apple", "banana", "grape"]
```

#### `values()`

Returns an array of all values in the map.

```javascript
const values = map.values(); // ["red", "yellow", "purple"]
```

#### `entries()`

Returns an array of [key, value] pairs.

```javascript
const entries = map.entries();
// [["apple", "red"], ["banana", "yellow"], ["grape", "purple"]]
```

### Internal Methods

#### `hash(key)`

Generates a hash code for the given key (primarily for internal use).

```javascript
const hashCode = map.hash("apple"); // Returns a number
```

#### `completeMap()`

Returns the internal bucket structure (for debugging).

```javascript
console.log(map.completeMap()); // Shows internal array structure
```

## HashSet

A HashSet implementation built on top of the HashMap:

```javascript
const set = createHashSet();

// Add values
set.add("apple").add("banana").add("grape");

// Check membership
console.log(set.has("apple")); // true

// Remove values
set.remove("banana"); // true

// Get all values
console.log(set.keys()); // ["apple", "grape"]

// Utility methods
console.log(set.length()); // 2
set.clear(); // Removes all items
```

### HashSet API

| Method        | Description                     | Returns   |
| ------------- | ------------------------------- | --------- |
| `add(key)`    | Adds a value to the set         | `this`    |
| `has(key)`    | Checks if value exists          | `boolean` |
| `remove(key)` | Removes a value                 | `boolean` |
| `length()`    | Returns number of values        | `number`  |
| `clear()`     | Removes all values              | `this`    |
| `keys()`      | Returns array of values         | `array`   |
| `values()`    | Alias for `keys()`              | `array`   |
| `entries()`   | Returns array of [value] arrays | `array`   |

## Technical Details

### Hash Function

Uses a polynomial hash function with prime number 31:

```javascript
hash = (31 * hash + charCode) % capacity;
```

### Collision Resolution

- **Separate Chaining**: Each bucket contains an array of [key, value] pairs
- **Load Factor**: 0.75 (resizes when 75% full)
- **Growth Strategy**: Doubles capacity when threshold exceeded

### Performance

| Operation  | Average Case | Worst Case |
| ---------- | ------------ | ---------- |
| `set()`    | O(1)         | O(n)       |
| `get()`    | O(1)         | O(n)       |
| `remove()` | O(1)         | O(n)       |
| `has()`    | O(1)         | O(n)       |

_Worst case occurs when all keys hash to the same bucket_

### Memory Usage

- **Initial capacity**: 16 buckets
- **Growth factor**: 2x when load factor > 0.75
- **Space complexity**: O(n) where n is number of entries

## Example Usage

```javascript
const map = hashMap();

// Build a color map
const colors = [
  ["apple", "red"],
  ["banana", "yellow"],
  ["grape", "purple"],
  ["orange", "orange"],
  ["lime", "green"],
];

// Add all colors
colors.forEach(([fruit, color]) => {
  map.set(fruit, color);
});

// Query the map
console.log(`An apple is ${map.get("apple")}`); // "An apple is red"

// Update a value
map.set("apple", "green"); // Green apple variety

// Check what we have
console.log("Fruits:", map.keys());
console.log("Colors:", map.values());
console.log("Total fruits:", map.length());

// Convert to array for processing
const fruitArray = map.entries();
fruitArray.forEach(([fruit, color]) => {
  console.log(`${fruit} is ${color}`);
});
```

## Error Handling

- **Invalid keys**: Only string keys are supported
- **Missing keys**: `get()` returns `null` for non-existent keys
- **Type safety**: No runtime type checking (JavaScript dynamic typing)

## Browser Compatibility

Works in all modern browsers that support:

- ES6 Arrow functions
- Array methods (`fill`, `map`, `forEach`)
- `for...of` loops

## License

This project is open source and available under the [MIT License](LICENSE).
