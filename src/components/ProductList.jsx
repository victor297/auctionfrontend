import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { productsDelete } from "../slices/productsSlice";
import { useState } from "react";
import Email from "./Email";

export default function ProductsList() {
  const { items } = useSelector((state) => state.products);
  const { userName } = useSelector((state) => state.auth);
  const useritems = items.filter((item) => item.userName === userName);
  const [visible, setvisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rows =
    useritems &&
    useritems.map((item) => {
      return {
        id: item._id,
        imageUrl: item.image.url,
        pName: item.name,
        pDesc: item.desc,
        price: item.price.toLocaleString(),
        sold: item.sold,
      };
    });
  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 80,
      renderCell: (params) => {
        return (
          <div>
            <Image
              src={params.row.imageUrl}
              alt=''
              style={{ width: "45px", height: "52px" }}
            />
          </div>
        );
      },
    },
    { field: "pName", headerName: "Name", width: 130 },
    {
      field: "pDesc",
      headerName: "Description",
      width: 300,
    },
    {
      field: "price",
      headerName: "price",
      width: 80,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 350,
      renderCell: (params) => {
        return (
          <Row>
            <Col
              onClick={() => handleDelete(params.row.id)}
              className='btn btn-sm btn-danger m-1'
            >
              <small>Delete</small>
            </Col>
            <Col
              onClick={() => navigate(`/product/${params.row.id}`)}
              className='btn btn-sm btn-dark m-1'
            >
              <small>View</small>
            </Col>
            {params.row.sold ? (
              <Col className='btn btn-sm btn-info m-1'>
                <small>sold</small>
              </Col>
            ) : (
              <Col className='btn btn-sm btn-dark m-1'>
                <small>marketing</small>
              </Col>
            )}
            {params.row.sold ? (
              <Col className='btn btn-sm btn-success m-1'>
                <small onClick={setvisible(false)}> withdraw</small>
              </Col>
            ) : (
              <Col className='btn btn-sm btn-dark m-1'>
                <small>Unavailable</small>
              </Col>
            )}
          </Row>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    dispatch(productsDelete(id));
  };
  return (
    <Container style={{ height: 400, width: "75%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableselectionOnClick
      />
      <div className={visible ? "d-none" : "d-block"}>
        <Email />
      </div>
    </Container>
  );
}
