import React from 'react';
import { useDispatch } from 'react-redux';
import i18n from '@App/i18n';
import * as Actions from '@App/@store/actions';
import { SelectPicker, Icon } from 'rsuite';
import TurkeyFlag from '@App/@assets/svg/TurkeyFlag.svg';
import USAFlag from '@App/@assets/svg/USAFlag.svg';

const SelectLanguageButton : React.FunctionComponent<any> = ({props}) =>{
    const dispatch = useDispatch();

    const setLanguageFlagIcon = (languageKey) =>{
        switch(languageKey){
            case "tr":
                return <img style={{height: 20, marginRight: 10}} src={TurkeyFlag}/>;
            case "en":
                return <img style={{height: 20, marginRight: 10}} src={USAFlag}/>;
            default:
                return <Icon style={{marginRight: 10}} icon="flag" />;
        }
    }

    const data = [
        {
            label: i18n.t("Languages.tr"),
            value: "tr"
        },
        {
            label: i18n.t("Languages.en"),
            value: "en"
        }
    ]

    const selectLanguage = (value: string, event : any) => {
        i18n.changeLanguage(value);
    };
    
    return(
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px'}}>
            <SelectPicker 
                placement="bottomEnd"
                data={data} 
                onChange={selectLanguage} 
                defaultValue={i18n.language}
                cleanable={false}
                renderValue={(value, item : any) => {
                    return (
                      <div>
                        {setLanguageFlagIcon(value)}
                        {' '}
                        {item.label}
                      </div>
                    );
                }}
                renderMenuItem={(label, item : any) => {
                    return (
                      <div>
                        {setLanguageFlagIcon(item.value)}
                        {' '}
                        {label}
                      </div>
                    );
                }}
            />
        </div>
    )
}

export default SelectLanguageButton;