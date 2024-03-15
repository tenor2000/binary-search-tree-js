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

            function buildTreeRecursive(arr, parent) {
                if (arr.length === 0) return null;
                const rootIndex = Math.floor(arr.length / 2);
                const root = new Node(arr[rootIndex]);

                const left = arr.slice(0, rootIndex);
                const right = arr.slice(rootIndex + 1);

                root.left = buildTreeRecursive(left, root)
                root.right = buildTreeRecursive(right, root)
                root.parent = parent

                return root
            }
            this.root = buildTreeRecursive(newArray, null)
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
            const targetNode = this.find(value);
            if (!targetNode) {
                return null
            }
            // If node has no children
            if (!targetNode.left && !targetNode.right) {
                if (targetNode.parent.left === targetNode) {
                    targetNode.parent.left = null
                } else if (targetNode.parent.right === targetNode) {
                    targetNode.parent.right = null
                }
                console.log(`deleting ${targetNode.value}`)
                
            }
            // If node has only one child
            if (!targetNode.left || !targetNode.right) {
                if (targetNode.left) {
                    targetNode.left.parent = targetNode.parent
                    if (targetNode.parent.left === targetNode) {
                        targetNode.parent.left = targetNode.left
                    } else if (targetNode.parent.right === targetNode) {
                        targetNode.parent.right = targetNode.left
                    }
                } else if (targetNode.right) {
                    targetNode.right.parent = targetNode.parent
                    if (targetNode.parent.left === targetNode) {
                        targetNode.parent.left = targetNode.right
                    } else if (targetNode.parent.right === targetNode) {
                        targetNode.parent.right = targetNode.right
                    }
                }
                console.log(`deleting ${targetNode.value}`)
            }
            // If node has two children
            if (targetNode.left && targetNode.right) {
                let successor = targetNode.right
                while (successor.left) {
                    successor = successor.left
                }
                targetNode.value = successor.value;
                if (successor.parent.left === successor) {
                    successor.parent.left = successor.right;
                } else {
                    successor.parent.right = successor.right;
                }
            }

            return this.root
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
                
                return findRecursive(current.right, target)
            }

            return findRecursive(this.root,value)
        },
        levelOrder(callback=null) {
            // Breadth First Search
            if (!this.root) {
                return []
            }
            const queue = [this.root]
            function levelOrderRecursive(result=[]) {
                if (queue.length === 0) {
                    return result
                }
                const current = queue.shift()
                result.push(current.value)

                if (current.left) {
                    queue.push(current.left)
                }
                if (current.right) {
                    queue.push(current.right)
                }

                return levelOrderRecursive(result)
            }

            const result = levelOrderRecursive()

            if (callback) {
                return result.map(callback)
            }

            return result
        },
        inOrder(callback) {
            // Depth First Search
            function inOrderRecursive(current, result=[]) {
                if (!current) {
                    return null
                }
                inOrderRecursive(current.left, result);
                result.push(current.value);
                inOrderRecursive(current.right, result);

                return result;
            }

            const result = inOrderRecursive(this.root)

            if (callback) {
                return result.map(callback)
            }

            return result
        },
        preOrder(callback) {
            // Depth First Search
            function preOrderRecursive(current, result=[]) {
                if (!current) {
                    return null
                }
                result.push(current.value);
                preOrderRecursive(current.left, result);
                preOrderRecursive(current.right, result);
                
                return result;
            }

            const result = preOrderRecursive(this.root)

            if (callback) {
                return result.map(callback)
            }

            return result
        },
        postOrder(callback) {
            // Depth First Search
            function postOrderRecursive(current, result=[]) {
                if (!current) {
                    return null
                }
                
                postOrderRecursive(current.left, result);
                postOrderRecursive(current.right, result);
                result.push(current.value);
                
                return result;
            }

            const result = postOrderRecursive(this.root)

            if (callback) {
                return result.map(callback)
            }

            return result
        },
        height(node) {
            console.log('WIP')
        },
        depth(node) {
            console.log('WIP')
        },
        isBalanced() {
            console.log('WIP')
        },
        rebalance() {
            console.log('WIP')
        }
    }
}