/* content.js 與設定頁共用。改範圍時兩邊要一起動，所以集中在這裡。 */
globalThis.BETTER_YT_UI = {
    storageKey: "itemsPerRow",
    defaultItemsPerRow: 5,
    minItemsPerRow: 3,
    maxItemsPerRow: 6,
};

globalThis.normalizeItemsPerRow = function normalizeItemsPerRow(value) {
    const n = Number(value);
    if (!Number.isInteger(n) || n < BETTER_YT_UI.minItemsPerRow || n > BETTER_YT_UI.maxItemsPerRow) {
        return BETTER_YT_UI.defaultItemsPerRow;
    }
    return n;
};
