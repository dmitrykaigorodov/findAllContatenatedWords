
class Node {

  constructor() {
    this.children = {};
    this.isWord = false;
  }

  add(suffix) {
    if (suffix.length == 1) {
      this.isWord = true;
      return;
    }
    let childLetter = suffix.charAt(0);
    let child = this.children[childLetter];
    let childSuffix = suffix.substr(1);
    if (!child) {
      child = new Node()
      this.children[childLetter] = child
    }
    child.add(childSuffix);
  }

  has(suffix) {
    if (suffix.length == 1) {
      return this.isWord;
    }
    let childLetter = suffix.charAt(0);
    let child = this.children[childLetter];
    if (!child) {
      return false;
    }
    return child.has(suffix.substr(1));
  }

  checkFirstWord(suffix, tree) {
    if (this.isWord) {
      if (tree.hasWord(suffix.substr(1))) {
        return true;
      }
    }
    let childLetter = suffix.charAt(0);
    let child = this.children[childLetter];
    return child && child.checkFirstWord(suffix.substr(1), tree);
  }
}

class Tree {
  constructor() {
    this.root = new Node()
  }
  
  addWord(word) {
    if (word) {
      this.root.add(word)
    }
  }

  isContanatedWord(word) {
    return this.root.checkFirstWord(word, this)
  }

  hasWord(word) {
    if (word){
      // console.log("checking hasWord", word)
      return this.root.has(word);
    }
    return false;
  }

}

function numberOfAllContanetedWords(A) {
  const N = A.length;
  
  if (A.length <= 1) {
    return 0;
  }

  A = A.sort((a, b) => a.length - b.length);

  let tree = new Tree()

  let counter = 0;
  
  A.forEach(word => {
    tree.addWord(word)
    if (word.length >=2) {
      if (tree.isContanatedWord(word)) {
        counter++;
      }
    }
  });

  return counter;

}

function check(A, expected) {
  console.log("TEST", A, expected)
  let actual = numberOfAllContanetedWords(A)
  if (actual != expected) {
    console.log("\x1b[31mFAIL\x1b[0m", actual)
  } else {
    console.log("\x1b[32mPASS\x1b[0m")
  }
}

function test() {
  check([], 0)
  check(["1"], 0)
  check(["a", "aa"], 1)
  check(["a", "b", "c"], 0)
  check(["a", "b", "c", 'abc'], 0)
  check(["a", "b", "c", 'ab'], 1)
  check(["a", "b", "c", 'ab', "ac"], 2)
  check(["cat", "dog", "catsdog"], 0)
  check(["cat", "dog", "catdog"], 1)
  check(["cat", "cats", "dog", "catsdog"], 1)
  check(["cat", "cats", "dog", "catsdog", "catdog", "dogcat"], 3)
  check(["catdog", "cat", "cats", "dog", "catsdog", "dogcat"], 3)
  check([], 0)
}

test()

