import 'dotenv/config';
import { CF2WowGameVersionType } from '../curseforge-api-v2';
import { CFV2Client } from '../index';

jest.setTimeout(10000);

const _apiKey = process.env.CF_V2_API_KEY || '';

function simpleClient() {
  return new CFV2Client({ apiKey: _apiKey });
}

test('Client Setup Test', () => {
  const client = simpleClient();
  expect(client).toBeTruthy();
});

test('Client Setup Empty Fail Test', () => {
  expect(() => new CFV2Client({ apiKey: '' })).toThrow();
});

// Test Overrides

test('Client Overrides Success', async () => {
  const ua = 'curseforge-v2/1.0.0';
  const key = 'none';

  const client = new CFV2Client({
    apiKey: 'none',
    apiUrl: `https://httpbin.org/anything`,
    headers: {
      'User-Agent': ua,
    },
  });
  const result = await client.getModDescrption(558086);

  expect(result.statusCode).toEqual(200);
  expect(result.data).toBeTruthy();
  expect((result.data as any)?.headers).toBeTruthy();
  expect((result.data as any)?.headers['User-Agent']).toEqual(ua);
  expect((result.data as any)?.headers['X-Api-Key']).toEqual(key);
});

// Test API Calls

test('Client Get Mod Descrption Success', async () => {
  const client = simpleClient();
  const result = await client.getModDescrption(558086);

  expect(result.statusCode).toEqual(200);
  expect(result.data).toBeTruthy();
  expect(result.data?.data).toBeTruthy();
});

test('Client Get Mod Descrption Failure', async () => {
  const client = simpleClient();
  const result = await client.getModDescrption(558086123);

  expect(result.statusCode).toEqual(404);
  expect(result.message).toBeTruthy();
  expect(result.data).toBeFalsy();
});

test('Client Get Mod File Changelog Success', async () => {
  const client = simpleClient();
  const result = await client.getModFileChangelog(558086, 3570622);

  expect(result.statusCode).toEqual(200);
  expect(result.data).toBeTruthy();
  expect(typeof result.data?.data).toEqual('string');
});

test('Client Get Mod File Changelog Failure', async () => {
  const client = simpleClient();
  const result = await client.getModFileChangelog(558086123, 3570622);

  expect(result.statusCode).toEqual(404);
  expect(result.message).toBeTruthy();
  expect(result.data).toBeFalsy();
});

test('Client Get Mod Success', async () => {
  const modId = 558086;
  const client = simpleClient();
  const result = await client.getMod(modId);

  expect(result.statusCode).toEqual(200);
  expect(result.data).toBeTruthy();
  expect(result.data?.data.id).toEqual(modId);
});

test('Client Get Mod Failure', async () => {
  const client = simpleClient();
  const result = await client.getMod(558086123);

  expect(result.statusCode).toEqual(404);
  expect(result.message).toBeTruthy();
  expect(result.data).toBeFalsy();
});

test('Client Get Mods Success', async () => {
  const client = simpleClient();
  const result = await client.getMods({
    modIds: [558086],
  });

  expect(result.statusCode).toEqual(200);
  expect(result.data).toBeTruthy();
  expect(Array.isArray(result.data?.data)).toBeTruthy();
  expect(result.data?.data.length).toEqual(1);
});

test('Client Get Mods To Be Empty', async () => {
  const client = simpleClient();
  const result = await client.getMods({
    modIds: [558086123],
  });

  expect(result.statusCode).toEqual(200);
  expect(result.data).toBeTruthy();
  expect(Array.isArray(result.data?.data)).toBeTruthy();
  expect(result.data?.data.length).toEqual(0);
});

test('Client Get Mod File Success', async () => {
  const fileId = 3570622;
  const client = simpleClient();
  const result = await client.getModFile(558086, fileId);

  expect(result.statusCode).toEqual(200);
  expect(result.data).toBeTruthy();
  expect(result.data?.data.id).toEqual(fileId);
});

test('Client Get Mod File Failure', async () => {
  const client = simpleClient();
  const result = await client.getModFile(558086123, 3570622);

  expect(result.statusCode).toEqual(404);
  expect(result.message).toBeTruthy();
  expect(result.data).toBeFalsy();
});

test('Client Get Featured Mods Success', async () => {
  const client = simpleClient();
  const result = await client.getFeaturedMods({
    gameId: 1,
    gameVersionTypeId: CF2WowGameVersionType.Retail,
    excludedModIds: [],
  });

  expect(result.statusCode).toEqual(200);
  expect(result.data).toBeTruthy();
  expect(Array.isArray(result.data?.data.popular)).toEqual(true);
  expect(result.data?.data.popular.length).toBeGreaterThan(1);
});

test('Client Get Featured Mods Failure', async () => {
  const client = simpleClient();
  const result = await client.getFeaturedMods({
    gameId: 1222,
    gameVersionTypeId: CF2WowGameVersionType.Retail,
    excludedModIds: [],
  });

  expect(result.statusCode).toEqual(200);
  expect(result.data).toBeTruthy();
  expect(Array.isArray(result.data?.data.popular)).toEqual(true);
  expect(result.data?.data.popular.length).toEqual(0);
});

test('Client Search Mods Success', async () => {
  const client = simpleClient();
  const result = await client.searchMods({
    gameId: 1,
    gameVersionTypeId: CF2WowGameVersionType.Retail,
    searchFilter: 'DBM',
  });

  expect(result.statusCode).toEqual(200);
  expect(result.data).toBeTruthy();
  expect(Array.isArray(result.data?.data)).toEqual(true);
  expect(result.data?.data.length).toBeGreaterThan(1);
});

test('Client Search Mods Failure', async () => {
  const client = simpleClient();
  const result = await client.searchMods({
    gameId: 1122,
    gameVersionTypeId: CF2WowGameVersionType.Retail,
    searchFilter: 'DBM',
  });

  expect(result.statusCode).toEqual(404);
  expect(result.message).toBeTruthy();
  expect(Array.isArray(result.data?.data)).toEqual(false);
});

test('Client Fingerprints Success', async () => {
  const client = simpleClient();
  const result = await client.getFingerprintMatches({
    fingerprints: [2926930041],
  });

  expect(result.statusCode).toEqual(200);
  expect(result.data).toBeTruthy();
  expect(Array.isArray(result.data?.data.exactMatches)).toEqual(true);
  expect(result.data?.data.exactMatches.length).toBeGreaterThan(0);
});

test('Client Fingerprints Failure', async () => {
  const client = simpleClient();
  const result = await client.getFingerprintMatches({
    fingerprints: [292693004122],
  });

  expect(result.statusCode).toEqual(200);
  expect(result.data).toBeTruthy();
  expect(Array.isArray(result.data?.data.exactMatches)).toEqual(true);
  expect(result.data?.data.exactMatches.length).toEqual(0);
});
