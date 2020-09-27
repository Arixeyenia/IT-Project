import React, {Fragment, Component } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import InstagramIcon from '@material-ui/icons/Instagram'
import FacebookIcon from '@material-ui/icons/Facebook'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import TwitterIcon from '@material-ui/icons/Twitter'

class portfolioTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ElementStyle: {
                width: '0px'
            },
            showManagePages: false,
            showSettings: false,
            showSocialMedia: false,
            instagram: '//',
            twitter: '//',
            facebook: '//',
            linkedin: '//'
        };
    }

    openSidebar() {
        this.setState({
            ElementStyle: {
                ...this.state.ElementStyle,
                width: '300px'
            }
        });
    }
      
    closeSidebar() {
        this.setState({
            ElementStyle: {
                ...this.state.ElementStyle,
                width: '0px'
            },
            showManagePages: false,
            showSettings: false,
            showSocialMedia: false
        });
    }

    toggleManagePages() {
        if (this.state.showManagePages == true) {
            this.setState({
                showManagePages: false
            });
        } else {
            this.setState({
                showManagePages: true
            });
        }
    }

    toggleSocialMedia() {
        if (this.state.showSocialMedia == true) {
            this.setState({
                showSocialMedia: false
            });
        } else {
            this.setState({
                showSocialMedia: true
            });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            instagram: '//'.concat(event.target.instagram.value),
            twitter: '//'.concat(event.target.twitter.value),
            facebook: '//'.concat(event.target.facebook.value),
            linkedin: '//'.concat(event.target.linkedin.value)
        });
    }

    socialLink(name) {
        switch(name) {
            case "Facebook":
                window.open(this.state.facebook);
                break;
            case "Twitter":
                window.open(this.state.twitter);
                break;
            case "Instagram":
                window.open(this.state.instagram);
                break;
            case "LinkedIn":
                window.open(this.state.linkedin);
                break;
        }
    }

    render() {
        return (
        <Fragment>
            <Box id="Sidebar" class="sidebar" style={this.state.ElementStyle}>
                <a href="#" class="closebtn" onClick={this.closeSidebar.bind(this)}>&times;</a>
                <h1 onClick={this.toggleManagePages.bind(this)}>Manage Pages</h1>
                <div style={{display: this.state.showManagePages ? 'block' : 'none' }}>
                    <a href="#">Page 1</a>
                    <a href="#">Page 2</a>
                    <a href="#">Page 3</a>
                    <a href="#">Page 4</a>

                    <form onsubmit>
                        <input type="text" id="pagename" name="pagename" placeholder="Enter page name"></input>
                        <input type="submit" value="+ Add page"></input>
                    </form>
                </div>
                <h1>Settings</h1>
                <h1 onClick={this.toggleSocialMedia.bind(this)}>Social Media</h1>
                <div style={{display: this.state.showSocialMedia ? 'block' : 'none' }}>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" id="instagram" name="pagename" placeholder="Instagram"></input>
                        <input type="text" id="facebook" name="pagename" placeholder="Facebook"></input>
                        <input type="text" id="twitter" name="pagename" placeholder="Twitter"></input>
                        <input type="text" id="linkedin" name="pagename" placeholder="LinkedIn"></input>
                        <input type="submit" value="Save"></input>
                    </form>
                </div>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Typography variant='h1'>My Portfolio</Typography>
                <Button class="openbtn" onClick={this.openSidebar.bind(this)}>&#9776; Edit Portfolio</Button>
            </Box>

            <div class="sociallinks">
                <Button onClick={() => this.socialLink('Facebook')} class="socialMedia" style={{display: this.state.facebook=='//' ? 'none' : 'block', backgroundColor:"#4267B2"}}><FacebookIcon/></Button>
                <Button onClick={() => this.socialLink('Instagram')} class="socialMedia" style={{display: this.state.instagram=='//' ? 'none' : 'block', backgroundColor:"#DD2A7B"}}><InstagramIcon/></Button>
                <Button onClick={() => this.socialLink('Twitter')} class="socialMedia" style={{display: this.state.twitter=='//' ? 'none' : 'block', backgroundColor:"#1DA1F2"}}><TwitterIcon/></Button>
                <Button onClick={() => this.socialLink('LinkedIn')} class="socialMedia" style={{display: this.state.linkedin=='//' ? 'none' : 'block', backgroundColor:"#2867B2"}}><LinkedInIcon/></Button>
            </div>
        </Fragment>
        );
    }
}

export default portfolioTemplate;
