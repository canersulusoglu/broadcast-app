import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '@App/@store/actions';
import { IconButton, Alert, Icon, Whisper, Tooltip } from 'rsuite';

const SwitchThemeModeButton : React.FunctionComponent<any> = ({props}) =>{
    const dispatch = useDispatch();
    const {themeModes, selectedMode} = useSelector((state :any) => state.Theme);
    const {User} = useSelector((state :any) => state.Auth);

    const switchThemeMode = (mode) => {
        if(selectedMode != mode){
            try {
                const rem = document.getElementById('theme-style');
                rem?.parentElement?.removeChild(rem);
            } catch (e) {
                Alert.error(`Error when changing mode.`);
            }
            document.head.appendChild(themeModes[mode]);
            dispatch(Actions.switchThemeMode(mode));

            if(User?.Preferences?.theme){
                dispatch(Actions.changeThemeMode(mode));
            }
        }
    };

    const darkModeTooltip = (
        <Tooltip>Dark Mode</Tooltip>
    );
    const lightModeTooltip = (
        <Tooltip>Light Mode</Tooltip>
    );

    return(
        (selectedMode == 'light') 
        ?
            <Whisper delayShow={1000} placement="auto" trigger="hover" speaker={darkModeTooltip}>
                <IconButton icon={<Icon icon="moon-o"/>} onClick={() => switchThemeMode('dark')} />
            </Whisper>
        :
        (selectedMode == 'dark') 
        ?
            <Whisper delayShow={1000} placement="auto" trigger="hover" speaker={lightModeTooltip}>
                <IconButton icon={<Icon icon="sun-o"/>} onClick={() => switchThemeMode('light')} />
            </Whisper>
        :
            null
    )
}

export default SwitchThemeModeButton;