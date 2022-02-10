# curseforge-v2

CurseForge V2 API Library

## Installing

Using npm:

```bash
$ npm install curseforge-v2
```

## Setup

The client requires a CurseForge API key.
You can learn more about getting a key here: https://support.curseforge.com/en/support/solutions/articles/9000208346-about-the-curseforge-api-and-how-to-apply-for-a-key

## Example

Getting featured addons

```javascript
async function getFeaturedMods() {
  const client = new CFV2Client({ apiKey: 'YOUR_API_KEY' });

  const result = await client.getFeaturedMods({
    gameId: 1,
    gameVersionTypeId: CF2WowGameVersionType.Retail,
    excludedModIds: [],
  });
}
```
