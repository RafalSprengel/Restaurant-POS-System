import { useEffect, useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import Stack from 'react-bootstrap/Stack';

const Categories = () => {
    const [deletingError, setDeletingErrors] = useState(null);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const { data: categoryList, loading: loadingCategory, error: fetchError, refetch } = useFetch('http://localhost:3001/api/getAllCategories');
    const navigate = useNavigate();

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    const handleRowClick = (id) => {
        navigate(`${id}`);
    };

    const handleDeleteClick = (e, id) => {
        e.stopPropagation();
        setCategoryToDelete(id);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        deleteCategory(categoryToDelete);
    };

    const deleteCategory = async (id) => {
        setDeletingErrors(false);
        try {
            const response = await fetch('http://localhost:3001/api/deleteCategor/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Unable do delete element, datails: ' + errorData.error);
                throw new Error(errorData.error);
            }
        } catch (error) {
            console.error(error);
            setDeletingErrors(error.toString());
        } finally {
            setShowModal(false);
            refetch();
        }
    };

    const Row = ({ el }) => {
        return (
            <tr onClick={() => handleRowClick(el._id)}>
                <td>{el.name}</td>
                <td>
                    <img
                        src={el.image}
                        className="admin__categoryImg"
                        onClick={() => handleImageClick(el.image)}
                        style={{ cursor: 'pointer' }}
                        alt="Category"
                    />
                </td>
                <td>{el.index}</td>
                <td onClick={(e) => handleDeleteClick(e, el._id)}>delete</td>
            </tr>
        );
    };

    const categoriesRows = categoryList?.map((el) => {
        return <Row key={el._id} el={el} />;
    });

    return (
        <>
            {loadingCategory && <h4>Loading data...</h4>}
            {deletingError && <Alert variant="danger">{deletingError}</Alert>}
            {fetchError && <Alert variant="danger">{fetchError.toString()}</Alert>}
            {categoryList && (
                <>
                    <h3>Categories</h3>
                    <Stack direction="horizontal" gap={3}>
                        <div className="p-2">
                            <input className="btn btn-primary" type="button" value="Add new.." onClick={() => navigate('/admin/add-category')} />
                        </div>
                        <div className="p-2 ms-auto"></div>
                        <div className="p-2 ms-auto"></div>
                    </Stack>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Index</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>{categoriesRows}</tbody>
                    </table>
                </>
            )}
            {/* Modal for confirmation */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want do delete this category?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Modal for image preview */}
            <Modal show={!!selectedImage} onHide={handleCloseModal} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Image Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={selectedImage} className="admin__imgFluid" alt="Preview" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Categories;
