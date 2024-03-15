import { Tree } from './binarytree.js'

const treeArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const tree = new Tree();

tree.buildTree(treeArray)

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

prettyPrint(tree.root);
tree.insert(66)
tree.insert(10)
console.log(tree.find(98))
prettyPrint(tree.root);
tree.deleteItem(8)
prettyPrint(tree.root);
console.log(tree.inOrder())
console.log(tree.postOrder())