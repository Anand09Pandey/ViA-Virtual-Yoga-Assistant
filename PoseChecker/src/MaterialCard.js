import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
    maxWidth: 300,
    margin: 20,
      boxShadow: "5px 8px 10px rgb(166, 166, 167)",
        // marginTop: 20,
        // marginBottom: 20,
        raised: true,
  },
});

export default function ImgMediaCard(props) {
  const classes = useStyles();
  const images = require.context('./images', true);
  let yoga = images(`./${props.src}`);
    // const img = require.context('assets/img', true);

  // document.getElementById('practice').onclick((props) => {
  //   <Link to={`./${props.}`}
  // });

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          src={yoga}
          alt="Yoga Image not found !"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.disc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/App/${props.name}/${props.prt}`}>
          <Button style={{backgroundColor: "rgb(166, 166, 167)", color: "black", boxShadow: "2px 2px 4px black"}} id="practice" href="#" size="small" color="primary">
            Practice
          </Button>
        </Link>
        <Button href={props.link} target="_blank" size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}