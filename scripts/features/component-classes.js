globalThis.BarcaUI ??= {};

if (!globalThis.BarcaUI.componentClassesHookRegistered) {
    globalThis.BarcaUI.componentClassesHookRegistered = true;

    const applyComponentClasses = (html) => {
        html.find(".tabs a, nav.tabs a, .sheet-tabs a")
            .addClass("barca-tab barca-pill");

        html.find('input:not([type="checkbox"]):not([type="radio"])')
            .addClass("barca-input");

        html.find("textarea")
            .addClass("barca-textarea");

        html.find("select")
            .addClass("barca-select");

        html.find("h1, h2, h3, .window-title")
            .addClass("barca-title");

        html.find("label")
            .addClass("barca-label");
    };

    Hooks.on("renderActorSheet", (app, html) => {
        applyComponentClasses(html);
    });

    Hooks.on("renderItemSheet", (app, html) => {
        applyComponentClasses(html);
    });
}
