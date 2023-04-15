import styled from '@emotion/styled';
import { Carousel } from '@mantine/carousel';
import { Flex, Text } from '@mantine/core';
import React, { FC } from "react";
import { IamgeLabelValue, useGlobalStore } from '../states/useGlobalState';

type CarouselMapProp = {
    image: string;
}

const CarouselMap = styled.div<CarouselMapProp>`
    width: 384px;
    height: 95%;
    background-color: #222222ca;
    background-image: url(${props => props.image});
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 10px;
`

type SelectArenaProps = {
    maps: IamgeLabelValue[]
    onMapChange: (mapIndex: number) => void;
}

export const SelectArena: FC<SelectArenaProps> = (props) => {
    const messages = useGlobalStore(state => state.messages);
    return (
        <Flex
            direction='column'
        >
            <Text sx={{
                fontSize: '14px',
                color: '#C1C2C5;',
            }}>{messages['nui.duel.map.text']}</Text>
            <Carousel initialSlide={0} slideSize="100%" height={200} loop controlSize={20} onSlideChange={props.onMapChange}>
                {props.maps.map((map, index) => {
                    return (
                        <Carousel.Slide size="385px" gap="xl" key={index}>
                            <CarouselMap image={map.image}>
                                <Text sx={{
                                    fontSize: '18px',
                                    margin: '10px 10px 10px 10px',
                                    textShadow: '1px 3px 10px #000000',
                                }}>
                                    {map.label}
                                </Text>
                            </CarouselMap>
                        </Carousel.Slide>
                    )
                })}
            </Carousel>
        </Flex>
    )
}