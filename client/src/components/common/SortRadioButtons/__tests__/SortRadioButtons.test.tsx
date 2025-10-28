import { render, screen, fireEvent } from '@testing-library/react';
import SortRadioButtons from '../index';

const mockOnChange = jest.fn();

describe('SortRadioButtons', () => {
  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders both radio options', () => {
    render(<SortRadioButtons value="number" onChange={mockOnChange} />);
    
    expect(screen.getByLabelText('Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('shows correct initial selection', () => {
    render(<SortRadioButtons value="name" onChange={mockOnChange} />);
    
    const numberRadio = screen.getByDisplayValue('number') as HTMLInputElement;
    const nameRadio = screen.getByDisplayValue('name') as HTMLInputElement;
    
    expect(numberRadio.checked).toBe(false);
    expect(nameRadio.checked).toBe(true);
  });

  it('calls onChange when number option is selected', () => {
    render(<SortRadioButtons value="name" onChange={mockOnChange} />);
    
    const numberRadio = screen.getByDisplayValue('number');
    fireEvent.click(numberRadio);
    
    expect(mockOnChange).toHaveBeenCalledWith('number');
  });

  it('calls onChange when name option is selected', () => {
    render(<SortRadioButtons value="number" onChange={mockOnChange} />);
    
    const nameRadio = screen.getByDisplayValue('name');
    fireEvent.click(nameRadio);
    
    expect(mockOnChange).toHaveBeenCalledWith('name');
  });

  it('has proper radio button grouping', () => {
    render(<SortRadioButtons value="number" onChange={mockOnChange} />);
    
    const numberRadio = screen.getByDisplayValue('number');
    const nameRadio = screen.getByDisplayValue('name');
    
    expect(numberRadio).toHaveAttribute('name', 'sort');
    expect(nameRadio).toHaveAttribute('name', 'sort');
  });
});
