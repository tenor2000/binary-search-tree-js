import { Tree } from './binarytree.js'

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function generateRandomNumbers(count) {
  const randomNumbers = [];
  for (let i = 0; i < count; i++) {
      randomNumbers.push(Math.floor(Math.random() * 100));
  }
  return randomNumbers;
}

// Driver code
const tree = new Tree();
const randomNumbers = generateRandomNumbers(10);
console.log("Random numbers:", randomNumbers);
tree.buildTree(randomNumbers);

prettyPrint(tree.root);

console.log("Is tree balanced initially?", tree.isBalanced() ? "Yes" : "No");

console.log(tree.levelOrder());
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());

tree.insert(101);
tree.insert(102);
tree.insert(103);

prettyPrint(tree.root);

console.log("Is tree unbalanced after adding numbers > 100?", tree.isBalanced() ? "No" : "Yes");


tree.rebalance();

prettyPrint(tree.root);

console.log("Is tree balanced after rebalancing?", tree.isBalanced() ? "Yes" : "No");

console.log(tree.levelOrder());
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());