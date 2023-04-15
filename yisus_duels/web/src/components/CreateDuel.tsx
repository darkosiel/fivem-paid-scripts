import styled from "@emotion/styled";
import { Avatar, Button, Flex, Group, NumberInput, PasswordInput, Select, Text } from "@mantine/core";
import { useForm } from '@mantine/form';
import React, { FC, forwardRef } from "react";
import { mockData } from "../mock/mockData";
import { useGlobalStore } from "../states/useGlobalState";
import { fetchNui } from "../utils/fetchNui";
import { SelectArena } from "./SelectArena";

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    image: string;
    label: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ image, label, ...others }: ItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <Avatar src={image} />
                <div>
                    <Text size="sm">{label}</Text>
                </div>
            </Group>
        </div>
    )
);

const gamemodes = [
    { label: '1v1', value: '1v1' },
    { label: '2v2', value: '2v2' },
    { label: '3v3', value: '3v3' },
    { label: '4v4', value: '4v4' },
    { label: '5v5', value: '5v5' }
]

export const CreateDuel: FC = () => {
    const messages = useGlobalStore(state => state.messages);
    const gameConfig = useGlobalStore(state => state.gameConfig);
    const setCurrentLobby = useGlobalStore(state => state.setCurrentLobby);

    const createDuelForm = useForm({
        validateInputOnBlur: true,
        initialValues: {
            duelmode: '1v1',
            weapon: '',
            rounds: 1,
            map: 0,
            password: ''
        },
        validate: {
            weapon: (value) => (!value && messages['nui.duel.mustweapon']),
            rounds: (value) => {
                if (!value) return messages['nui.duel.mustround'];
                if (value > gameConfig.maxrounds) return `${messages['nui.duel.badround']} ${gameConfig.maxrounds} ${messages['nui.duel.rounds'].toLowerCase()}`;
            },
        },
    });

    const onMapChange = (mapIndex: number) => {
        createDuelForm.setFieldValue('map', mapIndex);
    }

    const onSubmit = async (values: any) => {
        const duelmode = values.duelmode;
        const weapon = values.weapon;
        const rounds = values.rounds;
        const map = gameConfig.maps[values.map].value;
        const password = values.password === '' ? false : values.password.replace(/\s/g, '');

        const createdLobby = await fetchNui('createLobby', { duelmode: duelmode, weapon: weapon, rounds: rounds, map: map, password: password }, mockData.lobbies[0])
        if (createdLobby) setCurrentLobby(createdLobby);
    }

    return (
        <>
            <Flex
                direction='row'
                w='100%'
                justify='center'
                sx={{
                    marginBottom: '15px'
                }}
            >
                <Text ta='center'>{messages['nui.duel.createduel']}</Text>
            </Flex>

            <form onSubmit={createDuelForm.onSubmit(onSubmit)}>
                <Flex
                    direction='column'
                    h='100%'
                    justify='flex-start'
                    gap='16px'
                >
                    <Flex
                        direction='row'
                        w='100%'
                        justify='space-evently'
                        gap='16px'
                    >
                        <Select
                            sx={{
                                width: '100%'
                            }}
                            label={messages['nui.duel.duelmode.label']}
                            placeholder={messages['nui.duel.duelmode.placeholder']}
                            data={gamemodes}
                            {...createDuelForm.getInputProps('duelmode')}
                        >
                        </Select>
                        <NumberInput
                            sx={{
                                width: '100%'
                            }}
                            label={messages['nui.duel.roundcount.label']}
                            placeholder={messages['nui.duel.roundcount.placeholder']}
                            min={0}
                            max={gameConfig.maxrounds}
                            {...createDuelForm.getInputProps('rounds')}
                        />
                    </Flex>

                    <Select
                        label={messages['nui.duel.weapon.label']}
                        placeholder={messages['nui.duel.weapon.placeholder']}
                        sx={{
                            fontFamily: 'Poppins'
                        }}
                        itemComponent={SelectItem}
                        data={gameConfig.weapons}
                        searchable
                        maxDropdownHeight={400}
                        nothingFound={messages['nui.duel.weapon.notfound']}
                        filter={(value, item) =>
                            item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
                            item.description?.toLowerCase().includes(value.toLowerCase().trim())
                        }
                        {...createDuelForm.getInputProps('weapon')}
                    />

                    <SelectArena maps={gameConfig.maps} onMapChange={onMapChange} />
                    <PasswordInput
                        placeholder="*********"
                        label={messages['nui.duel.password.label']}
                        description={messages['nui.duel.password.description']}
                        {...createDuelForm.getInputProps('password')}
                    />

                    <Group position="right" mt="xl" align='flex-end'>
                        <Button variant='default' type="submit">{messages['nui.duel.create.submit']}</Button>
                    </Group>
                </Flex>
            </form>
        </>
    )
}