import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface Options{
    headers?: 
    | HttpHeaders 
    | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    context?: HttpContext;
    params?: 
    | HttpParams 
    | {
        [param: string]: string 
        | number 
        | boolean 
        | ReadonlyArray<string 
        | number 
        | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    transferCache?: {
        includeHeaders?: string[];
    } | boolean;
}

export interface Proyectos {
    Nombre: string;
    Image_Url: string;
    Page_Url: string;
    Participantes: string;
    Lenguajes: Leguajes[];
}

export interface Leguajes {
        Nombre: string;
        imageUrl: string;
}

export interface PaginationParams {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    page: number;
    perPage: number;
}