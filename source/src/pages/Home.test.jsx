import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';
import { productContext } from '../provider/ProductProvider'

const mockProducts = [
  { id: 1, title: 'Red Shirt', price: 29.99, image: 'image1.jpg' },
  { id: 2, title: 'Blue Jacket', price: 49.99, image: 'image2.jpg' },
];

const renderWithContext = (component) => {
  return render(
    <productContext.Provider value={{ products: mockProducts, loading: false }}>
      {component}
    </productContext.Provider>
  );
};

test('renders search input and product titles', () => {
  renderWithContext(<Home />);
  
  // Check input is present
  const input = screen.getByPlaceholderText(/search your product/i);
  expect(input).toBeInTheDocument();

  // Check product titles are rendered
  expect(screen.getByText(/Red Shirt/i)).toBeInTheDocument();
  expect(screen.getByText(/Blue Jacket/i)).toBeInTheDocument();
});

test('filters products based on search term', () => {
  renderWithContext(<Home />);
  
  const input = screen.getByPlaceholderText(/search your product/i);
  const button = screen.getByText(/search/i);

  // Type into input
  fireEvent.change(input, { target: { value: 'jacket' } });
  fireEvent.click(button);

  // Only Blue Jacket should be visible
  expect(screen.queryByText(/Red Shirt/i)).not.toBeInTheDocument();
  expect(screen.getByText(/Blue Jacket/i)).toBeInTheDocument();
});