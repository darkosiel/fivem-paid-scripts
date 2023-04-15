import { Table } from "@mantine/core";
import React, { FC } from "react";
import { useGlobalStore } from "../states/useGlobalState";

export const Leaderboard: FC = () => {
    const messages = useGlobalStore(state => state.messages);
    const leaderboard = useGlobalStore(state => state.leaderboard);

    return (
        <Table verticalSpacing="sm" align="center">
            <thead>
                <tr>
                    <th>{messages['nui.lb.top']}</th>
                    <th>{messages['nui.lb.name']}</th>
                    <th>{messages['nui.lb.kd']}</th>
                    <th>{messages['nui.lb.wl']}</th>
                </tr>
            </thead>
            <tbody>
                {leaderboard.sort((a, b) => b.kills - a.kills).map((player, ix) => (
                    <tr key={ix}>
                        <td>{(ix + 1)}</td>
                        <td>{player.name}</td>
                        <td>{player.kills}/{player.deaths}</td>
                        <td>{player.wins}/{player.loses}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}