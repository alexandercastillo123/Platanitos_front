export interface paises {
    value: string,
    label: string,
    flag: string,
    name: string
}

export interface RestCountryResponseAPI {
    cca2: string;
    name: {
        common: string;
    };
    flags: {
        svg: string;
    };
    idd: {
        root?: string;
        suffixes?: string[];
    };
}