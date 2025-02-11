import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Table, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AdminHomePage.css";
import { getCurrenttoken } from "../../../Client/Components/LoginPage/LoginPage";

const AdminHomePage = () => {
  const [data, setData] = useState({
    users: [],
    blogs: [],
    faqs: [],
    pesticides: [],
    crops: [],
    contacts: [],
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = getCurrenttoken();

  const fetchData = async () => {
    try {
      const responses = await Promise.all([
        fetch("http://localhost:5045/api/User", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => (res.ok ? res.json() : [])),
        fetch("http://localhost:5045/api/Blog", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => (res.ok ? res.json() : [])),
        fetch("http://localhost:5045/api/FAQ", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => (res.ok ? res.json() : [])),
        fetch("http://localhost:5045/api/Pesticide", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => (res.ok ? res.json() : [])),
        fetch("http://localhost:5045/api/Crop", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => (res.ok ? res.json() : [])),
        fetch("http://localhost:5045/api/Contact", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => (res.ok ? res.json() : [])),
      ]);

      setData({
        users: responses[0],
        blogs: responses[1],
        faqs: responses[2],
        pesticides: responses[3],
        crops: responses[4],
        contacts: responses[5],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderTable = (title, tableData, onNavigate) => (
    <Card className="dashboard-card mb-4"> {/* Add a custom class */}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {tableData.length > 0 ? (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                {Object.keys(tableData[0]).slice(0, 3).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.slice(0, 3).map((item, index) => (
                <tr key={index}>
                  {Object.values(item).slice(0, 3).map((value, idx) => (
                    <td key={idx}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No data available.</p>
        )}
        <Button variant="primary" onClick={onNavigate}>
          Show More
        </Button>
      </Card.Body>
    </Card>
  );

  if (loading) {
    return (
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container fluid className="p-4">
        <div className="dashboard-header py-4 text-center">
            <h1>Welcome to the Admin Dashboard</h1>
            <p style={{fontSize:"1rem"}}>Manage your resources efficiently from here.</p>
          </div>
      <Row className="mb-4">
      </Row>
      <Row>
        <Col md={6}>
          {renderTable("Users", data.users, () => navigate("/admin/login"))}
        </Col>
        <Col md={6}>
          {renderTable("Blogs", data.blogs, () => navigate("/admin/blog"))}
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          {renderTable("Crops", data.crops, () => navigate("/admin/crop"))}
        </Col>
        <Col md={6}>
          {renderTable("Contacts", data.contacts, () => navigate("/admin/contact"))}
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          {renderTable("FAQs", data.faqs, () => navigate("/admin/faqs"))}
        </Col>
        <Col md={6}>
          {renderTable("Pesticides", data.pesticides, () => navigate("/admin/pesticides"))}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHomePage;
