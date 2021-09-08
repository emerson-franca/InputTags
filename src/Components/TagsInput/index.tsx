import React, { useState } from 'react'
import Chip from '@material-ui/core/Chip'
import TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

import './styles.scss'
import useEmail from '@/hooks/useEmail'
import { Button } from '@material-ui/core'

export default function TagsInput({ ...other }: OutlinedTextFieldProps) {
  const [inputValue, setInputValue] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [emails, setEmails, sendEmail] = useEmail()

  const isValidEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/

  const handleDelete = (item: string) => {
    const newItems = emails.filter((tag) => item !== tag)
    setEmails(newItems)
  }

  const handleTabOrEnter = (event: React.KeyboardEvent<HTMLDivElement>, inputValue: string) => {
    event.preventDefault()
    const allValues = inputValue.split(';')
    const emailsToInclude = allValues.filter(
      (value) => isValidEmail.test(value) && emails.indexOf(value) === -1
    )
    if (emailsToInclude.length > 0) {
      setEmails([...emails, ...emailsToInclude])
    } else {
      setShowAlert(true)
    }
    setInputValue('')
  }

  const handleBackspace = (inputValue: string) => {
    if (inputValue === '') {
      const ItemsAfterDelete = emails.filter((tag) => tag !== emails[emails.length - 1])
      setEmails(ItemsAfterDelete)
    }
  }

  const handleInputValue = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={showAlert}
        autoHideDuration={2000}
        onClose={() => setShowAlert(false)}
      >
        <SnackbarContent message="Email inválido" />
      </Snackbar>
      <TextField
        value={inputValue}
        onChange={(event) => handleInputValue(event)}
        classes={{ root: 'text_field' }}
        onKeyDownCapture={(event) => {
          let inputValue = (event.target as HTMLTextAreaElement).value
          if (event.key === 'Tab' || event.key === 'Enter') {
            handleTabOrEnter(event, inputValue)
          }

          if (event.key === 'Backspace') {
            handleBackspace(inputValue)
          }
        }}
        InputProps={{
          'data-testid': 'tags-input',
          fullWidth: true,
          startAdornment: emails?.map((item) => (
            <Chip
              classes={{ root: 'tags' }}
              color="primary"
              key={item}
              tabIndex={-1}
              label={item}
              onDelete={() => handleDelete(item)}
              style={{ margin: '3px' }}
            />
          )),
        }}
        {...other}
      />
      <Button
        style={{
          height: '50px',
          margin: '20px 0',
        }}
        title="submit"
        variant="contained"
        color="primary"
        value="submit"
        onClick={() => sendEmail()}
      >
        Enviar
      </Button>
    </>
  )
}
