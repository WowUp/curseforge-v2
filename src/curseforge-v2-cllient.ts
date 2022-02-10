import axios, { AxiosRequestConfig, Method } from 'axios';

import * as cfv2 from './curseforge-api-v2';

export interface HttpResult<T> {
  statusCode: number;
  data?: T;
  message?: string;
}

export interface CFV2ClientConfig {
  apiKey: string;
  headers?: { [key: string]: string };
  apiUrl?: string;
}

export class CFV2Client {
  private _apiKey: string;
  private _apiUrl: string;
  private _headers?: { [key: string]: string };

  constructor(config: CFV2ClientConfig) {
    if (typeof config.apiKey !== 'string' || config.apiKey.length === 0) {
      throw new Error('CFV2Client api key cannot be empty');
    }

    this._apiKey = config.apiKey;
    this._apiUrl = typeof config.apiUrl === 'string' && config.apiUrl.length > 0 ? config.apiUrl : cfv2.BaseUrl;
    this._headers = config.headers;
  }

  // MODS

  // https://docs.curseforge.com/#get-mod-description
  public async getModDescrption(modId: number): Promise<HttpResult<cfv2.CF2GetModDescriptionResponse>> {
    const url = new URL(`${this._apiUrl}/v1/mods/${modId}/description`);

    return await httpGet<cfv2.CF2GetModDescriptionResponse>(url, {
      headers: this.getAuthHeaders(),
    });
  }

  // https://docs.curseforge.com/#get-mod-file-changelog
  public async getModFileChangelog(
    modId: number,
    fileId: number,
  ): Promise<HttpResult<cfv2.CF2GetModFileChangelogResponse>> {
    const url = new URL(`${this._apiUrl}/v1/mods/${modId}/files/${fileId}/changelog`);

    return await httpGet<cfv2.CF2GetModFileChangelogResponse>(url, {
      headers: this.getAuthHeaders(),
    });
  }

  // https://docs.curseforge.com/#get-mod
  public async getMod(modId: number): Promise<HttpResult<cfv2.CF2GetAddonResponse>> {
    const url = new URL(`${this._apiUrl}/v1/mods/${modId}`);

    return await httpGet<cfv2.CF2GetAddonResponse>(url, {
      headers: this.getAuthHeaders(),
    });
  }

  // https://docs.curseforge.com/#get-mods
  public async getMods(req: cfv2.CF2GetModsRequest): Promise<HttpResult<cfv2.CF2GetModsResponse>> {
    const url = new URL(`${this._apiUrl}/v1/mods`);

    return await httpPost<cfv2.CF2GetModsResponse>(url, req, {
      headers: this.getAuthHeaders(),
    });
  }

  // https://docs.curseforge.com/#get-mod-file
  public async getModFile(modId: number, fileId: number): Promise<HttpResult<cfv2.CF2GetModFileResponse>> {
    const url = new URL(`${this._apiUrl}/v1/mods/${modId}/files/${fileId}`);

    return await httpGet<cfv2.CF2GetModFileResponse>(url, {
      headers: this.getAuthHeaders(),
    });
  }

  // https://docs.curseforge.com/#get-featured-mods
  public async getFeaturedMods(
    req: cfv2.CF2GetFeaturedModsRequest,
  ): Promise<HttpResult<cfv2.CF2GetFeaturedModsResponse>> {
    const url = new URL(`${this._apiUrl}/v1/mods/featured`);

    return await httpPost<cfv2.CF2GetFeaturedModsResponse>(url, req, {
      headers: this.getAuthHeaders(),
    });
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

    return await httpGet<cfv2.CF2SearchModsResponse>(url, {
      headers: this.getAuthHeaders(),
    });
  }

  // FINGERPRINTS

  // https://docs.curseforge.com/#get-fingerprints-matches
  public async getFingerprintMatches(
    pRequest: cfv2.CF2GetFingerprintMatchesRequest,
  ): Promise<HttpResult<cfv2.CF2GetFingerprintMatchesResponse>> {
    const url = new URL(`${this._apiUrl}/v1/fingerprints`);
    const req: cfv2.CF2GetFingerprintMatchesRequest = { ...pRequest };

    return await httpPost<cfv2.CF2GetFingerprintMatchesResponse>(url, req, {
      headers: this.getAuthHeaders(),
    });
  }

  getAuthHeaders() {
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
