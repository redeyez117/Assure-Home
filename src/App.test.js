import { render, screen, fireEvent } from '@testing-library/react';
import HubSection from './components/HubSection';
import NewHub from './components/newHub';
describe('HubSection component', () => {
  it('renders search input', () => {
    const { getByTestId } = render(<HubSection />);
    expect(getByTestId('searchbox')).toBeInTheDocument();
  });

  it('creates Hub on click of create button', () => {
    const { getByTestId, getByText } = render(<HubSection />);
    const createHubButton = getByTestId('create-hub');
    fireEvent.click(createHubButton);
    expect(getByText('CREATE HUB')).toBeInTheDocument();
  });
});

describe('NewHub component', () => {
  const mockCloseForm = jest.fn();
  const mockAdd = jest.fn();
  const mockFilteredHubs = [{ serialNo: 'ABC123', status: 'OLD' }];
  window.alert = jest.fn();
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render NewHub component', () => {
    render(<NewHub closeForm={mockCloseForm} add={mockAdd} filteredHubs={mockFilteredHubs} />);
    const newHubDiv = screen.getByTestId('new-hub-div');
    expect(newHubDiv).toBeInTheDocument();
  });

  it('should add new hub', () => {
    render(<NewHub closeForm={mockCloseForm} add={mockAdd} filteredHubs={mockFilteredHubs} />);
    const inputElm = screen.getByPlaceholderText('Serial number ex H542k....');
    const addBtn = screen.getByRole('button', { name: /add/i });
    const newSerialNo = 'H542k';
    fireEvent.change(inputElm, { target: { value: newSerialNo } });
    fireEvent.click(addBtn);
    expect(mockAdd).toHaveBeenCalledTimes(1);
    expect(mockAdd).toHaveBeenCalledWith({
      serialNo: newSerialNo,
      status: 'NEW',
      latest_updated: expect.any(Date),
    });
  });

  it('should cancel the creation', () => {
    render(<NewHub closeForm={mockCloseForm} add={mockAdd} filteredHubs={mockFilteredHubs} />);
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelBtn);
    expect(mockCloseForm).toHaveBeenCalledTimes(1);
    expect(mockCloseForm).toHaveBeenCalledWith(false);
  });

  it('should show an alert if serial number is not provided', () => {
    render(<NewHub closeForm={mockCloseForm} add={mockAdd} filteredHubs={mockFilteredHubs} />);
    const addBtn = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addBtn);
    expect(window.alert).toHaveBeenCalledWith('Please fill serial number field!');
  });

  it('should show an alert if hub with this serial number already exists', () => {
    render(<NewHub closeForm={mockCloseForm} add={mockAdd} filteredHubs={mockFilteredHubs} />);
    const inputElm = screen.getByPlaceholderText('Serial number ex H542k....');
    const addBtn = screen.getByRole('button', { name: /add/i });
    const existingSerialNo = 'ABC123';
    fireEvent.change(inputElm, { target: { value: existingSerialNo } });
    fireEvent.click(addBtn);
    expect(window.alert).toHaveBeenCalledWith(`Hub with serial number ${existingSerialNo} already exist!`);
  });
});

