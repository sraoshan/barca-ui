/* Forward and ongoing giving moves. */

globalThis.BarcaUI ??= {};

if (!globalThis.BarcaUI.renderMoveSheetHookRegistered) {
    globalThis.BarcaUI.renderMoveSheetHookRegistered = true;

    Hooks.on("renderItemSheet", async (app, html) => {
        const item = app.item;

        if (!item) return;
        if (item.type !== "move") return;

        const detailsTab = html.find('.tab[data-tab="details"]');

        if (!detailsTab.length) return;

        const grantsForward =
            item.getFlag("barca-qol", "grantsForward") ?? false;

        const forwardLabel =
            item.getFlag("barca-qol", "forwardLabel") ?? "";

        const grantsOngoing =
            item.getFlag("barca-qol", "grantsOngoing") ?? false;

        const ongoingLabel =
            item.getFlag("barca-qol", "ongoingLabel") ?? "";

        const block = $(`
            <div class="barca-qol-flags">
                <hr>
                <h3>Barca QoL</h3>

                <div class="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="barca-grants-forward"
                            ${grantsForward ? "checked" : ""}
                        >
                        Gives Forward
                    </label>
                </div>

                <div class="form-group">
                    <label>Condition</label>
                    <input
                        type="text"
                        name="barca-forward-label"
                        value="${forwardLabel}"
                        placeholder="Para proteger alguem"
                    >
                </div>

                <hr>

                <div class="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="barca-grants-ongoing"
                            ${grantsOngoing ? "checked" : ""}
                        >
                        Gives Ongoing
                    </label>
                </div>

                <div class="form-group">
                    <label>Condition</label>
                    <input
                        type="text"
                        name="barca-ongoing-label"
                        value="${ongoingLabel}"
                        placeholder="Para usar em um teste de..."
                    >
                </div>
            </div>
        `);

        detailsTab.append(block);

        html.find('input[name="barca-grants-forward"]').on("change", async (event) => {
            await item.setFlag(
                "barca-qol",
                "grantsForward",
                event.target.checked
            );
        });

        html.find('input[name="barca-forward-label"]').on("change", async (event) => {
            await item.setFlag(
                "barca-qol",
                "forwardLabel",
                event.target.value
            );
        });

        html.find('input[name="barca-grants-ongoing"]').on("change", async (event) => {
            await item.setFlag(
                "barca-qol",
                "grantsOngoing",
                event.target.checked
            );
        });

        html.find('input[name="barca-ongoing-label"]').on("change", async (event) => {
            await item.setFlag(
                "barca-qol",
                "ongoingLabel",
                event.target.value
            );
        });
    });
}
