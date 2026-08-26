/** Return the category with the requested id, regardless of its depth. */
export function findCategory(categories, categoryId) {
  if (!categoryId) return null;

  for (const category of categories ?? []) {
    if (category.id === categoryId) return category;
    const found = findCategory(category.children, categoryId);
    if (found) return found;
  }

  return null;
}

/** Flatten the category tree for selectors and lookup operations. */
export function flattenCategories(categories, depth = 0, result = []) {
  for (const category of categories ?? []) {
    result.push({ category, depth });
    flattenCategories(category.children, depth + 1, result);
  }
  return result;
}

/** Display a category path such as "Communication > Réseaux > ...". */
export function getCategoryPath(categories, categoryId) {
  const path = [];

  const visit = (nodes) => {
    for (const node of nodes ?? []) {
      path.push(node);
      if (node.id === categoryId) return true;
      if (visit(node.children)) return true;
      path.pop();
    }
    return false;
  };

  return visit(categories) ? [...path] : [];
}
