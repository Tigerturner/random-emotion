const categorizedEmotions = [
  // positive Gefühle
  { emotion: "angeregt", category: "positive Gefühle" },
  { emotion: "ausgelassen", category: "positive Gefühle" },
  { emotion: "begeistert", category: "positive Gefühle" },
  { emotion: "dankbar", category: "positive Gefühle" },
  { emotion: "entspannt", category: "positive Gefühle" },
  { emotion: "erfreut", category: "positive Gefühle" },
  { emotion: "fasziniert", category: "positive Gefühle" },
  { emotion: "friedlich", category: "positive Gefühle" },
  { emotion: "froh", category: "positive Gefühle" },
  { emotion: "fröhlich", category: "positive Gefühle" },
  { emotion: "gelassen", category: "positive Gefühle" },
  { emotion: "glücklich", category: "positive Gefühle" },
  { emotion: "hoffnungsvoll", category: "positive Gefühle" },
  { emotion: "inspiriert", category: "positive Gefühle" },
  { emotion: "interessiert", category: "positive Gefühle" },
  { emotion: "lebendig", category: "positive Gefühle" },
  { emotion: "liebevoll", category: "positive Gefühle" },
  { emotion: "mutig", category: "positive Gefühle" },
  { emotion: "optimistisch", category: "positive Gefühle" },
  { emotion: "ruhig", category: "positive Gefühle" },
  { emotion: "selbstsicher", category: "positive Gefühle" },
  { emotion: "stolz", category: "positive Gefühle" },
  { emotion: "überglücklich", category: "positive Gefühle" },
  { emotion: "verspielt", category: "positive Gefühle" },
  { emotion: "zufrieden", category: "positive Gefühle" },
  { emotion: "zuversichtlich", category: "positive Gefühle" },

  // negative Gefühle
  { emotion: "aggressiv", category: "negative Gefühle" },
  { emotion: "ängstlich", category: "negative Gefühle" },
  { emotion: "ärgerlich", category: "negative Gefühle" },
  { emotion: "aufgebracht", category: "negative Gefühle" },
  { emotion: "bedrückt", category: "negative Gefühle" },
  { emotion: "beunruhigt", category: "negative Gefühle" },
  { emotion: "deprimiert", category: "negative Gefühle" },
  { emotion: "einsam", category: "negative Gefühle" },
  { emotion: "empört", category: "negative Gefühle" },
  { emotion: "enttäuscht", category: "negative Gefühle" },
  { emotion: "erschöpft", category: "negative Gefühle" },
  { emotion: "frustriert", category: "negative Gefühle" },
  { emotion: "gereizt", category: "negative Gefühle" },
  { emotion: "hilflos", category: "negative Gefühle" },
  { emotion: "irritiert", category: "negative Gefühle" },
  { emotion: "misstrauisch", category: "negative Gefühle" },
  { emotion: "müde", category: "negative Gefühle" },
  { emotion: "nervös", category: "negative Gefühle" },
  { emotion: "ratlos", category: "negative Gefühle" },
  { emotion: "ruhelos", category: "negative Gefühle" },
  { emotion: "schockiert", category: "negative Gefühle" },
  { emotion: "traurig", category: "negative Gefühle" },
  { emotion: "ungeduldig", category: "negative Gefühle" },
  { emotion: "unsicher", category: "negative Gefühle" },
  { emotion: "verwirrt", category: "negative Gefühle" },
  { emotion: "verzweifelt", category: "negative Gefühle" },
  { emotion: "wütend", category: "negative Gefühle" },
  { emotion: "zornig", category: "negative Gefühle" },

  // neutrale Gefühle
  { emotion: "albern", category: "neutrale Gefühle" },
  { emotion: "ambivalent", category: "neutrale Gefühle" },
  { emotion: "aufgewühlt", category: "neutrale Gefühle" },
  { emotion: "entschieden", category: "neutrale Gefühle" },
  { emotion: "fürsorglich", category: "neutrale Gefühle" },
  { emotion: "gelöst", category: "neutrale Gefühle" },
  { emotion: "gespannt", category: "neutrale Gefühle" },
  { emotion: "intellektuell", category: "neutrale Gefühle" },
  { emotion: "melancholisch", category: "neutrale Gefühle" },
  { emotion: "nachdenklich", category: "neutrale Gefühle" },
  { emotion: "neugierig", category: "neutrale Gefühle" },
  { emotion: "überzeugt", category: "neutrale Gefühle" },
  { emotion: "zweifelnd", category: "neutrale Gefühle" },
];

const emotionButton = document.getElementById("emotionButton");
const emotionText = document.getElementById("emotionText");
const filterButtons = document.querySelectorAll(".category-filter");
const emotionColorClassMap = {
  "positive Gefühle": "emotion-text--positive",
  "negative Gefühle": "emotion-text--negative",
  "neutrale Gefühle": "emotion-text--neutral",
};

let currentFilter = "all";
const RECENT_HISTORY_SIZE = 13;
const recentEmotionKeys = [];

function getEmotionPoolByFilter(filter) {
  if (filter === "all") return categorizedEmotions;
  return categorizedEmotions.filter((entry) => entry.category === filter);
}

function pickRandomEmotion(filter) {
  const pool = getEmotionPoolByFilter(filter);
  const availablePool = pool.filter((entry) => !recentEmotionKeys.includes(entry.emotion));
  const sourcePool = availablePool.length > 0 ? availablePool : pool;
  const randomIndex = Math.floor(Math.random() * sourcePool.length);
  return sourcePool[randomIndex];
}

function trackRecentEmotion(emotion) {
  recentEmotionKeys.push(emotion);
  if (recentEmotionKeys.length > RECENT_HISTORY_SIZE) {
    recentEmotionKeys.shift();
  }
}

function capitalizeFirstLetter(text) {
  if (!text) return text;
  return text.charAt(0).toLocaleUpperCase("de-DE") + text.slice(1);
}

function showRandomEmotion(filter) {
  const nextEmotion = pickRandomEmotion(filter);
  emotionText.textContent = capitalizeFirstLetter(nextEmotion.emotion);
  emotionText.classList.remove("emotion-text--positive", "emotion-text--negative", "emotion-text--neutral");
  emotionText.classList.add(emotionColorClassMap[nextEmotion.category] ?? "emotion-text--neutral");
  trackRecentEmotion(nextEmotion.emotion);
}

function updateActiveFilterChip(selectedFilter) {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === selectedFilter;
    button.classList.toggle("is-active", isActive);
  });
}

emotionButton.addEventListener("click", () => {
  showRandomEmotion(currentFilter);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter ?? "all";
    updateActiveFilterChip(currentFilter);
    showRandomEmotion(currentFilter);
  });
});

updateActiveFilterChip(currentFilter);
