export const BaseUrl = 'https://api.curseforge.com';

export type CF2SortOrder = 'asc' | 'desc';

// This is shorthand for fetching the game ids from 'getGames'
export enum CF2GameId {
  WoW = 1,
  TheSecretWorld = 64,
  RunesOfMagic = 335,
  WorldOfTanks = 423,
  Rift = 424,
  Minecraft = 432,
  TheElderScrollsOnline = 455,
  DarkestDungeon = 608,
  StardewValley = 669,
  Civ6 = 727,
  KerbalSpaceProgram = 4401,
  SecretWorldLegends = 4455,
  SurvivingMars = 61489,
  MinecraftDungeons = 69271,
  ChroniclesOfArcadia = 70667,
  Demeo = 78135,
}

// This is shorthand for fetching the game ids from 'getGameVersionTypes(1)'
export enum CF2WowGameVersionType {
  Retail = 517, // WoW
  Classic = 67408, // WoW Classic
  BurningCrusade = 73246, // WoW Burning Crusade Classic
  WOTLK = 73713, // WoW Wrath of the Lich King Classic
  Cata = 77522, // WoW Cataclysm Classic
}

export enum CF2ModStatus {
  New = 1,
  ChangesRequired = 2,
  UnderSoftReview = 3,
  Approved = 4,
  Rejected = 5,
  ChangesMade = 6,
  Inactive = 7,
  Abandoned = 8,
  Deleted = 9,
  UnderReview = 10,
}

export enum CF2FileReleaseType {
  Release = 1,
  Beta = 2,
  Alpha = 3,
}

export enum CF2FileStatus {
  Processing = 1,
  ChangesRequired = 2,
  UnderReview = 3,
  Approved = 4,
  Rejected = 5,
  MalwareDetected = 6,
  Deleted = 7,
  Archived = 8,
  Testing = 9,
  Released = 10,
  ReadyForReview = 11,
  Deprecated = 12,
  Baking = 13,
  AwaitingPublishing = 14,
  FailedPublishing = 15,
}

export enum CF2HashAlgo {
  Sha1 = 1,
  Md5 = 2,
}

export enum CF2FileRelationType {
  EmbeddedLibrary = 1,
  OptionalDependency = 2,
  RequiredDependency = 3,
  Tool = 4,
  Incompatible = 5,
  Include = 6,
}

export enum CF2ModLoaderType {
  Any = 0,
  Forge = 1,
  Cauldron = 2,
  LiteLoader = 3,
  Fabric = 4,
}

export enum CF2CoreStatus {
  Draft = 1,
  Test = 2,
  PendingReview = 3,
  Rejected = 4,
  Approved = 5,
  Live = 6,
}

export enum CF2CoreApiStatus {
  Private = 1,
  Public = 2,
}

export enum CF2WowAddonCategory {
  ChatCommunication = 1001,
  AuctionEconomy = 1002,
  AudioVideo = 1003,
  PvP = 1004,
  BuffsDebuffs = 1005,
  Artwork = 1006,
  DataExport = 1007,
  Guild = 1008,
  BagsInventory = 1009,
  Libraries = 1010,
  MapMinimap = 1011,
  Mail = 1012,
  QuestsLeveling = 1013,
  BossEncounters = 1014,
  Professions = 1015,
  UnitFrames = 1016,
  Miscellaneous = 1017,
  ActionBars = 1018,
  Combat = 1019,
  Class = 1020,
  Mage = 1021,
  Paladin = 1022,
  Druid = 1023,
  Hunter = 1024,
  Shaman = 1025,
  Priest = 1026,
  Rogue = 1027,
  Warrior = 1028,
  Warlock = 1029,
  DevelopmentTools = 1031,
  Healer = 1032,
  Tank = 1033,
  Caster = 1034,
  DamageDealer = 1035,
  DeathKnight = 1036,
  RaidFrames = 1037,
  Minigames = 1038,
  HUDs = 1039,
  Arena = 1040,
  Battleground = 1041,
  Alchemy = 1042,
  Blacksmithing = 1043,
  Cooking = 1044,
  Enchanting = 1045,
  Engineering = 1046,
  FirstAid = 1047,
  Fishing = 1048,
  Herbalism = 1049,
  Jewelcrafting = 1050,
  Leatherworking = 1051,
  Mining = 1052,
  Skinning = 1053,
  Tailoring = 1054,
  Tooltip = 1055,
  Inscription = 1059,
  Roleplay = 1060,
  Plugins = 1063,
  FuBar = 1064,
  TitanPanel = 1065,
  DataBroker = 1066,
  Achievements = 1067,
  Companions = 1085,
  Archaeology = 1103,
  Transmogrification = 1171,
  Monk = 1242,
  BattlePets = 1243,
  Garrison = 1469,
  DemonHunters = 1502,
  TwitchIntegration = 4675,
}

export interface CF2GameAssets {
  iconUrl: string;
  tileUrl: string;
  coverUrl: string;
}

export interface CF2Game {
  id: number;
  name: string;
  slug: string;
  dateModified: string;
  assets: CF2GameAssets;
  status: CF2CoreStatus;
  apiStatus: CF2CoreApiStatus;
}

export interface CF2AddonLinks {
  websiteUrl: string;
  wikiUrl: string;
  issuesUrl: string;
  sourceUrl: string;
}

export interface CF2Category {
  id: number;
  gameId: number;
  name: string;
  slug: string;
  url: string;
  iconUrl: string;
  dateModified: string;
  isClass?: boolean;
  classId?: number;
  parentCategoryId?: number;
}

export interface CF2Author {
  id: number;
  name: string;
  url: string;
}

export interface CF2Asset {
  id: number;
  modId: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  url: string;
}

export interface CF2FileHash {
  value: string;
  algo: CF2HashAlgo;
}

export interface CF2SortableGameVersion {
  gameVersionName: string;
  gameVersionPadded: string;
  gameVersion: string;
  gameVersionReleaseDate: string;
  gameVersionTypeId?: number;
}

export interface CF2FileDependency {
  modId: number;
  fileId: number;
  relationType: CF2FileRelationType;
}

export interface CF2FileModule {
  name: string;
  fingerprint: number;
}

export interface CF2File {
  id: number;
  gameId: number;
  modId: number;
  isAvailable: boolean;
  displayName: string;
  fileName: string;
  releaseType: CF2FileReleaseType;
  fileStatus: CF2FileStatus;
  hashes: CF2FileHash[];
  fileDate: string;
  fileLength: number;
  downloadCount: number;
  downloadUrl: string;
  gameVersions: string[];
  sortableGameVersions: CF2SortableGameVersion[];
  dependencies: CF2FileDependency[];
  exposeAsAlternative?: boolean;
  parentProjectFileId?: number;
  alternateFileId?: number;
  isServerPack?: number;
  serverPackFileId?: number;
  fileFingerprint: number;
  modules: CF2FileModule[];
}

export interface CF2FileIndex {
  gameVersion: string;
  fileId: number;
  filename: string;
  releaseType: CF2FileReleaseType;
  gameVersionTypeId?: number;
  modLoader?: CF2ModLoaderType;
}

export interface CF2Addon {
  id: number;
  gameId: number;
  name: string;
  slug: string;
  links: CF2AddonLinks;
  summary: string;
  status: CF2ModStatus;
  downloadCount: number;
  isFeatured: boolean;
  primaryCategoryId: number;
  categories: CF2Category[];
  authors: CF2Author[];
  logo: CF2Asset;
  screenshots: CF2Asset[];
  mainFileId: number;
  latestFiles: CF2File[];
  latestFilesIndexes: CF2FileIndex[];
  dateCreated: string;
  dateModified: string;
  dateReleased: string;
  allowModDistribution?: boolean;
  gamePopularityRank: number;
  isAvailable: boolean;
  thumbsUpCount?: number;
}

export interface CF2FingerprintMatch {
  id: number;
  file: CF2File;
  latestFiles: CF2File[];
}

export interface CF2FingerprintsMatchesResult {
  isCacheBuilt: boolean;
  exactMatches: CF2FingerprintMatch[];
  exactFingerprints: number[];
  partialMatches: CF2FingerprintMatch[];
  partialMatchFingerprints: any;
  additionalProperties: number[];
  installedFingerprints: number[];
  unmatchedFingerprints: number[];
}

export interface CF2Pagination {
  index: number;
  pageSize: number;
  resultCount: number;
  totalCount: number;
}

export interface CF2GameVersionsByType {
  type: number;
  versions: string[];
}

export interface CF2GameVersionType {
  id: number;
  gameId: number;
  name: string;
  slug: string;
}

// REQUESTS
export interface GetFeaturedModsRequestBody {
  gameId: number;
  excludedModIds: number[];
  gameVersionTypeId?: number;
}

export interface CF2GetModsRequest {
  modIds: number[];
}

export interface CF2SearchModsParams {
  gameId?: number;
  classId?: number;
  categoryId?: number;
  gameVersion?: string;
  searchFilter?: string;
  sortField?: any;
  sortOrder?: CF2SortOrder;
  modLoaderType?: string;
  gameVersionTypeId?: number;
  index?: number;
  pageSize?: number;
}

export interface CF2GetFingerprintMatchesRequest {
  fingerprints: number[];
}

export interface CF2GetModFilesRequest {
  modId: number;
  gameVersion?: string;
  modLoaderType?: CF2ModLoaderType;
  gameVersionTypeId?: number;
  index?: number;
  pageSize?: number;
}

export interface CF2GetModFilesRequestBody {
  fileIds: number[];
}

// RESPONSES
export interface CF2GetGamesResponse {
  data: CF2Game[];
  pagination: CF2Pagination;
}

export interface CF2GetGameResponse {
  data: CF2Game;
}

export interface CF2GetAddonResponse {
  data: CF2Addon;
}

export interface CF2GetVersionsResponse {
  data: CF2GameVersionsByType[];
}

export interface CF2GetVersionTypesResponse {
  data: CF2GameVersionType[];
}

export interface CF2FeaturedModsResponse {
  featured: CF2Addon[];
  popular: CF2Addon[];
  recentlyUpdated: CF2Addon[];
}

export interface CF2GetFeaturedModsResponse {
  data: CF2FeaturedModsResponse;
}

export interface CF2GetFingerprintMatchesResponse {
  data: CF2FingerprintsMatchesResult;
}

export interface CF2GetModDescriptionResponse {
  data: string;
}

export interface CF2GetModFileChangelogResponse {
  data: string;
}

export interface CF2GetModsResponse {
  data: CF2Addon[];
}

export interface CF2SearchModsResponse {
  data: CF2Addon[];
  pagination: CF2Pagination;
}

export interface CF2GetModFileResponse {
  data: CF2File;
}

export interface CF2GetModFilesResponse {
  data: CF2File[];
  pagination: CF2Pagination;
}

export interface CF2GetFeaturedModsRequest {
  gameId: number;
  excludedModIds: number[];
  gameVersionTypeId?: number;
}

export interface CF2GetFilesResponse {
  data: CF2File[];
}

export interface CF2GetModFileDownloadUrlResponse {
  data: string;
}
