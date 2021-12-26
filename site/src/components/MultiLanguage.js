import React, {useState, cloneElement, Children} from 'react';
import useUserPreferencesContext from '@theme/hooks/useUserPreferencesContext';

import "./MultiLanguage.css";

const names = {
    "assemblyscript": "AssemblyScript",
    "c": "C / C++",
    "d": "D",
    "go": "Go",
    "nelua": "Nelua",
    "nim": "Nim",
    "odin": "Odin",
    "rust": "Rust",
    "zig": "Zig",
};

export function Page ({children, hidden, className}) {
    return (
        <div {...{hidden, className}}>
            {children}
        </div>
    );
}

/**
 * @type {() => { activeLang: string, updateLang: (nextLang: string) => void}}
 */
function useLanguageCode() {
    const {tabGroupChoices, setTabGroupChoices} = useUserPreferencesContext();
    const [activeLang, setSelectedValue] = useState(() => {
        const relevantTabGroupChoice = tabGroupChoices.language;

        const currentQueryParams = new URLSearchParams(window.location.search);

        const langByQueryParams = (currentQueryParams.get('code-lang') ?? '').toLowerCase().trim();
        
        if(Object.prototype.hasOwnProperty.call(names, langByQueryParams)) {
            return langByQueryParams;
        }

        if (relevantTabGroupChoice != null && relevantTabGroupChoice != activeLang) {
            return relevantTabGroupChoice;
        }

        return "assemblyscript";
    });


    function updateLang (value) {
        setSelectedValue(value);
        setTabGroupChoices("language", value);
    }


   return { activeLang, updateLang };
}


export default function MultiLanguage (props) {
    const children = Children.toArray(props.children);
    const { activeLang, updateLang } = useLanguageCode();

    const dropdown = (
        <div className="dropdown dropdown--hoverable dropdown--right">
            <a className="navbar__link">{names[activeLang]} </a>
            <ul className="dropdown__menu text--left">
                {Object.entries(names).map(([value, name]) => 
                    <li key={value}>
                        <a className={`dropdown__link ${value == activeLang ? "dropdown__link--active" : ""}`}
                            onClick={() => updateLang(value)}>
                            {name}
                        </a>
                    </li>
                )}
            </ul>
        </div>
    );

    return (
        <div>
            <div className="multilang">
                {dropdown}
            </div>
            <div>
                {children.map((item) =>
                    cloneElement(item, {
                        key: item.props.value,
                        hidden: item.props.value !== activeLang,
                    })
                )}
            </div>
        </div>
    );
}
