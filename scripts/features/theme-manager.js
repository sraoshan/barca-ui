globalThis.BarcaUI ??= {};

if (!globalThis.BarcaUI.actorThemeHookRegistered) {
    globalThis.BarcaUI.actorThemeHookRegistered = true;

    Hooks.on("renderActorSheet", (app, html) => {
        const actor = app.actor;

        if (!actor) return;

        const root = html[0];

        const windowEl =
    app.element?.[0];

        if (!root) return;

        const removeThemeClasses = (el) => {
            if (!el) return;

            const themeClasses = [
                ...el.classList
            ].filter((c) =>
                c.startsWith("theme-")
            );

            el.classList.remove(...themeClasses);
  
        };

        const removeLayoutClasses = (el) => {
    if (!el) return;

    const layoutClasses = [
        ...el.classList
    ].filter((c) =>
        c.startsWith("layout-")
    );

    el.classList.remove(...layoutClasses);
};

const removePortraitClasses = (el) => {

    if (!el) return;

    const portraitClasses = [
        ...el.classList
    ].filter((c) =>
        c.startsWith("portrait-")
    );

    el.classList.remove(
        ...portraitClasses
    );
};

const parsePortraitFX = (
    fxString = ""
) => {

    const fx = {

        flipX: false,
        flipY: false,

        opacity: 1,

        blend: "normal",

        glow: 0,
        shadow: 0,

        grayscale: 0,

        brightness: 1,
        contrast: 1,

        rotate: 0,

        blur: 0,

        saturate: 1,

        hue: 0,

        sepia: 0
    };

    const tokens =
        fxString
            .split(" ")
            .filter(Boolean);

    tokens.forEach((token) => {

        if (token === "flip-x") {
            fx.flipX = true;
        }

        else if (token === "flip-y") {
            fx.flipY = true;
        }

        else if (
            token.startsWith("opacity-")
        ) {

            fx.opacity =
                Number(
                    token.replace(
                        "opacity-",
                        ""
                    )
                );
        }

        else if (
            token.startsWith("blend-")
        ) {

            fx.blend =
                token.replace(
                    "blend-",
                    ""
                );
        }

        else if (
            token.startsWith("glow-")
        ) {

            fx.glow =
                Number(
                    token.replace(
                        "glow-",
                        ""
                    )
                );
        }

        else if (
            token.startsWith("shadow-")
        ) {

            fx.shadow =
                Number(
                    token.replace(
                        "shadow-",
                        ""
                    )
                );
        }

        else if (
            token.startsWith("grayscale-")
        ) {

            fx.grayscale =
                Number(
                    token.replace(
                        "grayscale-",
                        ""
                    )
                );
        }

        else if (
            token.startsWith("brightness-")
        ) {

            fx.brightness =
                Number(
                    token.replace(
                        "brightness-",
                        ""
                    )
                );
        }

        else if (
            token.startsWith("contrast-")
        ) {

            fx.contrast =
                Number(
                    token.replace(
                        "contrast-",
                        ""
                    )
                );
        }
        else if (
    token.startsWith("rotate-")
) {

    fx.rotate =
        Number(
            token.replace(
                "rotate-",
                ""
            )
        );
}

else if (
    token.startsWith("blur-")
) {

    fx.blur =
        Number(
            token.replace(
                "blur-",
                ""
            )
        );
}

else if (
    token.startsWith("saturate-")
) {

    fx.saturate =
        Number(
            token.replace(
                "saturate-",
                ""
            )
        );
}

else if (
    token.startsWith("hue-")
) {

    fx.hue =
        Number(
            token.replace(
                "hue-",
                ""
            )
        );
}

else if (
    token.startsWith("sepia-")
) {

    fx.sepia =
        Number(
            token.replace(
                "sepia-",
                ""
            )
        );
}
    });

    return fx;
};



        removeThemeClasses(windowEl);
        removeLayoutClasses(windowEl);

        

        const themeId =
            actor.getFlag("barca-ui", "themeId");

            if (!themeId) return;

        const themeClass =
    `theme-${themeId}`;

windowEl.classList.add(
    themeClass
);

            const layoutId =
    actor.getFlag(
        "barca-ui",
        "layoutId"
    ) || "default";

    const layoutClass =
    `layout-${layoutId}`;

windowEl.classList.add(
    layoutClass
);

const portraitMode =
    actor.getFlag(
        "barca-ui",
        "portraitMode"
    ) || "single";

    const portraitCenter =
    actor.getFlag(
        "barca-ui",
        "portraitCenter"
    );

const portraitLeft =
    actor.getFlag(
        "barca-ui",
        "portraitLeft"
    );

const portraitRight =
    actor.getFlag(
        "barca-ui",
        "portraitRight"
    );

    const portraitCenterFX =
    parsePortraitFX(
        actor.getFlag(
            "barca-ui",
            "portraitCenterFX"
        )
    );

const portraitLeftFX =
    parsePortraitFX(
        actor.getFlag(
            "barca-ui",
            "portraitLeftFX"
        )
    );

const portraitRightFX =
    parsePortraitFX(
        actor.getFlag(
            "barca-ui",
            "portraitRightFX"
        )
    );

    removePortraitClasses(windowEl);

windowEl.classList.add(
    `portrait-${portraitMode}`
);

windowEl.querySelectorAll(
    ".barca-portrait"
).forEach((el) => el.remove());

const sheetTop =
    windowEl.querySelector(
        ".sheet-top"
    );

const createPortrait = (
    type,
    src
) => {

    if (!src || !sheetTop) return;

    const portrait =
        document.createElement("div");

    portrait.classList.add(
        "barca-portrait",
        `barca-portrait-${type}`
    );

    portrait.style.backgroundImage =
    `url("${src}")`;

        const fxMap = {

    center: portraitCenterFX,
    left: portraitLeftFX,
    right: portraitRightFX
};

const fx =
    fxMap[type];

portrait.style.setProperty(
    "--portrait-scale-x",
    fx.flipX ? -1 : 1
);

portrait.style.setProperty(
    "--portrait-scale-y",
    fx.flipY ? -1 : 1
);

portrait.style.setProperty(
    "--portrait-opacity",
    fx.opacity
);

portrait.style.setProperty(
    "--portrait-blend",
    fx.blend
);

portrait.style.setProperty(
    "--portrait-glow",
    fx.glow
);

portrait.style.setProperty(
    "--portrait-shadow",
    fx.shadow
);

portrait.style.setProperty(
    "--portrait-grayscale",
    fx.grayscale
);

portrait.style.setProperty(
    "--portrait-brightness",
    fx.brightness
);

portrait.style.setProperty(
    "--portrait-contrast",
    fx.contrast
);

portrait.style.setProperty(
    "--portrait-rotate",
    `${fx.rotate}deg`
);

portrait.style.setProperty(
    "--portrait-blur",
    `${fx.blur}px`
);

portrait.style.setProperty(
    "--portrait-saturate",
    fx.saturate
);

portrait.style.setProperty(
    "--portrait-hue",
    `${fx.hue}deg`
);

portrait.style.setProperty(
    "--portrait-sepia",
    fx.sepia
);


    sheetTop.prepend(portrait);
};

if (
    portraitMode === "single"
) {

    createPortrait(
        "center",
        portraitCenter
    );
}

else if (
    portraitMode === "dual"
) {

    createPortrait(
        "left",
        portraitLeft
    );

    createPortrait(
        "right",
        portraitRight
    );
}

else if (
    portraitMode === "triple"
) {

    createPortrait(
        "left",
        portraitLeft
    );

    createPortrait(
        "center",
        portraitCenter
    );

    createPortrait(
        "right",
        portraitRight
    );
}

console.log(
    "portraitCenter:",
    portraitCenter
);

if (portraitCenter) {

    windowEl.style.setProperty(
    "--barca-portrait-center",
    `url("${portraitCenter}")`
);
}

if (portraitLeft) {

    windowEl.style.setProperty(
    "--barca-portrait-left",
    `url("${portraitLeft}")`
);
}

if (portraitRight) {

    windowEl.style.setProperty(
    "--barca-portrait-right",
    `url("${portraitRight}")`
);
}

const applyPortraitFX = (
    prefix,
    fx
) => {

    windowEl.style.setProperty(
        `--${prefix}-scale-x`,
        fx.flipX ? -1 : 1
    );

    windowEl.style.setProperty(
        `--${prefix}-scale-y`,
        fx.flipY ? -1 : 1
    );

    windowEl.style.setProperty(
        `--${prefix}-opacity`,
        fx.opacity
    );

    windowEl.style.setProperty(
        `--${prefix}-blend`,
        fx.blend
    );

    windowEl.style.setProperty(
        `--${prefix}-glow`,
        fx.glow
    );

    windowEl.style.setProperty(
        `--${prefix}-shadow`,
        fx.shadow
    );

    windowEl.style.setProperty(
        `--${prefix}-grayscale`,
        fx.grayscale
    );

    windowEl.style.setProperty(
        `--${prefix}-brightness`,
        fx.brightness
    );

    windowEl.style.setProperty(
        `--${prefix}-contrast`,
        fx.contrast
    );
};

applyPortraitFX(
    "portrait-center",
    portraitCenterFX
);

applyPortraitFX(
    "portrait-left",
    portraitLeftFX
);

applyPortraitFX(
    "portrait-right",
    portraitRightFX
);

const portraitFlags = [

    "portraitCenterX",
    "portraitCenterY",
    "portraitCenterSize",

    "portraitLeftX",
    "portraitLeftY",
    "portraitLeftSize",

    "portraitRightX",
    "portraitRightY",
    "portraitRightSize"
];



portraitFlags.forEach((flag) => {

    const value =
        actor.getFlag(
            "barca-ui",
            flag
        );

    if (value === undefined) return;

    const cssName =
        "--" + flag
            .replace(/[A-Z]/g,
                (m) => "-" + m.toLowerCase()
            );

    windowEl.style.setProperty(
        cssName,
        `${value}px`
    );
});

        

console.log(windowEl.className);


    });
}



