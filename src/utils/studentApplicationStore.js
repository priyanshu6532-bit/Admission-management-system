const DRAFT_KEY = "studentApplicationDraft";

export function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveDraft(partial) {
  const current = loadDraft();
  const next = { ...current, ...partial };
  localStorage.setItem(DRAFT_KEY, JSON.stringify(next));
  return next;
}

export function clearDraft() {
  localStorage.removeItem(DRAFT_KEY);
}

