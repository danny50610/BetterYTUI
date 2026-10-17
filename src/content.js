/* YouTube 依視窗寬度把每列數量寫在 ytd-rich-grid-renderer 的 inline style。
   卡片寬度是用 --ytd-rich-grid-items-per-row 算的，所以這裡用同樣的變數覆寫。
   樣式表要比元件更早存在，站內導覽也不會重跑 content script，因此掛在 document 上一直留著。 */

const STYLE_ID = "better-yt-ui-items-per-row";
let appliedItemsPerRow = null;

function applyItemsPerRow(itemsPerRow, relayout) {
    if (appliedItemsPerRow === itemsPerRow) {
        return;
    }
    appliedItemsPerRow = itemsPerRow;

    let style = document.getElementById(STYLE_ID);
    if (!style) {
        style = document.createElement("style");
        style.id = STYLE_ID;
        (document.head || document.documentElement).appendChild(style);
    }
    style.textContent =
        "ytd-rich-grid-renderer { --ytd-rich-grid-items-per-row: " + itemsPerRow + " !important; }";

    /* 寬度會跟著變數重算。第一欄標記是 YouTube 自己算的，視窗尺寸事件會讓它再排一次。 */
    if (relayout) {
        window.dispatchEvent(new Event("resize"));
    }
}

applyItemsPerRow(BETTER_YT_UI.defaultItemsPerRow, false);

chrome.storage.local.get(
    { [BETTER_YT_UI.storageKey]: BETTER_YT_UI.defaultItemsPerRow },
    (data) => {
        if (chrome.runtime.lastError) {
            return;
        }
        applyItemsPerRow(normalizeItemsPerRow(data[BETTER_YT_UI.storageKey]), true);
    }
);

chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local" || !Object.prototype.hasOwnProperty.call(changes, BETTER_YT_UI.storageKey)) {
        return;
    }
    applyItemsPerRow(normalizeItemsPerRow(changes[BETTER_YT_UI.storageKey].newValue), true);
});
