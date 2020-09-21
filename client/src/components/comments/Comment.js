import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import Faker from 'faker'; // Making random avatar appear for now
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ChatIcon from '@material-ui/icons/Chat';
import Helpers from './helpers/Helpers';
import {getComments} from '../../actions/eportfolio';

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

const Comment = ({ getComments, comments, itemID }) => {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  useEffect(() => {
    if (comments === null){
      getComments(itemID);
    }
  }, [getComments, comments, itemID]);
  console.log(comments);

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
              {(comments !== null) ? comments.map((comment) => {
                return (
                  <React.Fragment key={comment.id}>
                    <ListItem key={comment.id} alignItems='flex-start'>
                      <ListItemAvatar>
                        <Avatar alt='avatar' src={Faker.image.avatar()} />
                        {/* Will need to add avatars later on */}
                      </ListItemAvatar>

                      <ListItemText
                        primary={<Typography>{comment.name}</Typography>}
                        secondary={comment.body}
                      />
                      <IconButton edge='end' aria-label='delete'>
                        <MoreVertIcon />
                        {/* 
                        A pop up to delete or edit comments
                        Icon sould only be visible if viewer is commenter
                        or owner of item. Owner should only be able to
                        delete commenter can delete or edit.
                        make appropriate api calls for edit/delete
                         */}
                      </IconButton>
                    </ListItem>
                    <Divider Light />
                  </React.Fragment>
                );
              }) : <div/>}
            </List>
          </Card>
          <form className={classes.form} noValidate autoComplete='off'>
            {/* 
              When button is pushed
              Get contents of text field
              make a post request to api/comments
              need to figure out how to use x-auth-token with redux
              if no x-auth, prompt login
            */}
            <TextField
              ref='inputComment'
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

Comment.propTypes = {
  getComments: PropTypes.func.isRequired,
  comments: PropTypes.array
};


const mapStateToProps = (state, props) => ({
  comments: state.eportfolio.comments,
  itemID : props.itemID
});

export default connect(mapStateToProps, { getComments })(Comment);
