import { ApiData, Currencies } from "./types";

export const fetchCurrencies = (
    setCurrencies: React.Dispatch<React.SetStateAction<Currencies | undefined>>
) => {
    return fetch(
        "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json"
    )
        .then((response) => response.json())
        .then((data) => setCurrencies(data));
};

export const fetchCountryConversions = (
    setCountryConversions: React.Dispatch<
        React.SetStateAction<ApiData | undefined>
    >,
    currency: string
) => {
    return fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.min.json`
    )
        .then((response) => response.json())
        .then((data) => setCountryConversions(data));
};
