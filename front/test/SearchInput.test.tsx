import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchInput } from '../src/components/SearchInput';

describe('SearchInput Component', () => {
  let mockOnSearch: jest.Mock;

  beforeEach(() => {
    mockOnSearch = jest.fn();
  });

  test('should render the search input with correct placeholder', () => {
    render(<SearchInput onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search for a user');
    expect(input).toBeInTheDocument();
  });

  test('should have type text', () => {
    render(<SearchInput onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search for a user');
    expect(input).toHaveAttribute('type', 'text');
  });

  test('should call onSearch when input value changes', () => {
    render(<SearchInput onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search for a user');
    fireEvent.change(input, { target: { value: 'testuser' } });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('testuser');
  });

  test('should call onSearch multiple times with different values', () => {
    render(<SearchInput onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search for a user');

    fireEvent.change(input, { target: { value: 'Bruno' } });
    expect(mockOnSearch).toHaveBeenCalledWith('Bruno');

    fireEvent.change(input, { target: { value: 'testuser' } });
    expect(mockOnSearch).toHaveBeenCalledWith('testuser');

    expect(mockOnSearch).toHaveBeenCalledTimes(2);
  });

  test('should be enabled by default', () => {
    render(<SearchInput onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search for a user');
    expect(input).not.toBeDisabled();
  });

  test('should be enabled when loading is false', () => {
    render(<SearchInput onSearch={mockOnSearch} loading={false} />);

    const input = screen.getByPlaceholderText('Search for a user');
    expect(input).not.toBeDisabled();
  });

  test('should be disabled when loading is true', () => {
    render(<SearchInput onSearch={mockOnSearch} loading={true} />);

    const input = screen.getByPlaceholderText('Search for a user');
    expect(input).toBeDisabled();
  });

  test('should have the correct CSS class', () => {
    const { container } = render(<SearchInput onSearch={mockOnSearch} />);

    expect(container.querySelector('.container_search')).toBeInTheDocument();
  });
});
