import React, { useEffect, useState } from 'react'

interface Email {
  emails: string[]
}

export default function useEmail() {
  const [emails, setEmails] = useState<string[] | undefined>([''])

  useEffect(() => {
    getEmails()
  }, [])

  const getEmails = () => {
    fetch(`http://localhost:4010/mailing-lists/9423dad6-79f0-e8ea-a4ce-70d4cafa547f`, {
      headers: {
        token: '9423dad6-79f0-e8ea-a4ce-70d4cafa547f',
      },
    })
      .then((resp) => resp.json())
      .then((final: Email) => {
        setEmails(final.emails)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const sendEmail = () => {
    fetch(`http://localhost:4010/mailing-lists/9423dad6-79f0-e8ea-a4ce-70d4cafa547f`, {
      method: 'PATCH',
      headers: {
        token: '9423dad6-79f0-e8ea-a4ce-70d4cafa547f',
      },
      body: JSON.stringify({
        emails,
      }),
    })
      .then((resp) => resp.json())
      .then((final: Email) => {
        setEmails(final.emails)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return [emails, setEmails, sendEmail] as const
}
