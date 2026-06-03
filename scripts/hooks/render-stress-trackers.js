/* Stress boxes hidden beyond the actor limit. */

globalThis.BarcaUI ??= {};

if (!globalThis.BarcaUI.renderStressTrackersHookRegistered) {
    globalThis.BarcaUI.renderStressTrackersHookRegistered = true;

    Hooks.on("renderActorSheet", (app, html) => {
        const actor = app.actor;

        if (!actor) return;

        const maxStress =
            actor.getFlag("barca-qol", "maxStress");

        const stressBoxes = html.find(
            'input.attr-clock[data-name="system.attributes.harm"]'
        );

        stressBoxes.closest(".cell__clock")
            .addClass("barca-stress-track");

        const xpTrack = html.find(
            '.cell--improvement .cell__clock'
        );

            xpTrack.addClass("barca-progress-track");

            

        stressBoxes.each((index, element) => {
            element.classList.add("barca-stress-box");
            element.classList.toggle("is-filled", element.checked);
            element.classList.toggle("is-disabled", element.disabled);

            const step = Number(element.dataset.step);

            if (maxStress !== undefined && step >= maxStress) {
                element.disabled = true;
                element.classList.add("stress-sealed");
                element.classList.add("is-sealed");
                element.classList.add("is-disabled");
            }

        });
    });
}

