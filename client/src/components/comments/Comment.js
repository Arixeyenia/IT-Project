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
import {
  getComments,
  postComment,
  deleteComment,
  editComment,
} from '../../actions/eportfolio';

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

const Comment = ({
  getComments,
  postComment,
  deleteComment,
  editComment,
  comments,
  itemID,
}) => {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [textValue, setValue] = useState('');
  useEffect(() => {
    if (!Object.keys(comments).includes(itemID)) {
      getComments(itemID);
    }
  }, [getComments, comments, itemID]);
  console.log(comments[itemID]);

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
              {Object.keys(comments).includes(itemID) ? (
                comments[itemID].map((comment) => {
                  return (
                    <React.Fragment key={comment.id}>
                      <ListItem key={comment.id} alignItems='flex-start'>
                        <ListItemAvatar>
                          <Avatar alt='avatar' src={Faker.image.avatar()} />
                          {/* Will need to add avatars later on */}
                        </ListItemAvatar>

                        <ListItemText
                          primary={<Typography>{comment.name}</Typography>}
                          secondary={comment.text}
                        />
                        <IconButton edge='end' aria-label='more'>
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
                      <Divider light />
                    </React.Fragment>
                  );
                })
              ) : (
                <div />
              )}
            </List>
          </Card>
          <form className={classes.form} noValidate autoComplete='off'>
            <TextField
              value={textValue}
              id='outlined-basic'
              variant='outlined'
              width='100%'
              onChange={(e) => setValue(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    edge='end'
                    aria-label='submit'
                    onClick={() => {
                      postComment(itemID, textValue);
                      // reset the text field
                      // update the comment box so new comment is shown
                    }}
                  >
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
  comments: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => ({
  comments: state.eportfolio.comments,
  itemID: props.itemID,
});

export default connect(mapStateToProps, {
  getComments,
  postComment,
  deleteComment,
  editComment,
})(Comment);
