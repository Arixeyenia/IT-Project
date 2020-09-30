import React from 'react';
import { Typography, Grid, Button, CardMedia, Card, CardContent, CardHeader, IconButton, CardActions } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';


export default function card(classes, rowLengths, portfolioID, object, history, handleDrawerOpen, handleDialogOpen, addItemWrapper){
    return (
      <Grid item xs={12/rowLengths[object.row]} key={object._id}>
      <Card className={classes.cardRoot} variant="outlined">
        {object.mediaType === "image" && <CardMedia
            className={classes.media}
            image={object.mediaLink}
          />}
         <CardHeader
          classes={{title:classes.titleText, action:classes.unflex}}
          title={object.title}
          action={
            <div>
            <IconButton aria-label="edit" onClick={() => handleDrawerOpen(object._id)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => handleDialogOpen(object._id)}>
            <DeleteIcon />
          </IconButton>
          </div>
          }
        />
        <CardContent>
          <Typography className={classes.pos} color="textSecondary">
              {object.subtitle}
          </Typography>
          <Typography variant="body2" component="p">
            {object.paragraph}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={()=> {if(!/^(f|ht)tps?:\/\//i.test(object.linkAddress)){ history.push('/view/' + portfolioID + '/' + object.linkAddress);}else{ window.location.href = object.linkAddress;}window.location.reload(false);}}>{object.linkText}</Button>
        </CardActions>
      </Card>
      {(rowLengths[object.row]===object.column+1) ?
      <div className={classes.wrapper}> 
      <IconButton
        color="primary"
        onClick = {() => addItemWrapper(object.row, object.column+1)}
        className={classes.addCol}        
        children={<AddCircleOutlineIcon classes={{root:classes.addIcon}}/>}
        >
        </IconButton></div> : <div/>}
      </Grid>
    )
  }