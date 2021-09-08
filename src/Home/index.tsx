import ThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import React from 'react'
import TagsInput from '../Components/TagsInput'
import Header from '../Components/Header'
import { theme } from '../global/theme'

import './styles.scss'

const Home: React.VFC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <Header />
        <h1 className="container__title">Email`s Sender</h1>
        <TagsInput
          variant="outlined"
          fullWidth
          id="tags"
          name="tags"
          placeholder="adicionar email"
          label="Emails"
        />
        <h4 className="container__info">pressione backspace para deletar o último elemento</h4>
        <h4 className="container__info">pressione enter ou tab para incluir um email</h4>
      </div>
    </ThemeProvider>
  )
}

export default Home
