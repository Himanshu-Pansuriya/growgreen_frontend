import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const AdminHomePage = () => {
    return (
        <Container fluid className="p-4">
            <Row className="mb-4">
                <Col>
                    <h1>Admin Dashboard</h1>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Manage Users</Card.Title>
                            <Card.Text>
                                View, edit, and delete user accounts.
                            </Card.Text>
                            <Button variant="primary">Go to Users</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Manage Products</Card.Title>
                            <Card.Text>
                                Add, edit, and delete products.
                            </Card.Text>
                            <Button variant="primary">Go to Products</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>View Reports</Card.Title>
                            <Card.Text>
                                View sales and user activity reports.
                            </Card.Text>
                            <Button variant="primary">Go to Reports</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminHomePage;