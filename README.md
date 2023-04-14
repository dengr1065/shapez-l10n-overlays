# shapez Localization (L10N) Overlays

![GitHub last commit](https://img.shields.io/github/last-commit/dengr1065/shapez-l10n-overlays)
![GitHub contributors](https://img.shields.io/github/contributors/dengr1065/shapez-l10n-overlays)

This project aims to provide better and more up-to-date localization data for [shapez]. Translated
strings are distributed using a generated mod file, which can be added to the game to apply
localization. Unlike [the game itself](source-translations), only modified strings are contained in
localization (overlay) files.

### Advantages

-   No need to wait for game updates
-   Less knowledge required to contribute
-   Can be tested without building the game

### Disadvantages

-   Usage of mods disables achievements

## Translating

Modifying the localization files using the GitHub's web editor is discouraged, as it can lead to
mistakes. I recommend using [Visual Studio Code](vscode) with the [YAML plugin](vscode-yaml).

-   Fork the repository and clone it.
-   Edit a localization file in `overlays/`.
    -   If you want to add new strings, take a look at the
        [upstream localization files](source-translations).
-   Test your changes in the game. (optional)
-   Add yourself to `authors.yml`.
-   Submit a [pull request](pull-request).

## Testing

[Node.js](nodejs) and [Yarn](yarn) are needed for the generation scripts. You can generate mod files
from overlay files using the provided scripts, but make sure the dependencies are installed first:

```bash
yarn install # Install the dependencies
yarn generate de # Generate a mod for German L10N
```

[shapez]: https://github.com/tobspr-games/shapez.io
[source-translations]: https://github.com/tobspr-games/shapez.io/tree/master/translations
[vscode]: https://code.visualstudio.com/
[vscode-yaml]: https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml
[pull-request]: https://github.com/dengr1065/shapez-l10n-overlays/pulls
