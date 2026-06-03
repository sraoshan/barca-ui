Hooks.on(
    "renderActorSheet",
    async (app, html) => {

        const actor = app.actor;

        const current =
            actor.getFlag(
                "barca-ui",
                "layoutId"
            ) || "default";

        
        
        
        
            const wrapper =
            document.createElement("div");

        wrapper.classList.add(
            "barca-layout-selector"
        );

        wrapper.innerHTML = `
            <label class="barca-label">
                Layout
            </label>

            <select class="barca-select">
                <option value="default">
                    Default
                </option>

                <option value="middle-column">
                    Middle Column
                </option>

                <option value="pyramid">
                    Pyramid
                </option>

                <option value="bracket">
                    Bracket
                </option>

                <option value="compact">
                    Compact
                </option>

                <option value="bottom-row">
                    Bottom Row
                </option>

                <option value="top-row">
                    Top Row
                </option>

                
                
            </select>

                
        `;

        const select =
            wrapper.querySelector("select");

        select.value = current;

        select.addEventListener(
            "change",
            async (event) => {

                const value =
                    event.target.value;

                if (value === "default") {

                    await actor.unsetFlag(
                        "barca-ui",
                        "layoutId"
                    );

                } else {

                    await actor.setFlag(
                        "barca-ui",
                        "layoutId",
                        value
                    );
                }
            }
        );

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

settingsWrapper.appendChild(
    wrapper
);
    }
);