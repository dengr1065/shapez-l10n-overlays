const metadata = {
    website: "https://github.com/dengr1065/shapez-l10n-overlays",
    doesNotAffectSavegame: true,
    id: `l10n-overlay-${__L10N_LANG__}`,
    ...__L10N__.metadata,
};

delete __L10N__.metadata;

class L10NMod extends shapez.Mod {
    init() {
        this.modInterface.registerTranslations(__L10N_LANG__, __L10N__);
    }
}

window.$shapez_registerMod(L10NMod, metadata);
