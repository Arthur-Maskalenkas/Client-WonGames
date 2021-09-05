import { ThemeProvider } from 'styled-components'
import {CartContext, CartContextDefaultValues} from '../src/hooks/use-cart'
import GlobalStyles from 'styles/global'
import theme from 'styles/theme'

export const parameters = {
  backgrounds: {
    default: 'won-light',
    values: [
      {
        name: 'won-light',
        value: theme.colors.white
      },
      {
        name: 'won-dark',
        value: theme.colors.mainBg
      }
    ]
  }
}

// Se existir cartContextValue pega ele, senão, pega os args mesmo, ou vice versa, pois pega o primeiro que ser passado.
export const decorators = [
  (Story, context) => (
    <ThemeProvider theme={theme}>
      <CartContext.Provider value={{...CartContextDefaultValues, ...(context?.args?.cartContextValue || {}),...context.args}}>
        <GlobalStyles removeBg />
        <Story />
      </CartContext.Provider>
    </ThemeProvider>
  )
]
