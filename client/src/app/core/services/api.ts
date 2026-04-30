import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../../../enviorments/enviorment';

type QueryParams = Record<string, string | number | boolean | null | undefined>

type RequestOptions = {
  params?: QueryParams
  headers?: Record<string, string>
}

@Injectable({
  providedIn: 'root'
})
export class Api {
  private baseUrl = environment.apiBaseUrl
  
  constructor(private http: HttpClient) {}

  get<T = any>(url: string, options: RequestOptions = {}): Observable<T> {
    return this.http.get<T>(this.buildUrl(url), this.buildOptions(options))
  }

  post<T = any>(url: string, body: unknown, options: RequestOptions = {}): Observable<T> {
    return this.http.post<T>(this.buildUrl(url), body, this.buildOptions(options))
  }

  put<T = any>(url: string, body: unknown, options: RequestOptions = {}): Observable<T> {
    return this.http.put<T>(this.buildUrl(url), body, this.buildOptions(options))
  }

  patch<T = any>(url: string, body: unknown, options: RequestOptions = {}): Observable<T> {
    return this.http.patch<T>(this.buildUrl(url), body, this.buildOptions(options))
  }

  delete<T = any>(url: string, options: RequestOptions = {}): Observable<T> {
    return this.http.delete<T>(this.buildUrl(url), this.buildOptions(options))
  }

  private buildUrl(url: string): string {
    if (url.startsWith('http')) {
      return url
    }

    return `${this.baseUrl}${url}`
  }

  private buildOptions(options: RequestOptions) {
    return {
      headers: this.buildHeaders(options.headers),
      params: this.buildParams(options.params)
    }
  }

  private buildHeaders(headers?: Record<string, string>): HttpHeaders {
    let httpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })

    if (!headers) {
      return httpHeaders
    }

    Object.entries(headers).forEach(([key, value]) => {
      httpHeaders = httpHeaders.set(key, value)
    })

    return httpHeaders
  }

  private buildParams(params?: QueryParams): HttpParams {
    let httpParams = new HttpParams()

    if (!params) {
      return httpParams
    }

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        httpParams = httpParams.set(key, String(value))
      }
    })

    return httpParams
  }
}