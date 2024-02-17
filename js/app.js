/**
 * Custom class to validate form
 * Form Page - Singleton Pattern
 * @author Fer Catalano
 */
class Validate_Form {

    form = null;
    send = null;
    reset = null;
    
    constructor() {

        // Singleton Pattern
        if (typeof Validate_Form.instance === "object") {
            return Validate_Form.instance;
        }

        Validate_Form.instance = this;
        
        this.init();
    }
    
    init() {
        this.form = document.getElementById('formulario');
        this.send = document.getElementById('submit');
        this.reset = document.getElementById('reset');
        // Listeners
        this.eventsListener();
    }

    eventsListener() {
        // Get all inputs
        const inputs = this.form.querySelectorAll('input, textarea');
        // Loop on inputs to add event listener
        inputs.forEach(input => input.addEventListener('blur', this.validate.bind(this)) );
        // Add event listener
        this.reset.addEventListener('click', this.resetForm.bind(this));
    }

    validate(e) {
        // Check complete form
        if(!this.checkCompleteForm()) {
            // Disable send button
            this.send.setAttribute('disabled', true);
            this.send.classList.add('opacity-50');
        }

        // Remove error
        this.removeError(e.target);

        // Validate required
        if(e.target.value.trim() === '') {
            // Add error input
            e.target.classList.remove('bg-green-300');
            e.target.classList.add('border-red-600');
            // Show error
            this.showAlert(`The ${e.target.name} field is required`, e.target);
            return;
        }

        // Validate email
        if(e.target.type === 'email' && !this.validateEmail(e.target)) {
            // Add error input
            e.target.classList.remove('bg-green-300');
            e.target.classList.add('border-red-600');
            // Show error
            this.showAlert('The email is not valid', e.target);
            return;
        }

        // Check complete form
        if(this.checkCompleteForm()) {
            // Enable send button
            this.send.removeAttribute('disabled');
            this.send.classList.remove('opacity-50');
        }
    }

    validateEmail(elem) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        if(!regex.test(elem.value)) return false;
        return true;
    }

    showAlert(message, elem) {
        // Check if there is already an error
        const parent = elem.parentElement;
        if (parent.querySelectorAll('.error-message').length > 0) return;
        // Create error
        const error = document.createElement('p');
        error.textContent = message;
        error.classList.add('error-message','text-red','text-right');
        // Insert error before send button in form
        parent.appendChild(error);
    }

    removeError(elem) {    
        elem.classList.remove('border-red-600');
        elem.classList.add('bg-green-300');
        const parent = elem.parentElement;
        const error = parent.querySelector('.error-message');
        if(error) parent.removeChild(error);
    }

    /**
     * Checks if the form is complete by looking for error messages.
     *
     * @return {boolean} true if the form is complete, false otherwise
     */
    checkCompleteForm() {
        const errors = this.form.querySelectorAll('.error-message');
        const inputs = this.form.querySelectorAll('input, textarea');

        // Check if there are errors
        if(errors.length > 0) return false;

        // Check if there are empty inputs
        const emptyInputs = [...inputs].filter(input => input.value.trim() === '');
        if(emptyInputs.length > 0) return false;

        return true;
    }

    resetForm() {
        // Remove errors
        const errors = this.form.querySelectorAll('.error-message');
        if(errors.length > 0) {
           errors.forEach(error => error.remove());
        }
        // Disable send button
        this.send.setAttribute('disabled', true);
        this.send.classList.add('opacity-50');
    }

}

document.addEventListener('DOMContentLoaded', () => new Validate_Form() );