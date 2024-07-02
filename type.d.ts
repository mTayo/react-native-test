type AlertModalProps = {
    header: string,
    message: string,
    showModal: boolean,
    toggleModal: function,
    action: function;
}
type ButtonProps = {
    text: string,
    icon?: boolean,
    onPress: function,
    extraStyle?: object
}
type DefaultDialPad = {
    onKeyBoardPress: function,
    onCallEnd: function,
    disabled: boolean
}
type NumericKeyPad = {
    onKeyBoardPress?: function,
    onKeyPadPress?: function,
    onCallEnd: function,
    disabled: boolean,
    dialpad?: boolean
}
type KeypadButtonProps = {
    children?: React.ReactNode,
    onPress: function,
    disabled?: boolean,
}
type TextInputProps = {
    value: string;
    onChange?: function;
    errorMessage: string | null;
    showErrorMessage?: boolean | string;
    styleProps?: object| Array;
    keyboardType?: string;
    placeholder: string;
    name: string
};
