import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import theme from "../Theme";

export const BoxStyle = makeStyles({});

export const CheckBoxStyle = makeStyles({});

export const SelectorStyle = makeStyles((materialTheme: Theme) =>
    createStyles({
        formControl: {
            margin: materialTheme.spacing(1),
            minWidth: 150,
            fontFamily: theme.subLabelFont,
        },
    })
);
