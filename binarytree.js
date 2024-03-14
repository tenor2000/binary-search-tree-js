export function Node(value, parent=null) {
    return {
        value,
        parent,
        left: null,
        right: null
    };
}

export function Tree() {
    return {
        root: null,
        buildTree(array) {
            const newArray = array.filter((value, index, self) => self.indexOf(value) === index)
            newArray.sort((a, b) => a - b)

            function buildTreeHelper(arr, parent) {
                if (arr.length === 0) return null;
                const rootIndex = Math.floor(arr.length / 2);
                const root = new Node(arr[rootIndex]);

                const left = arr.slice(0, rootIndex);
                const right = arr.slice(rootIndex + 1);

                root.left = buildTreeHelper(left, root)
                root.right = buildTreeHelper(right, root)
                root.parent = parent

                return root
            }
            this.root = buildTreeHelper(newArray, null)
            return this.root
        },
        insert(value) {
            let current = this.root
            if (!current) {
                this.root = new Node(value)
                return this
            }
            const insertRecursive = (newValue) => {
                if (newValue < current.value) {
                    if (current.left === null) {
                        current.left = new Node(newValue, current)
                    } else {
                        current = current.left
                        insertRecursive(newValue)
                    }
                } else if (newValue > current.value) {
                    if (current.right === null) {
                        current.right = new Node(newValue, current)
                    } else {
                        current = current.right
                        insertRecursive(newValue)
                    }
                }
                return current
            };
            
            return insertRecursive(value)
        },
        deleteItem(value) {
            const foundNode = this.find(value);
            console.log(foundNode)

            if (!foundNode.left && !foundNode.right) {
                if (foundNode.parent.left === foundNode) {
                    console.log(`deleting ${foundNode.value}`)
                    foundNode.parent.left = null
                } else if (foundNode.parent.right === foundNode) {
                    console.log(`deleting ${foundNode.value}`)
                    foundNode.parent.right = null
                }
                return this
            }

            if (!foundNode.left || !foundNode.right) {
                if (foundNode.left) {
                    foundNode.left.parent = foundNode.parent
                    if (foundNode.parent.left === foundNode) {
                        foundNode.parent.left = foundNode.left
                    } else if (foundNode.parent.right === foundNode) {
                        foundNode.parent.right = foundNode.left
                    }
                } else if (foundNode.right) {
                    foundNode.right.parent = foundNode.parent
                    if (foundNode.parent.left === foundNode) {
                        foundNode.parent.left = foundNode.right
                    } else if (foundNode.parent.right === foundNode) {
                        foundNode.parent.right = foundNode.right
                    }
                }
                return this
            }

            if (foundNode.left && foundNode.right) {
                let successor = foundNode.right
                while (successor.left) {
                    successor = successor.left
                }
                foundNode.value = successor.value
                this.deleteItem(successor.value)
                return this
            }

            return null
        },
        find(value) {
            function findRecursive(current, target) {
                if (!current) {
                    console.log(`value ${target} not found`)
                    return null
                }
                if (target === current.value) {
                    console.log('Found number')
                    return current
                }
                
                if (target < current.value) {
                    return findRecursive(current.left, target)
                } 
                if (!current.right) {
                    console.log(`value ${target} not found`)
                }
                return findRecursive(current.right, target)
            }

            return findRecursive(this.root,value)
        },
        levelOrder(callback) {

        },
        inOrder(callback) {

        },
        preOrder(callback) {

        },
        postOrder(callback) {

        },
        height(node) {
            
        },
        depth(node) {

        },
        isBalanced() {

        },
        rebalance() {
            
        }
    }
}