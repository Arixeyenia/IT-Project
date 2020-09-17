import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Card,
  IconButton,
  TextField,
} from '@material-ui/core';
import Faker from 'faker';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ChatIcon from '@material-ui/icons/Chat';
import Helpers from './helpers/Helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    maxWidth: '60ch',
  },
  card: {
    maxHeight: 200,
    overflow: 'auto',
    maxWidth: '65ch',
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: 400,
    },
  },
  button: {
    position: 'absolute',
    right: '10px',
  },
}));

const Comment = ({ comments }) => {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <Helpers.Button
        variant='outlined'
        startIcon={<ChatIcon />}
        className={classes.button}
        onClick={() => {
          setOpenPopup(true);
        }}
      />
      <Helpers.Popup
        title='Comments'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <Card className={classes.root}>
          <Card className={classes.card}>
            <List className={classes.root}>
              {comments.map((comment) => {
                console.log('Comment', comment);
                return (
                  <React.Fragment key={comment.id}>
                    <ListItem key={comment.id} alignItems='flex-start'>
                      <ListItemAvatar>
                        <Avatar alt='avatar' src={Faker.image.avatar()} />
                      </ListItemAvatar>

                      <ListItemText
                        primary={<Typography>{comment.name}</Typography>}
                        secondary={comment.body}
                      />
                      <IconButton edge='end' aria-label='delete'>
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                    <Divider Light />
                  </React.Fragment>
                );
              })}
            </List>
          </Card>
          <form className={classes.form} noValidate autoComplete='off'>
            <TextField
              id='outlined-basic'
              variant='outlined'
              width='100%'
              InputProps={{
                endAdornment: (
                  <IconButton edge='end' aria-label='submit'>
                    <ArrowUpwardIcon />
                  </IconButton>
                ),
              }}
            />
          </form>
        </Card>
      </Helpers.Popup>
    </>
  );
};

export default Comment;
