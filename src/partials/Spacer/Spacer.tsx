import React from "react";

type Props = {
    height?: number,
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>


const screenHeight = 607;

export default React.memo((props: Props) => {
    const { height = 50, ...divProps } = props;
    const styleHeight = React.useMemo(() => height * screenHeight / 100, [height]);

    return <div style={{ height: styleHeight }} {...divProps} />
});