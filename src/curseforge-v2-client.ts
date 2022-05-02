import axios, { AxiosRequestConfig, Method } from 'axios';

import * as cfv2 from './curseforge-api-v2';
import { CF2GetModFilesRequest } from './curseforge-api-v2';

const DEFAULT_HTTP_TIMEOUT_MS = 30000;

export interface HttpResult<T> {
  statusCode: number;
  data?: T;
  message?: string;
}

export interface CFV2ClientConfig {
  apiKey: string;
  headers?: { [key: string]: string };
  apiUrl?: string;
  httpTimeoutMs?: number;
}

export class CFV2Client {
  private _apiKey: string;
  private _apiUrl: string;
  private _headers?: { [key: string]: string };
  private _httpTimeoutMs: number;

  constructor(config: CFV2ClientConfig) {
    if (typeof config.apiKey !== 'string' || config.apiKey.length === 0) {
      throw new Error('CFV2Client api key cannot be empty');
    }

    this._apiKey = config.apiKey;
    this._apiUrl = typeof config.apiUrl === 'string' && config.apiUrl.length > 0 ? config.apiUrl : cfv2.BaseUrl;
    this._headers = config.headers;
    this._httpTimeoutMs =
      typeof config.httpTimeoutMs === 'number' && !isNaN(config.httpTimeoutMs)
        ? config.httpTimeoutMs
        : DEFAULT_HTTP_TIMEOUT_MS;
  }

  // GAMES

  // https://docs.curseforge.com/#get-games
  public async getGames(index?: number, pageSize?: number): Promise<HttpResult<cfv2.CF2GetModDescriptionResponse>> {
    const queryParams = new URLSearchParams();
    if (typeof index === 'number' && !isNaN(index)) {
      queryParams.append('index', index.toString());
    }

    if (typeof pageSize === 'number' && !isNaN(pageSize)) {
      queryParams.append('pageSize', pageSize.toString());
    }

    const url = new URL(`${this._apiUrl}/v1/games?${queryParams.toString()}`);

    return await this.cfGet<cfv2.CF2GetModDescriptionResponse>(url);
  }

  // https://docs.curseforge.com/#get-game
  public async getGame(gameId: number): Promise<HttpResult<cfv2.CF2GetGameResponse>> {
    const url = new URL(`${this._apiUrl}/v1/games/${gameId}`);
    return await this.cfGet<cfv2.CF2GetGameResponse>(url);
  }

  // https://docs.curseforge.com/#get-versions
  public async getGameVersions(gameId: number): Promise<HttpResult<cfv2.CF2GetVersionsResponse>> {
    const url = new URL(`${this._apiUrl}/v1/games/${gameId}/versions`);
    return await this.cfGet<cfv2.CF2GetVersionsResponse>(url);
  }

  // https://docs.curseforge.com/#get-version-types
  public async getGameVersionTypes(gameId: number): Promise<HttpResult<cfv2.CF2GetVersionTypesResponse>> {
    const url = new URL(`${this._apiUrl}/v1/games/${gameId}/version-types`);
    return await this.cfGet<cfv2.CF2GetVersionTypesResponse>(url);
  }

  // MODS

  // https://docs.curseforge.com/#get-mod
  public async getMod(modId: number): Promise<HttpResult<cfv2.CF2GetAddonResponse>> {
    const url = new URL(`${this._apiUrl}/v1/mods/${modId}`);

    return await this.cfGet<cfv2.CF2GetAddonResponse>(url);
  }

  // https://docs.curseforge.com/#get-mods
  public async getMods(req: cfv2.CF2GetModsRequest): Promise<HttpResult<cfv2.CF2GetModsResponse>> {
    const url = new URL(`${this._apiUrl}/v1/mods`);

    return await this.cfPost<cfv2.CF2GetModsResponse>(url, req);
  }

  // https://docs.curseforge.com/#get-mod-description
  public async getModDescription(modId: number): Promise<HttpResult<cfv2.CF2GetModDescriptionResponse>> {
    const url = new URL(`${this._apiUrl}/v1/mods/${modId}/description`);
    return await this.cfGet<cfv2.CF2GetModDescriptionResponse>(url);
  }

  // https://docs.curseforge.com/#get-featured-mods
  public async getFeaturedMods(
    req: cfv2.CF2GetFeaturedModsRequest,
  ): Promise<HttpResult<cfv2.CF2GetFeaturedModsResponse>> {
    const url = new URL(`${this._apiUrl}/v1/mods/featured`);

    return await this.cfPost<cfv2.CF2GetFeaturedModsResponse>(url, req);
  }

  // https://docs.curseforge.com/#search-mods
  public async searchMods(params: cfv2.CF2SearchModsParams): Promise<HttpResult<cfv2.CF2SearchModsResponse>> {
    const queryMap: Record<string, string> = {};

    for (const [key, value] of Object.entries(params)) {
      if ((typeof value !== 'string' && isNaN(value)) || value === null || value === undefined) {
        continue;
      }
      queryMap[key] = value.toString();
    }

    const queryParams = new URLSearchParams(queryMap);

    const url = new URL(`${this._apiUrl}/v1/mods/search?${queryParams.toString()}`);

    return await this.cfGet<cfv2.CF2SearchModsResponse>(url);
  }

  // FILES

  // https://docs.curseforge.com/#get-mod-file
  public async getModFile(modId: number, fileId: number): Promise<HttpResult<cfv2.CF2GetModFileResponse>> {
    const url = new URL(`${this._apiUrl}/v1/mods/${modId}/files/${fileId}`);
    return await this.cfGet<cfv2.CF2GetModFileResponse>(url);
  }

  // https://docs.curseforge.com/#get-mod-files
  public async getModFiles(req: CF2GetModFilesRequest): Promise<HttpResult<cfv2.CF2GetModFilesResponse>> {
    const params: any = { ...req };
    delete params.modId;

    const queryParams = new URLSearchParams(params);

    const url = new URL(`${this._apiUrl}/v1/mods/${req.modId}/files?${queryParams.toString()}`);
    return await this.cfGet<cfv2.CF2GetModFilesResponse>(url);
  }

  // https://docs.curseforge.com/#get-files
  public async getFiles(pRequest: cfv2.CF2GetModFilesRequestBody): Promise<HttpResult<cfv2.CF2GetFilesResponse>> {
    const url = new URL(`${this._apiUrl}/v1/mods/files`);
    const req: cfv2.CF2GetModFilesRequestBody = { ...pRequest };

    return await this.cfPost<cfv2.CF2GetFilesResponse>(url, req);
  }

  // https://docs.curseforge.com/#get-mod-file-changelog
  public async getModFileChangelog(
    modId: number,
    fileId: number,
  ): Promise<HttpResult<cfv2.CF2GetModFileChangelogResponse>> {
    const url = new URL(`${this._apiUrl}/v1/mods/${modId}/files/${fileId}/changelog`);

    return await this.cfGet<cfv2.CF2GetModFileChangelogResponse>(url);
  }

  // https://docs.curseforge.com/#get-mod-file-download-url
  public async getModFileDownloadUrl(modId: number, fileId: number): Promise<HttpResult<cfv2.CF2GetModFileDownloadUrlResponse>> {
    const url = new URL(`${this._apiUrl}/v1/mods/${modId}/files/${fileId}/download-url`);

    return await this.cfGet<cfv2.CF2GetModFileDownloadUrlResponse>(url);
  }

  // FINGERPRINTS

  // https://docs.curseforge.com/#get-fingerprints-matches
  public async getFingerprintMatches(
    pRequest: cfv2.CF2GetFingerprintMatchesRequest,
  ): Promise<HttpResult<cfv2.CF2GetFingerprintMatchesResponse>> {
    const url = new URL(`${this._apiUrl}/v1/fingerprints`);
    const req: cfv2.CF2GetFingerprintMatchesRequest = { ...pRequest };

    return await this.cfPost<cfv2.CF2GetFingerprintMatchesResponse>(url, req);
  }

  private async cfGet<TResponse>(url: URL): Promise<HttpResult<TResponse>> {
    return await httpGet<TResponse>(url, {
      headers: this.getAuthHeaders(),
      timeout: this._httpTimeoutMs,
    });
  }

  private async cfPost<TResponse, TBody = any>(url: URL, data?: TBody): Promise<HttpResult<TResponse>> {
    return await httpPost<TResponse, TBody>(url, data, {
      headers: this.getAuthHeaders(),
      timeout: this._httpTimeoutMs,
    });
  }

  private getAuthHeaders() {
    return {
      'x-api-key': this._apiKey,
      ...this._headers,
    };
  }
}

async function httpGet<TResponse>(
  url: URL,
  options?: Partial<AxiosRequestConfig<any>>,
): Promise<HttpResult<TResponse>> {
  return await httpSend(url, 'GET', undefined, options);
}

async function httpPost<TResponse, TBody = any>(
  url: URL,
  data?: TBody,
  options?: Partial<AxiosRequestConfig<any>>,
): Promise<HttpResult<TResponse>> {
  return await httpSend(url, 'POST', data, options);
}

async function httpSend<TResponse, TBody>(
  url: URL,
  method: Method,
  data?: TBody,
  options?: Partial<AxiosRequestConfig<any>>,
): Promise<HttpResult<TResponse>> {
  try {
    const config: AxiosRequestConfig = {
      method,
      url: url.toString(),
      data,
      ...options,
    };
    const response = await axios(config);
    return {
      data: response.data,
      message: response.statusText,
      statusCode: response.status,
    };
  } catch (e: any) {
    if (typeof e.response === 'object') {
      return {
        data: e.response.data,
        message: e.response.statusText,
        statusCode: e.response.status,
      };
    }

    throw e;
  }
}
