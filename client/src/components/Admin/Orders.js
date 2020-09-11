import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, 'Sofia', 'Lago', '10/09/2020', '3', 'Franco Etcheverri'),
  createData(1, 'Agustina', 'Grimaldi', '10/09/2020', '3', 'Franco Etcheverri'),
  createData(2, 'Matías', 'Galvan', '10/09/2020', '3', 'Franco Etcheverri'),
  createData(3, 'Mauro', 'Picatto', '10/09/2020', '3', 'Franco Etcheverri'),
  createData(4, 'Rodrigo', 'Villarruel', '10/09/2020', '3', 'Franco Etcheverri'),
  createData(5, 'Lucía', 'Gentile', '10/09/2020', '3', 'Franco Etcheverri')
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Alumnos del Cohorte 03</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Fecha de Nacimiento</TableCell>
            <TableCell>Grupo</TableCell>
            <TableCell>PM</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell>{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          Listar más alumnos
        </Link>
      </div>
    </React.Fragment>
  );
}
