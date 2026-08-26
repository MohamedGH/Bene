export function required(value) {
  return typeof value === "string" ? value.trim().length > 0 : Boolean(value);
}

export function uniqueSkills(skills) {
  return [...new Set((skills || []).map((skill) => skill.trim()).filter(Boolean))];
}

export function normalizeEntity(entity, fields) {
  return fields.reduce((result, field) => {
    if (typeof result[field] === "string") result[field] = result[field].trim();
    return result;
  }, { ...entity });
}
