import React from 'react';
import { useTable } from 'react-table';

function Table({
  columns,
  data = [{}],
  addHeader,
  addCell,
}) {
  const {
    getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm" {...getTableProps()}>
        <thead>
        {
          headerGroups.map((headerGrp) => (
            <tr {...headerGrp.getHeaderGroupProps()}>
              {headerGrp.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
              {addHeader && addHeader(headerGrp)}
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
              {
                row.cells.map((cell) => <td {...cell.getCellProps()}>{cell.render('Cell')}</td>)
              }
              {addCell && addCell(row)}
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
