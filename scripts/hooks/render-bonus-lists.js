/* Bonus lists on actor sheets. */

globalThis.BarcaUI ??= {};

if (!globalThis.BarcaUI.renderBonusListsHookRegistered) {
    globalThis.BarcaUI.renderBonusListsHookRegistered = true;

    Hooks.on("renderActorSheet", async (app, html) => {
        const actor = app.actor;

        if (!actor) return;

        const forwards =
            actor.getFlag("barca-qol", "forwards") ?? [];

        const ongoings =
            actor.getFlag("barca-qol", "ongoings") ?? [];

        const bonusBlock = $(`
            <div class="barca-bonuses">
                <hr>
                <h2>Adiante</h2>
                <div class="barca-forward-list"></div>

                <hr>
                <h2>Constante</h2>
                <div class="barca-ongoing-list"></div>
            </div>
        `);

        for (const bonus of forwards) {
            bonusBlock
                .find(".barca-forward-list")
                .append(`
                    <label>
                        <input type="checkbox" checked>
                        ${bonus.label}
                    </label>
                    <br>
                `);
        }

        for (const bonus of ongoings) {
            bonusBlock
                .find(".barca-ongoing-list")
                .append(`
                    <label>
                        <input type="checkbox" checked>
                        ${bonus.label}
                    </label>
                    <br>
                `);
        }

        html.find(".sheet-body").append(bonusBlock);
    });
}
