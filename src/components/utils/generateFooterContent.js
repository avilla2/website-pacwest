import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icons from '../footerComponents/icons';
import Text from '../footerComponents/text';
import Image from '../footerComponents/image';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
}));

export default function GenerateFooterContent(props) {
    const classes = useStyles();

    const renderComponent = (object) => {
        switch(object.__typename) {
            case 'ComponentFooterComponentsImage':
                return <Image content={object} />;
            case 'ComponentFooterComponentsText':
                return <Text content={object} />;
            case 'ComponentFooterComponentsIcons':
                return <Icons content={object} />;
            default:
                return <h2>Error: Footer Content Not Found</h2>;
          }
    }

    return (
        <div className={classes.root}>
            {renderComponent(props.content)}
        </div>
    );
}