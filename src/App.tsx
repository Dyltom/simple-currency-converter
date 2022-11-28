import {
    ActionIcon,
    Card,
    ColorScheme,
    ColorSchemeProvider,
    Grid,
    Group,
    MantineProvider,
    Paper,
    Space,
    TextInput,
    Title,
} from "@mantine/core";
import { IconArrowsUpDown } from "@tabler/icons";
import { useEffect, useState } from "react";
import { SelectCountry } from "./components/SelectCountry";
import { SwitchToggle } from "./components/SwitchToggle";
import { fetchCountryConversions, fetchCurrencies } from "./fetchers";
import { ApiData, Currencies } from "./types";

function App(props: { colorScheme: ColorScheme }) {
    const [input, setInput] = useState<number>();
    const [output, setOutput] = useState<number>();
    const [currencies, setCurrencies] = useState<Currencies>();
    const [inCurrency, setInCurrency] = useState<string>("AUD");
    const [outCurrency, setOutCurrency] = useState<string>("USD");
    const [exchangeRate, setExchangeRate] = useState<number>();
    const [countryConversions, setCountryConversions] = useState<ApiData>();

    const [colorScheme, setColorScheme] = useState<ColorScheme>(
        props.colorScheme
    );

    useEffect(() => {
        if (!currencies) {
            fetchCurrencies(setCurrencies);
        }
    }, []);

    useEffect(() => {
        if (currencies) {
            fetchCountryConversions(
                setCountryConversions,
                inCurrency.toLocaleLowerCase()
            );
        }
    }, [inCurrency, currencies]);

    useEffect(() => {
        if (countryConversions) {
            setExchangeRate(
                countryConversions[inCurrency.toLowerCase()][
                    outCurrency.toLowerCase()
                ]
            );
        }
    }, [countryConversions, outCurrency]);

    useEffect(() => {
        setOutput(input ? input * (exchangeRate || 0) : 0);
    }, [exchangeRate]);

    const onInputValueChange = (e: React.FormEvent<HTMLInputElement>) => {
        const userInput = Number(e.currentTarget.value);
        const input = userInput === 0 ? undefined : userInput;
        const output = input ? input * (exchangeRate || 0) : 0;

        setInput(input);
        setOutput(output);
    };

    const swapCurrencies = () => {
        setCountryConversions(undefined);

        const currencySwap = inCurrency;
        setInCurrency(outCurrency);
        setOutCurrency(currencySwap);
    };

    const SelectIn = (
        <SelectCountry
            currencies={currencies}
            currency={inCurrency}
            setInCurrency={setInCurrency}
        />
    );
    const SelectOut = (
        <SelectCountry
            currencies={currencies}
            currency={outCurrency}
            setInCurrency={setOutCurrency}
        />
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
                <Paper
                    style={{
                        justifyContent: "center",
                        minHeight: "100vh",
                        borderRadius: 0,
                    }}
                >
                    <Grid
                        justify="center"
                        align="center"
                        style={{ minHeight: "100vh", margin: "0" }}
                    >
                        <Grid.Col span={4}>
                            <Title order={1} align="center">
                                Currency Converter
                            </Title>
                            <Space h="xl" />
                            <Card shadow="sm" p="lg" radius="md" withBorder>
                                <TextInput
                                    type="number"
                                    placeholder="1000"
                                    label="Amount to convert"
                                    rightSection={SelectIn}
                                    rightSectionWidth={92}
                                    test-id="from"
                                    onChange={onInputValueChange}
                                    value={input}
                                />
                                <Space h="md" />
                                <Group position="right">
                                    <ActionIcon
                                        size="lg"
                                        variant="default"
                                        radius="md"
                                        onClick={() => swapCurrencies()}
                                    >
                                        <IconArrowsUpDown
                                            stroke={1.5}
                                            style={{ margin: "0px" }}
                                        />
                                    </ActionIcon>
                                </Group>

                                <TextInput
                                    type="number"
                                    label="Converted total"
                                    rightSection={SelectOut}
                                    rightSectionWidth={92}
                                    test-id="to"
                                    disabled={true}
                                    value={output}
                                />
                                <SwitchToggle />
                            </Card>
                        </Grid.Col>
                    </Grid>
                </Paper>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

export default App;
