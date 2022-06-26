import React from 'react'
import classes from './addBtn.module.css'
const AddTicketsBtn = ({children,...props}) => {
return (
    <button {...props} className={classes.addBtn}>
    {children}
</button>
);
};
export default AddTicketsBtn;