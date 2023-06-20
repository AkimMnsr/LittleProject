import React, {ReactNode} from 'react'
import {TouchableWithoutFeedback, Keyboard } from 'react-native'


interface DismissKeyboardProps {
    children: ReactNode;
  }
  
  const DismissKeyboard: React.FC<DismissKeyboardProps> = ({children}) => {
    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
        >
            {children}
        </TouchableWithoutFeedback>
    )
};

export default DismissKeyboard