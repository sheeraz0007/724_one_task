import { filter } from 'lodash';
import { useEffect, useState, lazy } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  IconButton,
  CircularProgress,
} from '@mui/material';
// components
//
import { useNavigate } from 'react-router-dom';
import Scrollbar from './components/Scrollbar';
import { useGetUsersListQuery } from 'services/public/auth';
import { editUserData, setUserData } from 'store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';

import { makeStyles } from '@mui/styles';
const EditUser = lazy(() => import('./components/EditUser'));
const SearchNotFound = lazy(() => import('./components/SearchNotFound'));
const UserListHead = lazy(() => import('./components/UserListHead'));

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: '#', label: '#', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },

  { id: 'action', label: 'Action', alignRight: true },
];
const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: '50%',
    marginTop: '10%',
  },
}));
// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, _user => _user.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map(el => el[0]);
}

export default function Users() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const classes = useStyles();
  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [tempData, setTempData] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const dispatch = useDispatch();
  const usersList = useSelector(state => state.user.usersList);
  const [pagination, setPagination] = useState({
    limit: 100,
    skip: 0,
  });

  const openEdit = data => {
    setTempData(data);
    setModalOpen(true);
  };
  const deleteUser = (id = 1) => {
    let index = usersList.findIndex(user => user.id === id);
    if (index >= 0) {
      let updatedList = [...usersList];
      updatedList.splice(index, 1);
      dispatch(setUserData({ usersList: updatedList }));
    }
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = event => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - usersList.length) : 0;

  const filteredUsers = applySortFilter(usersList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const handleNav = () => {
    navigate('/users/add-user');
  };
  const { data } = useGetUsersListQuery(pagination);
  console.log(usersList, 'usersListResponse');
  useEffect(() => {
    if (data?.users) {
      dispatch(setUserData({ usersList: data.users }));
      setIsLoading(false);
    }
  }, [data]);
  if (isLoading === true) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  return (
    <Container maxWidth="xl">
      <EditUser open={modalOpen} setOpen={setModalOpen} data={tempData} />
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4.5}>
        <Typography variant="h4">Users</Typography>
      </Stack>
      <Card sx={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', mb: 1 }}>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={usersList.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />
              <TableBody className="m-1">
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const { id, firstName, image, address } = row;
                    const isItemSelected = selected.indexOf(firstName) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell component="th" scope="row" padding="none" align="left">
                          <Typography variant="subtitle2" sx={{ ml: 1 }} noWrap>
                            {index + 1}
                          </Typography>
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={firstName} src={image} />
                            <Typography variant="subtitle2" noWrap>
                              {firstName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {address?.address}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="right">
                          <span>
                            <IconButton aria-label="delete" color="primary" onClick={() => openEdit(row)}>
                              <Icon icon="material-symbols:edit" />
                            </IconButton>

                            <IconButton aria-label="delete" color="error" onClick={() => deleteUser(row.id)}>
                              <Icon icon="material-symbols:delete" />
                            </IconButton>
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>

              {isUserNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterName} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={usersList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
