import { Button, Group, Modal, PasswordInput } from '@mantine/core';
import React, { FC } from "react";
import { useGlobalStore } from "../states/useGlobalState";

type PasswordModalProps = {
    onSubmit: (password: string) => void;
}

export const PasswordModal: FC<PasswordModalProps> = (props) => {
    const messages = useGlobalStore(state => state.messages);
    const [password, setPassword] = React.useState('');
    return (
        <Modal title={messages['nui.password.title']} opened={true} onClose={() => props.onSubmit(password)} closeOnClickOutside={false} centered>
            <PasswordInput placeholder="********" onChange={(event) => setPassword(event.currentTarget.value)} sx={{
                marginBottom: '1vh'
            }} />

            <Group position="right">
                <Button variant='default' onClick={() => props.onSubmit(password)}>{messages['nui.duel.join']}</Button>
            </Group>
        </Modal>
    )
}