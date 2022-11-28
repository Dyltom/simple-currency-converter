import {
    Switch,
    Group,
    useMantineColorScheme,
    useMantineTheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";

export function SwitchToggle() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const theme = useMantineTheme();

    return (
        <Group mt="xs" position="center" align="center">
            <Switch
                checked={colorScheme === "dark"}
                onChange={() => toggleColorScheme()}
                size="lg"
                onLabel={<IconSun color={theme.white} size="lg" stroke={1.5} />}
                offLabel={
                    <IconMoonStars
                        color={theme.colors.gray[6]}
                        size="lg"
                        stroke={1.5}
                    />
                }
            />
        </Group>
    );
}
