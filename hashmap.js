function hashMap() {
  let size = 0;
  let loadFactor = 0.75;
  let capacity = 16;
  let buckets = Array(capacity)
    .fill(null)
    .map(() => []);

  return {
    // 1. hash(key) - takes a key(string) and produces a hash code(number)
    hash(key) {
      let hashCode = 0;

      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
      }

      return hashCode;
    },

    // 2. set(key, value) - takes two arguments: key, value that is assigned to this key
    set(key, value) {
      const index = this.hash(key);
      const bucket = buckets[index];

      // Check if key already exists → update in place
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket[i][1] = value;
          return this;
        }
      }

      // check load factor for resize
      if (size >= capacity * loadFactor) {
        let oldBuckets = buckets;
        size = 0;

        capacity *= 2;
        buckets = Array(capacity)
          .fill(null)
          .map(() => []);

        // re-insert old entries into new buckets
        for (const element of oldBuckets) {
          for (const inner of element) {
            this.set(inner[0], inner[1]);
          }
        }

        return this.set(key, value);
      }

      // Insert new key/value
      bucket.push([key, value]);
      size++;
      return this;
    },

    // 3. get(key) takes key argument, returns the value assigned to this key. If a key is not found, return null.
    get(key) {
      const index = this.hash(key);
      const bucket = buckets[index];

      for (let i = 0; i < bucket.length; i++) {
        if (key === bucket[i][0]) {
          return bucket[i][1];
        }
      }

      return null;
    },

    // 4. has(key) key as an argument and returns true/false based on whether the key is in the hash map.
    has(key) {
      return this.get(key) !== null;
    },

    // 5. remove(key) If the given key is in the hash map, remove the entry with that key and return true.
    // If the key isn’t in the hash map, it should return false.
    remove(key) {
      const index = this.hash(key);
      const bucket = buckets[index];

      for (let i = 0; i < bucket.length; i++) {
        if (key === bucket[i][0]) {
          bucket.splice(i, 1);
          size--;
          return true;
        }
      }

      return false;
    },

    // 6. length() returns the number of stored keys in the hash map.
    length() {
      return size;
    },

    // 7. clear() removes all entries in the hash map.
    clear() {
      buckets = Array(capacity)
        .fill(null)
        .map(() => []);
      size = 0;
      return this;
    },

    // 8. keys() returns an array containing all the keys inside the hash map.
    keys() {
      let keyArray = [];

      for (const element of buckets) {
        if (element.length > 0) {
          for (const elementInner of element) {
            keyArray.push(elementInner[0]);
          }
        }
      }

      return keyArray;
    },

    // 9. values() returns an array containing all the values.
    values() {
      let valueArray = [];

      for (const element of buckets) {
        if (element.length > 0) {
          for (const elementInner of element) {
            valueArray.push(elementInner[1]);
          }
        }
      }

      return valueArray;
    },

    // 10. entries() returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
    entries() {
      let entryArray = [];

      for (const element of buckets) {
        if (element.length > 0) {
          for (const elementInner of element) {
            entryArray.push(elementInner);
          }
        }
      }

      return entryArray;
    },

    completeMap() {
      return buckets;
    },
  };
}

function createHashSet() {
  const map = hashMap();

  return {
    add(key) {
      map.set(key, true);
      return this;
    },
    has(key) {
      return map.has(key);
    },
    remove(key) {
      return map.remove(key);
    },
    length() {
      return map.length();
    },
    clear() {
      map.clear();
      return this;
    },
    keys() {
      return map.keys();
    },
    values() {
      return map.keys();
    },
    entries() {
      return map.keys().map((k) => [k]);
    },
  };
}
