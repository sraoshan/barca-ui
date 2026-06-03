Hooks.on("init", () => {
    const sheets = Object.values(CONFIG.Actor.sheetClasses);

    for (const systemSheets of sheets) {
        for (const sheet of systemSheets) {
            sheet.cls.DEFAULT_OPTIONS = foundry.utils.mergeObject(
                sheet.cls.DEFAULT_OPTIONS,
                {
                    minWidth: 820,
                    minHeight: 700
                },
                { inplace: false }
            );
        }
    }
});