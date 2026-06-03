Hooks.on("renderActorSheet", async (app, html) => {
    console.log("renderActorSheet");

    const actor = app.actor;

    if (!actor) return;

    if (html[0].querySelector(".barca-theme-selector")) {
        return;
    }

    
    
    let settingsWrapper =
    html[0].querySelector(
        ".barca-sheet-settings"
    );

if (!settingsWrapper) {

    settingsWrapper =
        document.createElement("div");

    settingsWrapper.classList.add(
        "barca-sheet-settings"
    );

    const equipmentTab =
        html[0].querySelector(
            '.tab[data-tab="equipment"]'
        );

    equipmentTab?.appendChild(
        settingsWrapper
    );
}
    
    
    
    const wrapper =
        document.createElement("div");

    wrapper.className =
        "barca-theme-selector";

    wrapper.innerHTML = `
        <label class="barca-label">
            Theme
        </label>

        <select class="barca-select barca-theme-select">
            <option value="default">
                Default
            </option>

            <option value="water">
                Purple Rain
            </option>

            <option value="shine">
                Windy Sunset
            </option>

            <option value="moon">
                Azure Moon
            </option>

            <option value="leaf">
                Blooming Garden
            </option>

            <option value="desire">
                Heartless love
            </option>

            <option value="fire">
                Timid Ember
            </option>

            <option value="fiber">
                Glass Apparatus
            </option>

        </select>
    `;

    const select =
        wrapper.querySelector("select");

    select.value =
        actor.getFlag(
            "barca-ui",
            "themeId"
        ) ?? "default";

    select.addEventListener(
        "change",
        async (event) => {
            const value = event.target.value;

            console.log(value);

            if (value === "default") {

    await actor.unsetFlag(
        "barca-ui",
        "themeId"
    );

    console.log(
        actor.getFlag(
            "barca-ui",
            "themeId"
        )
    );

} else {

    await actor.setFlag(
        "barca-ui",
        "themeId",
        value
    );
}
        }
    );

    settingsWrapper.appendChild(
    wrapper
);
});