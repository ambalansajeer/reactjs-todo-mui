import * as React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import {
  Box,
  Grid,
  IconButton,
  Popover,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useContext } from "react";
import { AppContext } from "../context/context";
import { postTodoApi } from "./ApiFunctions";
import { useState } from "react";
import AppPopover from "./AppPopover";

export default function TodoList() {
  const { setAction, todoList, setShowModal, setCurrentTodo, setAlert } =
    useContext(AppContext);
  const updateTodoList = (row) => {
    setCurrentTodo(row);
    setShowModal(true);
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      </GridToolbarContainer>
    );
  }

  const deleteTodoList = async (row) => {
    const response = await postTodoApi("delete/" + row.id);
    setAlert(response);
    setAction("initial");
  };

  const completeTodoList = async (row) => {
    const response = await postTodoApi("complete/" + row.id);
    setAlert(response);
    setAction("initial");
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 70 },
    {
      field: "title",
      headerName: "Title",
      flex: 2,
      minWidth: 120,
      renderCell: (params) => {
        const title = params.row.title;

        return (
          <>
            <AppPopover data={title} />
          </>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      flex: 3,
      minWidth: 150,
      renderCell: (params) => {
        const title = params.row.description;

        return (
          <>
            <AppPopover data={title} />
          </>
        );
      },
    },
    {
      field: "due_date",
      headerName: "Due Date",
      type: "number",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        const row = params.row;
        return (
          <Typography>
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(new Date(row.due_date))}
          </Typography>
        );
      },
    },
    {
      field: "status",
      headerName: "completed",
      type: "number",
      flex: 2,
      minWidth: 120,
      renderCell: (params) => {
        const row = params.row;
        return (
          <>
            {!row.completed ? (
              <IconButton
                aria-label="pending"
                disabled
                sx={{ fontSize: { xs: 12, sm: 16, md: 25, lg: 30 } }}
              >
                <Typography color={"orange"}>In-Progress</Typography>
                <DoneIcon
                  color="warning"
                  sx={{ fontSize: { xs: 12, sm: 16, md: 25, lg: 30 } }}
                />
              </IconButton>
            ) : (
              <IconButton
                color="success"
                aria-label="complete"
                disabled
                sx={{ fontSize: { xs: 12, sm: 16, md: 25, lg: 30 } }}
              >
                <Typography color={"greenyellow"}>Completed</Typography>
                <DoneIcon
                  color="success"
                  sx={{ fontSize: { xs: 12, sm: 16, md: 25, lg: 30 } }}
                />
              </IconButton>
            )}
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      align: "right",
      flex: 1,
      minWidth: 120,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
      renderCell: (params) => {
        const row = params.row;
        return (
          <Stack
            direction="row"
            spacing={0}
            justifyContent={"end"}
            justifyItems={"flex-end"}
          >
            {!row.completed ? (
              <IconButton
                aria-label="complete"
                onClick={() => {
                  completeTodoList(row);
                }}
              >
                <DoneIcon color="success" />
              </IconButton>
            ) : (
              <></>
            )}
            <IconButton
              aria-label="edit"
              onClick={() => {
                updateTodoList(row);
              }}
              color="primary"
            >
              <EditNoteIcon color="secondary" />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => {
                deleteTodoList(row);
              }}
              color="primary"
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={todoList ?? []}
        columns={columns}
        initialState={{
          sorting: {
            sortModel: [{ field: "id", sort: "desc" }],
          },
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        rowSelection={false}
        slots={{
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}
