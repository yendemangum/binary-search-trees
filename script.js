function Node(data) {
  this.data = data;
  this.left = null;
  this.right = null;
  return { data, left, right };
}

function Tree(array) {
  this.root = buildTree(array);

  function buildTree(array) {
    array = array.sort((a, b) => a - b);
    array = array.filter((value, index) => array.indexOf(value) === index);
    function arrayToBSTRecur(array, start, end) {
      if (start > end) return null;
      let mid = start + Math.floor((end - start) / 2);
      let root = Node(array[mid]);
      root.left = arrayToBSTRecur(array, start, mid - 1);
      root.right = arrayToBSTRecur(array, mid + 1, end);
      return root;
    }
    function arrayToBST(array) {
      return arrayToBSTRecur(array, 0, array.length - 1);
    }
    let root = arrayToBST(array);
    return root;
  }

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  function insert(node = root, value) {
    if (node == null) {
      node = Node(value);
      return root;
    } else if (node.data == value) return root;
    else if (value < node.data) {
      insert(node.left, value);
    } else if (value > node.data) insert(node.right, value);
  }
  function deleteItem(node = root, value) {
    if (node == null) return root;
    if (node.data == value) {
      if (node.left == null && node.right == null) {
        node = null;
        return root;
      } else if (node.left && !node.right) {
        let copy = node.left;
        node = copy;
        return root;
      } else if (node.right && !node.left) {
        let copy = node.right;
        node = copy;
        return root;
      } else if (node.right && node.left) {
        let copy = node.right;
        while (copy.left) {
          copy = copy.left;
        }
        node.data = copy.data;
        deleteItem(copy, copy.data);
        return root;
      }
    } else if (value < node.data) {
      deleteItem(node.left, value);
    } else if (value > node.data) {
      deleteItem(node.right, value);
    }
  }
  function find(node = root, value) {
    if (node == null) {
      return "value not in tree";
    }
    if (node.data == value) {
      return node;
    } else if (value < node.data) {
      find(node.left, value);
    } else if (value > node.data) {
      find(node.right, value);
    }
  }

  function levelOrder(callback) {
    if (callback == undefined) {
      throw new Error("Callback required");
    }
    let q = [];
    q.push(root);
    while (!q.isEmpty) {
      let node = q[0];
      if (node == undefined) break;
      callback(node.data);
      if (node.left != null) {
        q.push(node.left);
      }
      if (node.right != null) {
        q.push(node.right);
      }
      q.shift();
    }
  }

  function preOrder(callback, node = root) {
    if (callback == undefined) {
      throw new Error("Callback required");
    }
    if (node == null) return;
    callback(node.data);
    preOrder(callback, node.left);
    preOrder(callback, node.right);
  }

  function inOrder(callback, node = root) {
    if (callback == undefined) {
      throw new Error("Callback required");
    }
    if (node == null) return;
    inOrder(callback, node.left);
    callback(node.data);
    inOrder(callback, node.right);
  }
  function postOrder(callback, node = root) {
    if (callback == undefined) {
      throw new Error("Callback required");
    }
    if (node == null) return;
    postOrder(callback, node.left);
    postOrder(callback, node.right);
    callback(node.data);
  }

  function height(node) {
    if (node) {
      if (node.left == null && node.right == null) {
        return 0;
      } else if (node.left) {
        return 1 + height(node.left);
      } else if (node.right) {
        return 1 + height(node.right);
      }
    } else return 0;
  }

  function depth(node = root, target) {
    if (node == target) {
      return 0;
    } else if (target.data < node.data) {
      return 1 + depth(node.left, target);
    } else if (target.data > node.data) {
      return 1 + depth(node.right, target);
    }
  }

  function isBalanced(node = root) {
    if (node === null) return true;
    if (
      Math.abs(height(node.left) - height(node.right)) <= 1 &&
      isBalanced(node.left) == true &&
      isBalanced(node.right) == true
    ) {
      return true;
    } else return false;
  }

  function rebalance() {
    let newArray = [];
    buildTree(inOrder(newArray.push()));
  }

  return {
    root,
    buildTree,
    prettyPrint,
    insert,
    deleteItem,
    find,
    levelOrder,
    preOrder,
    inOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

let test = [];

for (let i = 0; i < 100; i++) {
  test.push(100 * Math.random());
}

let tree = Tree(test);

tree.prettyPrint(tree.root);
