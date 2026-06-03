Hooks.on(
    "renderActorSheet",
    async (app, html) => {

        const actor = app.actor;

        let settingsWrapper =
            html[0].querySelector(
                ".barca-sheet-settings"
            );

        if (!settingsWrapper) return;

        const wrapper =
            document.createElement("div");

        wrapper.classList.add(
            "barca-portrait-selector"
        );

        const currentMode =
            actor.getFlag(
                "barca-ui",
                "portraitMode"
            ) || "single";

        const center =
            actor.getFlag(
                "barca-ui",
                "portraitCenter"
            ) || "";

        const left =
            actor.getFlag(
                "barca-ui",
                "portraitLeft"
            ) || "";

        const right =
            actor.getFlag(
                "barca-ui",
                "portraitRight"
            ) || "";

            

        wrapper.innerHTML = `
    <label class="barca-label">
        Portrait
    </label>

    <select class="barca-select portrait-mode">
        <option value="none">
    None
</option>

<option value="single">
    Single
</option>

<option value="dual">
    Dual
</option>

<option value="triple">
    Triple
</option>
    </select>

   <div class="portrait-controls">

    <div class="portrait-block">

        <button
            type="button"
            class="barca-button portrait-picker"
            data-target="center"
        >
            Center Image
        </button>

        <div class="portrait-transform">

            <input
                type="number"
                class="portrait-input"
                data-flag="portraitCenterX"
                placeholder="X"
                value="${
                    actor.getFlag(
                        "barca-ui",
                        "portraitCenterX"
                    ) || 0
                }"

                
            >

            <input
                type="number"
                class="portrait-input"
                data-flag="portraitCenterY"
                placeholder="Y"
                value="${
                    actor.getFlag(
                        "barca-ui",
                        "portraitCenterY"
                    ) || 0
                }"
            >

            <input
                type="number"
                class="portrait-input"
                data-flag="portraitCenterSize"
                placeholder="Size"
                value="${
                    actor.getFlag(
                        "barca-ui",
                        "portraitCenterSize"
                    ) || 420
                }"
                >

                <input
    type="text"
    class="portrait-fx-input"
    data-flag="portraitCenterFX"
    placeholder="flip-x opacity-0.5 glow-0.4"
    value="${
        actor.getFlag(
            "barca-ui",
            "portraitCenterFX"
        ) || ""
    }"
>
            

        </div>
    </div>

    <div class="portrait-block">

        <button
            type="button"
            class="barca-button portrait-picker"
            data-target="left"
        >
            Left Image
        </button>

        <div class="portrait-transform">

            <input
                type="number"
                class="portrait-input"
                data-flag="portraitLeftX"
                placeholder="X"
                value="${
                    actor.getFlag(
                        "barca-ui",
                        "portraitLeftX"
                    ) || 0
                }"
            >

            <input
                type="number"
                class="portrait-input"
                data-flag="portraitLeftY"
                placeholder="Y"
                value="${
                    actor.getFlag(
                        "barca-ui",
                        "portraitLeftY"
                    ) || 0
                }"
            >

            <input
                type="number"
                class="portrait-input"
                data-flag="portraitLeftSize"
                placeholder="Size"
                value="${
                    actor.getFlag(
                        "barca-ui",
                        "portraitLeftSize"
                    ) || 260
                }"
                >

                <input
    type="text"
    class="portrait-fx-input"
    data-flag="portraitLeftFX"
    placeholder="flip-x opacity-0.5 glow-0.4"
    value="${
        actor.getFlag(
            "barca-ui",
            "portraitLeftFX"
        ) || ""
    }"
>
            

        </div>
    </div>

    <div class="portrait-block">

        <button
            type="button"
            class="barca-button portrait-picker"
            data-target="right"
        >
            Right Image
        </button>

        <div class="portrait-transform">

            <input
                type="number"
                class="portrait-input"
                data-flag="portraitRightX"
                placeholder="X"
                value="${
                    actor.getFlag(
                        "barca-ui",
                        "portraitRightX"
                    ) || 0
                }"
            >

            <input
                type="number"
                class="portrait-input"
                data-flag="portraitRightY"
                placeholder="Y"
                value="${
                    actor.getFlag(
                        "barca-ui",
                        "portraitRightY"
                    ) || 0
                }"
            >

            <input
                type="number"
                class="portrait-input"
                data-flag="portraitRightSize"
                placeholder="Size"
                value="${
                    actor.getFlag(
                        "barca-ui",
                        "portraitRightSize"
                    ) || 260
                }"
                >

                <input
    type="text"
    class="portrait-fx-input"
    data-flag="portraitRightFX"
    placeholder="flip-x opacity-0.5 glow-0.4"
    value="${
        actor.getFlag(
            "barca-ui",
            "portraitRightFX"
        ) || ""
    }"
>
            

        </div>
    </div>

</div>

    <div class="portrait-preview">
    </div>
`;

        settingsWrapper.appendChild(
            wrapper
        );

        const preview =
    wrapper.querySelector(
        ".portrait-preview"
    );

preview.innerHTML = `
    ${center ? `
        <img
            src="${center}"
            class="barca-preview"
        >
    ` : ""}

    ${left ? `
        <img
            src="${left}"
            class="barca-preview"
        >
    ` : ""}

    ${right ? `
        <img
            src="${right}"
            class="barca-preview"
        >
    ` : ""}
`;

        const modeSelect =
            wrapper.querySelector(
                ".portrait-mode"
            );

        modeSelect.value =
            currentMode;

        modeSelect.addEventListener(
            "change",
            async (event) => {

                await actor.setFlag(
                    "barca-ui",
                    "portraitMode",
                    event.target.value
                );

                app.render(true);
            }
        );

        wrapper.querySelectorAll(
    ".portrait-picker"
).forEach((button) => {

    button.addEventListener(
        "click",
        async () => {

            const target =
                button.dataset.target;

            const current =
                actor.getFlag(
                    "barca-ui",
                    `portrait${
                        target.charAt(0)
                            .toUpperCase()
                    }${
                        target.slice(1)
                    }`
                ) || "";

            new FilePicker({

                type: "image",

                current,

                source: "data",

                callback: async (path) => {

                    const flagName =
                        `portrait${
                            target.charAt(0)
                                .toUpperCase()
                        }${
                            target.slice(1)
                        }`;

                    await actor.setFlag(
                        "barca-ui",
                        flagName,
                        path
                    );

                    app.render(true);
                }

            }).render(true);
        }
    );
});

wrapper.querySelectorAll(
    ".portrait-input"
).forEach((input) => {

    input.addEventListener(
        "change",
        async () => {

            await actor.setFlag(
                "barca-ui",
                input.dataset.flag,
                Number(input.value)
            );

            app.render(true);
        }
    );
});


wrapper.querySelectorAll(
    ".portrait-fx-input"
).forEach((input) => {

    input.addEventListener(
        "change",
        async () => {

            await actor.setFlag(
                "barca-ui",
                input.dataset.flag,
                input.value
            );

            app.render(true);
        }
    );
});

        
    }
);