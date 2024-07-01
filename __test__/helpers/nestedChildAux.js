export const getNestedChild = (obj, depth) => {
    if (depth === 0 || !obj?.children) return obj;
    return getNestedChild(obj.children[0], depth - 1);
  }
  
  