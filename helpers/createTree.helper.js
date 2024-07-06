const createTree = (array, parentId = "") => {
  const newArray = [];

  for (const item of array) {
    if(item.parent_id == parentId) {
      const children = createTree(array, item.id);
      if(children.length > 0) {
        item.children = children;
      }
      newArray.push(item);
    }
  }

  return newArray;
}

module.exports = (array, parentId = "") => {
  const tree = createTree(array, parentId);
  return tree;
}