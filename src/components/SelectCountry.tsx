import { Select } from "@mantine/core";
import { Currencies } from "../types";
import { labelMapper } from "../utils";

type ICountry = {
    currencies: Currencies | undefined;
    currency: string;
    setInCurrency: React.Dispatch<React.SetStateAction<string>>;
};

export const SelectCountry = ({
    currencies,
    setInCurrency,
    currency,
}: ICountry) => {
    const onChange = (currency: string) => {
        setInCurrency(currency);
    };

    return (
        <Select
            data={labelMapper(currencies || {})}
            styles={{
                input: {
                    fontWeight: 500,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                },
            }}
            onChange={onChange}
            value={currency}
            searchable
        />
    );
};
