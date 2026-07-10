/* Shared open/close state for the "Hire Adam" lead-form modal.
   Every CTA on the page toggles this instead of linking anywhere. */
export const useHireModal = () => useState('hire-modal-open', () => false)
