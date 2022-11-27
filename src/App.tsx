import {
    Center,
    ColorScheme,
    ColorSchemeProvider,
    Container,
    MantineProvider,
    NativeSelect,
    Paper,
    TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { SwitchToggle } from "./components/SwitchToggle";

type ApiData = {
    [countryCode: string]: {
        [countryCode: string]: number;
    };
};

type Currencies = {
    [code: string]: string;
};

const labelMapper = (supportedCurrencies: Currencies) => {
    return Object.entries(supportedCurrencies).map((country) => {
        const currencyCode = country[0];
        let label = `${currencyCode.toUpperCase()}`;

        return {
            label: label,
            value: currencyCode,
        };
    });
};

function App(props: { colorScheme: ColorScheme }) {
    const [input, setInput] = useState<number>();
    const [output, setOutput] = useState<number>();
    const [currencies, setCurrencies] = useState<Currencies>();
    const [inCurrency, setInCurrency] = useState<string>();
    const [outCurrency, setOutCurrency] = useState<string>();
    const [exchangeRate, setExchangeRate] = useState<number>();
    const [countryConversions, setCountryConversions] = useState<ApiData>();

    const fetchCurrencies = () => {
        return fetch(
            "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json"
        )
            .then((response) => response.json())
            .then((data) => setCurrencies(data));
    };

    const fetchCountryConversions = () => {
        return fetch(
            `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${inCurrency?.toLowerCase()}.min.json`
        )
            .then((response) => response.json())
            .then((data) => setCountryConversions(data));
    };

    useEffect(() => {
        fetchCurrencies();
    }, []);

    useEffect(() => {
        if (currencies) {
            setInCurrency(Object.entries(currencies)[0][0]);
            setOutCurrency(Object.entries(currencies)[0][0]);
        }
    }, [currencies]);

    useEffect(() => {
        if (currencies) {
            fetchCountryConversions();
        }
    }, [inCurrency]);

    useEffect(() => {
        if (countryConversions && inCurrency && outCurrency) {
            setExchangeRate(countryConversions[inCurrency][outCurrency]);
        }
    }, [countryConversions, outCurrency]);

    useEffect(() => {
        if (outCurrency) {
            setOutput(input ? input * (exchangeRate || 0) : undefined);
        }
    }, [exchangeRate]);

    const onInputValueChange = (e: React.FormEvent<HTMLInputElement>) => {
        const userInput = Number(e.currentTarget.value);
        const input = userInput === 0 ? undefined : userInput;
        const output = input ? input * (exchangeRate || 0) : undefined;
        setInput(input);
        setOutput(output);
    };

    const onCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setInCurrency(e.currentTarget.value);
    };

    const onCountryOutChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOutCurrency(e.currentTarget.value);
    };

    const SelectIn = (
        <NativeSelect
            data={labelMapper(currencies || {})}
            styles={{
                input: {
                    fontWeight: 500,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                },
            }}
            onChange={onCountryChange}
            defaultValue="AUD"
        />
    );

    const SelectOut = (
        <NativeSelect
            data={labelMapper(currencies || {})}
            styles={{
                input: {
                    fontWeight: 500,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                },
            }}
            onChange={onCountryOutChange}
            defaultValue="AUD"
        />
    );

    const [colorScheme, setColorScheme] = useState<ColorScheme>(
        props.colorScheme
    );

    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme =
            value || (colorScheme === "dark" ? "light" : "dark");
        setColorScheme(nextColorScheme);
    };

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider theme={{ colorScheme }}>
                <Paper radius={0} style={{ minHeight: "100vh" }}>
                        <Container size="xs">
                            <TextInput
                                type="number"
                                placeholder="1000"
                                label="Amount to convert"
                                rightSection={SelectIn}
                                rightSectionWidth={92}
                                id="from"
                                onChange={onInputValueChange}
                                value={input}
                            />
                            <TextInput
                                type="number"
                                label="Converted total"
                                rightSection={SelectOut}
                                rightSectionWidth={92}
                                id="to"
                                disabled={true}
                                value={output}
                            />
                            <SwitchToggle />
                        </Container>
                </Paper>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

export default App;
