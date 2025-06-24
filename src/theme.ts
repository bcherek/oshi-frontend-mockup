// theme.ts
//Unfortunately, server components can't pull static values from globals.css because globals.css is only accessible via
//the client or via CSS. The workaround is to make a theme.ts file

export interface Theme {
  colors: {
    chatOpacityColor: string
    chatOpacityAmount: number
  }
  getMyGradientBox: (myColor: string) => React.CSSProperties,
  getOtherGradientBox: (myColor: string) => React.CSSProperties
}

const theme: Theme = {
  colors: {
    chatOpacityColor: "#000000",
    chatOpacityAmount: 0.8,
  },
    
  // gradient boxes stolen from https://codyhouse.co/nuggets/css-gradient-borders
  getMyGradientBox(myColor) {
    return {
      background: `
        linear-gradient(${myColor}, ${myColor}) padding-box,
        linear-gradient(90deg, #6ACDE4 0%, #4B30B3 100%) border-box
      `,
    }
  },
getOtherGradientBox(otherColor) {
    return {
      background: `
        linear-gradient(${otherColor}, ${otherColor}) padding-box,
        linear-gradient(90deg, #9F2525 0%, #D36464 100%) border-box
      `,
      borderRadius: "50em",
      border: "4px solid transparent",
    }
  },
  
}

export default theme
