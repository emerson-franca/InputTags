import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import { act } from '@testing-library/react-hooks'
import TagsInput from '../Components/TagsInput'
import userEvent from '@testing-library/user-event'

describe('TagsInput Component', () => {
  afterEach(jest.clearAllMocks)
  afterEach(cleanup)

  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ emails: ['teste@teste.com', 'teste@teste2.com'] }),
      })
    )
  })

  it('cria o snapshot do component', async () => {
    await act(async () => {
      const container = render(<TagsInput />)
      expect(container.asFragment()).toMatchSnapshot()
    })
  })

  it('deve renderizar varias tags separadas por ;', async () => {
    const container = render(<TagsInput />)

    const InputTag = screen.getByTestId('tags-input')
    userEvent.type(InputTag, 'teste@enter.com;teste@enter2.com;teste@enter3.com')
    userEvent.type(InputTag, '{enter}')

    expect(screen.getByText('teste@enter.com')).toBeInTheDocument()
    expect(screen.getByText('teste@enter2.com')).toBeInTheDocument()
    expect(screen.getByText('teste@enter3.com')).toBeInTheDocument()
  })

  it('deve renderizar tags quando preencher o input e pressionar enter', async () => {
    const container = render(<TagsInput />)

    const InputTag = screen.getByTestId('tags-input')
    userEvent.type(InputTag, 'teste@enter.com')
    userEvent.type(InputTag, '{enter}')

    expect(screen.getByText('teste@enter.com')).toBeInTheDocument()
  })

  it('deve renderizar tags quando preencher o input e pressionar tab', () => {
    const container = render(<TagsInput />)

    const InputTag = screen.getByTestId('tags-input')
    userEvent.type(InputTag, 'teste@tab.com')
    userEvent.tab()

    expect(screen.getByText('teste@tab.com')).toBeInTheDocument()
  })

  it('deve deletar a útima tag criada ao pressionar o botão de backspace', async () => {
    const container = render(<TagsInput />)

    const InputTag = screen.getByTestId('tags-input')
    userEvent.type(InputTag, 'teste@enter2.com')
    userEvent.type(InputTag, '{enter}')

    const email = screen.queryByText('teste@tab2.com')

    expect(container.asFragment()).toMatchSnapshot()
    expect(email).not.toBeInTheDocument()
  })
})
