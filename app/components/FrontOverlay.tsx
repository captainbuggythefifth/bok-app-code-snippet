import React, { useState, FunctionComponent } from 'react';
import { Overlay, Icon } from 'react-native-elements';
import { View } from 'react-native';

interface IFrontOverlayProps {
    children: React.ReactNode,
    visible?: boolean,
    onBackdropPress?: () => void
}

const FrontOverlay: FunctionComponent<IFrontOverlayProps> = ({ children, visible = false, onBackdropPress = () => {} }: IFrontOverlayProps) => {
    const [overLaySize, setOverLaySize] = useState<"normal" | "big">("normal");

    const toogleOverlaySize = () => {
        const size = overLaySize === "big" ? "normal" : "big";
        setOverLaySize(size);
    }
    return (
        <Overlay
            isVisible={visible}
            onBackdropPress={onBackdropPress}
            overlayStyle={{
                width: overLaySize === "normal" ? "80%" : "90%",
                height: overLaySize === "normal" ? "60%" : "80%"
            }}>
            <>
                <View style={{
                    flexDirection: "row-reverse"
                }}>
                    <Icon
                        name="arrow-resize"
                        type="fontisto"
                        onPress={toogleOverlaySize}
                    />
                </View>
                {children}
            </>
        </Overlay>
    )
};

export default FrontOverlay