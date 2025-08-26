import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

test('calls onSearch with input value when form is submitted', () => {
  const mockSearch = jest.fn();
  const { getByTestId, getByText } = render(<SearchBar onSearch={mockSearch} />);

  const input = getByTestId('search-input');
  const button = getByText('Search');

  fireEvent.change(input, { target: { value: 'jacket' } });
  fireEvent.click(button);

  expect(mockSearch).toHaveBeenCalledWith('jacket');
});