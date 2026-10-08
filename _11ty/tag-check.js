// Warns during the build when two tags look like the same tag spelled differently,
// so a typo doesn't quietly split posts across separate tag pages.

const IGNORED = ["all", "post", "snapshot"];

// "Moné", "mone", "MONE" and "mo-ne" all become "mone"
function normalize(tag) {
  return tag.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function editDistance(a, b) {
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    for (let j = 1; j <= b.length; j++) {
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = curr;
  }
  return prev[b.length];
}

export function warnSimilarTags(items) {
  // tag -> input paths that use it
  const uses = new Map();
  for (const item of items) {
    for (const tag of item.data.tags || []) {
      if (IGNORED.includes(tag)) continue;
      if (!uses.has(tag)) uses.set(tag, []);
      uses.get(tag).push(item.inputPath);
    }
  }

  const describe = tag => `"${tag}" (${uses.get(tag).join(", ")})`;
  const tags = [...uses.keys()];
  const warnings = [];

  for (let i = 0; i < tags.length; i++) {
    for (let j = i + 1; j < tags.length; j++) {
      const a = normalize(tags[i]);
      const b = normalize(tags[j]);
      if (a === b) {
        warnings.push(`same tag spelled differently: ${describe(tags[i])} and ${describe(tags[j])}`);
      } else if (Math.min(a.length, b.length) >= 4 && editDistance(a, b) === 1) {
        warnings.push(`possible typo: ${describe(tags[i])} and ${describe(tags[j])}`);
      }
    }
  }

  for (const warning of warnings) {
    console.warn(`[tags] ${warning}`);
  }
}
