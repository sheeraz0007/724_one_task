import * as React from 'react';
import TextField from '@mui/material/TextField';

import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
//import Editor from "../../components/Editor/Editor";
import { styled } from '@mui/material/styles';

import { makeStyles } from '@mui/styles';

import {
  IconButton,
  Divider,
  CircularProgress,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
// import { AddProgram } from "src/DAL/Programmes/Programmes";
import { useDispatch, useSelector } from 'react-redux';
import { editUserData, setUserData } from 'store/slices/userSlice';

const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: '50%',
    marginTop: '10%',
  },
}));

const ITEM_HEIGHT = 70;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const Input = styled('input')({
  display: 'none',
});

export default function EditUser({ open, setOpen, data }) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const usersList = useSelector(state => state.user.usersList);
  const [inputs, setInputs] = React.useState({
    name: '',
    address: '',
  });
  const handleClose = () => {
    setIsLoading(false);
    setOpen(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    let payload = {
      ...data,
      firstName: inputs?.name,
      address: { ...data.address, address: inputs?.address },
    };

    let updatedList = usersList.map(user => {
      if (user.id === data?.id) {
        // update user
        return { ...user, ...payload };
      }
      return user;
    });
    dispatch(setUserData({ usersList: updatedList }));
    handleClose();
  };

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };

  React.useEffect(() => {
    //console.log(state.nav_items, "state.nav_items");
  }, [open]);

  React.useEffect(() => {
    setInputs(prevState => ({
      ...prevState,
      ['name']: data.firstName,
      ['address']: data?.address?.address,
    }));
    return () => {
      setInputs(prevState => ({
        ['name']: '',
        ['address']: '',
      }));
    };
  }, [data]);

  //console.log(menuLists, "menuListsmenuLists");

  return (
    <div className="container">
      <Dialog
        open={open}
        // onClose={handleClose}
        // scroll="body"
        fullScreen={window.innerWidth <= 550 ? true : false}
        fullWidth
        maxWidth={'sm'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        id="show-dialog-on-full"
      >
        <div className={`text-end mt-1 d-flex justify-content-between align-items-center`}>
          <DialogTitle
            sx={{
              paddingY: 0,
            }}
          >
            Edit
          </DialogTitle>

          <IconButton className="back-screen-button me-1 " onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="position-sticky top-0 start-0 d-flex justify-content-between bg-white"></div>

        {isLoading ? (
          <DialogContent
            sx={{
              // paddingY: 0,
              maxHeight: '75vh', // Set a maximum height for the scrollable area
              overflowY: 'auto', // Enable vertical scrolling when content overflows
            }}
          >
            <CircularProgress className={classes.loading} color="primary" />
          </DialogContent>
        ) : (
          <>
            <DialogContent
              sx={{
                // paddingY: 0,
                maxHeight: '75vh', // Set a maximum height for the scrollable area
                overflowY: 'auto', // Enable vertical scrolling when content overflows
              }}
            >
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
                    <TextField
                      id="outlined-basic"
                      label=" Name*"
                      variant="outlined"
                      fullWidth
                      name="name"
                      value={inputs.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
                    <TextField
                      id="outlined-basic"
                      label=" Address*"
                      variant="outlined"
                      fullWidth
                      name="address"
                      value={inputs.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </form>
            </DialogContent>
            <DialogActions>
              <div className="text-end">
                <button type="submit" onClick={e => handleSubmit(e)} className="small-contained-button">
                  Submit
                </button>
              </div>
            </DialogActions>{' '}
          </>
        )}
      </Dialog>
    </div>
  );
}
