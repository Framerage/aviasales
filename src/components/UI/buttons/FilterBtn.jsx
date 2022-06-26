import React from "react";
import cl from './filterBtn.module.css'
const FilterBtn =({children,...props})=>{
    return (
        <button {...props} className={cl.FilterBtn}>
            {children}
        </button>
    )
}

export default FilterBtn;