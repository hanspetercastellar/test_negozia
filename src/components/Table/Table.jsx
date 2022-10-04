import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from "react";
import {actionsConst, openModal, rowEditing, setRowEditing} from "../../redux/reducers/clients.reducer";
import {Button, Grid, TextField} from "@mui/material";
import {ModalEdit} from "../Modals/Edit.modal";
import Swal from "sweetalert2";

let timeOut = null;
const makeStyle=(status)=>{
  if(status === 'edit')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
      marginRight: 12
    }
  }
  else if(status === 'delete')
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else{
    return{
      background: '#59bfff',
      color: 'white',
    }
  }
}

export default function BasicTable() {
  const data = useSelector((state) => state.client.items)
  const dispatch  = useDispatch()
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (row) => {
    dispatch(rowEditing(row))
    setIsEditing(true);
    setOpenModal(true)
  }

  const handleDelete = (row) => {
    Swal.fire({
      title: 'Do you want to delete this client?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch({type: actionsConst.DELETE_CLIENT, id: row._id})
        dispatch({type: actionsConst.FETCH_ALL})
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  const handleAddClients = () => {
    setIsEditing(false);
    dispatch(rowEditing({}))
    setOpenModal(true)
  }

  useEffect(() => {
    dispatch({type: actionsConst.FETCH_ALL})
  },[])

  return (
      <div className="Table">
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
          <Grid item xs={10}>
            <h1>Clients</h1>
          </Grid>
          <Grid item xs>
            <Button onClick={handleAddClients}>
              Add Clients
            </Button>
          </Grid>
        </Grid>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">LasName</TableCell>
                <TableCell align="left">Phone</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">City</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {data && data.length && data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.lastName}</TableCell>
                  <TableCell align="left">{row.phone}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.city}</TableCell>
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="left">
                    <Button className="status" onClick={() => handleEdit(row)} style={makeStyle('edit')}>{'Edit'}</Button>
        
                    <Button className="status" onClick={() => handleDelete(row)} style={makeStyle('delete')}>{'Delete'}</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ModalEdit open={openModal} handleClose={setOpenModal} isEditing={isEditing} setEdit={setIsEditing}/>
      </div>
  );
}
