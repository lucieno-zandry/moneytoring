// import React from "react";

type Props = {
  children: string;
  gap?: number;
  globalDelay?: number;
};

export default (props: Props) => {
  const { children = "", gap = 0.1, globalDelay = 0 } = props;
  const splited = children.split("");

  // const delay = React.useMemo(() => gap + globalDelay, [gap, globalDelay]);

  return splited.map((text, index) => <span
    className="progressive-text"
    key={index}
    style={{ animationDelay: `${(index * gap) + globalDelay}s` }}>{text}</span>)
};
