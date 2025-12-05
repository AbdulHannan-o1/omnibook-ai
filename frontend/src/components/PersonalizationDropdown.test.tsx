import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PersonalizationDropdown from './PersonalizationDropdown';
import { usePersonalizationStore } from '../stores/personalizationStore';
import * as textSelection from '../utils/textSelection';
import * as personalizationService from '../services/personalizationService';

jest.mock('../stores/personalizationStore');
jest.mock('../utils/textSelection');
jest.mock('../services/personalizationService');

describe('PersonalizationDropdown', () => {
  beforeEach(() => {
    (usePersonalizationStore as jest.Mock).mockReturnValue({
      isDropdownOpen: true,
    });
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('does not render dropdown content when closed', () => {
    (usePersonalizationStore as jest.Mock).mockReturnValue({
      isDropdownOpen: false,
    });
    render(<PersonalizationDropdown />);
    expect(screen.queryByText(/Difficulty/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Topic/i)).not.toBeInTheDocument();
  });

  it('renders dropdown content when open', () => {
    render(<PersonalizationDropdown />);
    expect(screen.getByText(/Difficulty/i)).toBeInTheDocument();
    expect(screen.getByText(/Topic/i)).toBeInTheDocument();
  });

  it('calls handleHighlight when highlight button is clicked', () => {
    const getTextSelectionSpy = jest.spyOn(textSelection, 'getTextSelection').mockReturnValue('selected text');
    const saveHighlightSpy = jest.spyOn(personalizationService, 'saveHighlight').mockResolvedValue({ message: 'Highlight saved' });
    render(<PersonalizationDropdown />);
    fireEvent.click(screen.getByText('Highlight'));
    expect(getTextSelectionSpy).toHaveBeenCalled();
    expect(saveHighlightSpy).toHaveBeenCalledWith('selected text');
  });

  it('calls handleAddAnnotation when add annotation button is clicked', () => {
    const getTextSelectionSpy = jest.spyOn(textSelection, 'getTextSelection').mockReturnValue('selected text');
    const saveAnnotationSpy = jest.spyOn(personalizationService, 'saveAnnotation').mockResolvedValue({ message: 'Annotation saved' });
    render(<PersonalizationDropdown />);
    fireEvent.change(screen.getByPlaceholderText('Add a note...'), { target: { value: 'a note' } });
    fireEvent.click(screen.getByText('Add Annotation'));
    expect(getTextSelectionSpy).toHaveBeenCalled();
    expect(saveAnnotationSpy).toHaveBeenCalledWith('selected text', 'a note');
  });

  it('shows an error message when saving highlight fails', async () => {
    jest.spyOn(textSelection, 'getTextSelection').mockReturnValue('selected text');
    jest.spyOn(personalizationService, 'saveHighlight').mockRejectedValue(new Error('Failed to save highlight'));

    render(<PersonalizationDropdown />);
    fireEvent.click(screen.getByText('Highlight'));

    await waitFor(() => {
      expect(screen.getByText(/Failed to save highlight/)).toBeInTheDocument();
    });
  });
});