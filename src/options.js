const select = document.getElementById("items-per-row");
const save = document.getElementById("save");
const status = document.getElementById("status");

for (let n = BETTER_YT_UI.minItemsPerRow; n <= BETTER_YT_UI.maxItemsPerRow; n++) {
    const option = document.createElement("option");
    option.value = String(n);
    option.textContent = String(n);
    select.appendChild(option);
}

select.value = String(BETTER_YT_UI.defaultItemsPerRow);

chrome.storage.local.get(
    { [BETTER_YT_UI.storageKey]: BETTER_YT_UI.defaultItemsPerRow },
    (data) => {
        if (chrome.runtime.lastError) {
            return;
        }
        select.value = String(normalizeItemsPerRow(data[BETTER_YT_UI.storageKey]));
    }
);

save.addEventListener("click", () => {
    const itemsPerRow = normalizeItemsPerRow(select.value);
    chrome.storage.local.set({ [BETTER_YT_UI.storageKey]: itemsPerRow }, () => {
        const failed = Boolean(chrome.runtime.lastError);
        status.textContent = failed ? "無法儲存" : "已儲存";
        status.classList.toggle("is-error", failed);
    });
});
