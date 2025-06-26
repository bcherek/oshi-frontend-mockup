// theme.ts
//Unfortunately, server components can't pull static values from globals.css because globals.css is only accessible via
//the client or via CSS. The workaround is to make a theme.ts file

export interface Theme {
  colors: {
    chatOpacityColor: string;
    chatOpacityAmount: number;
  };
  getMyGradientBox: (myColor?: string, border?: string) => React.CSSProperties;
  getOtherGradientBox: (
    myColor?: string,
    border?: string
  ) => React.CSSProperties;
}

const theme: Theme = {
  colors: {
    chatOpacityColor: "#000000",
    chatOpacityAmount: 0.8,
  },

  // gradient boxes stolen from https://codyhouse.co/nuggets/css-gradient-borders
  getMyGradientBox(myColor = "#00000000", border = "4px") {
    return {
      background: `
        linear-gradient(${myColor}, ${myColor}) padding-box,
        var(--gradient-1) border-box
      `,
      borderRadius: "3em",
      border: border + " solid transparent",
    };
  },
  getOtherGradientBox(otherColor = "#00000000", border = "4px") {
    return {
      background: `
        linear-gradient(${otherColor}, ${otherColor}) padding-box,
        var(--gradient-2) border-box
      `,
      borderRadius: "3em",
      border: border + " solid transparent",
    };
  },
};

export default theme;
