import { Currencies } from "./types";

export const labelMapper = (supportedCurrencies: Currencies) => {
    return Object.entries(supportedCurrencies).map((country) => {
        const currencyCode = country[0];
        let label = `${currencyCode.toUpperCase()}`;

        return {
            label: label,
            value: currencyCode.toUpperCase(),
        };
    });
};