import React from 'react';
import { useTable } from 'react-table';
import { Form } from 'react-bootstrap';

function Table({
  columns,
  data = [{}],
  appendHeaders,
  appendCells,
  onCheck,
}) {
  const {
    getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,
  } = useTable({ columns, data });

  const handleCheckChange = (e) => {
    if (onCheck) {
      onCheck(parseInt(e.target.id, 10));
    }
  };

  const prependHeaders = () => (
    <>
      <th>Delete</th>
      <th>Edit</th>
    </>
  );

  const prependCells = (row, i) => (
    <>
      <td>
        <Form.Check
          className="mx-2"
          type="checkbox"
          id={i.toString()}
          onChange={handleCheckChange}
        />
      </td>
      <td>
        <a href="#">Edit</a>
      </td>
    </>
  );

  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm" {...getTableProps()}>
        <thead>
        {
          headerGroups.map((headerGrp) => (
            <tr {...headerGrp.getHeaderGroupProps()}>
              {prependHeaders && prependHeaders(headerGrp)}
              {headerGrp.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
              {appendHeaders && appendHeaders(headerGrp)}
            </tr>
          ))
        }
        </thead>
        <tbody {...getTableBodyProps()}>
        {
          rows.map((row, i) => {
            prepareRow(row);
            return (
            <tr {...row.getRowProps()} className="align-middle">
              {prependCells && prependCells(row, i)}
              {
                row.cells.map((cell) => <td {...cell.getCellProps()}>{cell.render('Cell')}</td>)
              }
              {appendCells && appendCells(row)}
            </tr>
            );
          })
        }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
