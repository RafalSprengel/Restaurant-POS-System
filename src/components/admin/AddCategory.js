import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddCategory = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        image: ''
    });

    // Obsługa zmiany wartości formularza
    const handleChange = (e) => {
        setShowErrorAlert(false);
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Obsługa wysłania formularza
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3001/api/addCategory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const res = await response.json();

            if (response.ok) {
                setShowSuccessModal(true);
            } else {
                console.error('Error: ', res.error);
                setErrorMessage(res.error || 'Failed to save category.');
                setShowErrorAlert(true);
            }
        } catch (error) {
            console.error('Error: Problem z połączeniem do backendu', error);
            setErrorMessage('Problem z połączeniem do backendu');
            setShowErrorAlert(true);
        } finally {
            setIsLoading(false);
        }
    };

    // Zamknięcie modalu sukcesu
    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
        navigate(-1);
    };

    return (
        <>
            <form className='menu-item-form' onSubmit={handleSubmit}>
                <h3>Add a new category</h3>
                {showErrorAlert && (
                    <Alert variant='danger'>
                        Failed to save Category. {errorMessage}
                    </Alert>
                )}
                <label>Name:</label>
                <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                />
                <label>Image:</label>
                <input
                    type='text'
                    name='image'
                    value={formData.image}
                    onChange={handleChange}
                    disabled={isLoading}
                />
                <button type='submit' disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Category'}
                </button>
            </form>

            <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Category added successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSuccessModal}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddCategory;