export type ApiData = {
    [countryCode: string]: {
        [countryCode: string]: number;
    };
};

export type Currencies = {
    [code: string]: string;
};