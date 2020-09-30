import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    portfolioList: {
      display: 'flex',
      padding: '5px !important',
    },
    portfolioCardHeader: {
      padding: '0px',
      marginBottom: '-40px',
    },
    cardHeaderAction: {
      textAlign: 'right',
    },
    buttomBaseRoot: {
      backgroundColor: '#333333',
      opacity: '66%',
    },
    portfolioListItem: {
      width: '30% !important',
    },
    portfolioCard: {
      boxShadow: 'initial',
    },
    portfolioCardMenu: {
      width: '20%',
    },
    menuPaperRoot: {
      width: '100%',
    },
    addPortfolio: {
      padding: '18%',
    },
    addPortfolioIcon: {
      display: 'table !important',
      margin: 'auto !important',
    },
    cardThumbnail: {
      width: '100%',
      marginBottom: '-20%',
    },
    cardMediaRoot: {
      height: '10px',
      padding: '100%',
    },
    overlayPortfolioItem: {
      opacity: '66%',
      textAlign: 'right',
      backgroundColor: '#333333',
      borderBottomLeftRadius: 'inherit',
      borderBottomRightRadius: 'inherit',
      padding: '0 !important',
    },
    copyLinkPaperRoot: {
      width: '40%',
      padding: '50px 20px',
      margin: 'auto',
      position: 'absolute',
      top: '35% !important',
      left: '32% !important',
    },
    popoverContents: {
      display: 'block',
      margin: 'auto',
      marginTop: '20px',
    },
    textarea: {
      width: '85% !important',
    },
    category: {
      display: 'inline-table',
    },
    categoryTypography: {
      display: 'table-cell',
    },
    categoryDiv: {
      display: 'table-cell',
      width: '100%',
    },
    categoryLine: {
      marginBottom: '5px',
    }
  }));

  export default useStyles;