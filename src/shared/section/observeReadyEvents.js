export function observeReadyEvents(callback) {
    const readySections = new Set();

    document.addEventListener("ready", (event) => {
        const element = event.target;
        if (readySections.has(element)) return;
        readySections.add(element);
        callback(element);
    });
}
