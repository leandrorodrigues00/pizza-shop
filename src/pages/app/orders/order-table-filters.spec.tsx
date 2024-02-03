import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import { OrderTableFilters } from './order-table-filters'

describe('OrderTableFilters', () => {
  it('should clear the inputs and url when clicking the button', async () => {
    const user = userEvent.setup()

    const wrapper = render(<OrderTableFilters />, {
      wrapper: ({ children }) => {
        return (
          <MemoryRouter
            initialEntries={[
              '/orders?page=1&status=pending&orderId=s2rqm20wxtdxqyakgc6gz3bk&customerName=Dr.+Ervin+Nola',
            ]}
          >
            {children}
          </MemoryRouter>
        )
      },
    })

    const idInput = wrapper.getByPlaceholderText(
      'ID do pedido',
    ) as HTMLInputElement
    const customerNameInput = wrapper.getByPlaceholderText(
      'Nome do cliente',
    ) as HTMLInputElement

    const statusText = wrapper.getByRole('combobox') as HTMLButtonElement

    const removeFilters = wrapper.getByRole('button', {
      name: 'Remover filtros',
    })

    await user.click(removeFilters)

    expect(idInput.value).toBe('')
    expect(customerNameInput.value).toBe('')
    expect(statusText.textContent).toBe('Todos status')
  })
})
