import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {Grid, Image, Container, Segment, Label} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
/**
 * Simple component that renders thumbnail url
 * @param {string} screenShot
 */
const ThumbnailImage = ({ screenShot, target, url }) => {
    return (
        <Grid.Column mobile={15} tablet={8} computer={5}>
        <Segment raised>
        <Label
         as={Link}
         to={{ pathname: target, state:{video:url} }} 
         color='red' 
         ribbon='right'
        >
          View
        </Label>
        <Container>      
            <Image
            fluid
            src={screenShot}
            alt="video thumbnail"
               />
        </Container>
        </Segment>
        </Grid.Column>
    );
}

export default class Thumbnail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dataLoaded: false,     
            metadataLoaded: false,  
            seeked: false,          
            screenShot: false,      
            suspended: false,      
            target:props.target,
            cors: props.cors,                           
            width: props.width,                         
            height: props.height,                       
            renderThumbnail: props.renderThumbnail,     
            screenshotAtTime: props.screenshotAtTime,       
            thumbnailHandler: props.thumbnailHandler,   
            videoUrl: props.videoUrl,                   
        }
    }

    render() {
        const { renderThumbnail, screenShot, videoUrl, target } = this.state;
        if (!screenShot) {
            return (
                <div className="thumbnail-generator" >
                    <canvas className="screenshot-generator" ref="canvas" ></canvas>
                    <video muted
                        className="screenshot-generator"
                        ref="videoEl"
                        src={videoUrl}
                        onLoadedMetadata={() => this.setState({ metadataLoaded: true })}
                        onLoadedData={() => this.setState({ dataLoaded: true })}
                        onSuspend={() => this.setState({ suspended: true })}
                        onSeeked={() => this.setState({ seeked: true })}
                    >
                    </video>
                </div>
            )
        } else {
            if (renderThumbnail) {
                return <ThumbnailImage screenShot={screenShot} target={target} url={videoUrl} />;
            } else {
                return null;
            }
        }
    }

    /**
    * Update any props that may have changed
    */
    componentWillReceiveProps(nextProps) {
        let stateChanged = false;
        const data = {};
        for (let prop in nextProps) {
            if (nextProps[prop] !== this.props[prop]) {
                data[prop] = nextProps[prop];
                if (!stateChanged) {
                    stateChanged = true;
                }
            }
        }
        if (stateChanged) {
            this.setState(data);
        }
    }

    componentDidMount() {
        if (!this.state.cors) this.refs.videoEl.setAttribute('crossOrigin', 'Anonymous');
        // console.log('mount state: ', this.state)
    }

    /**
     * (fires every time setState() gets called)
     */
    componentDidUpdate(prevProps, prevState) {
        if (!this.state.screenShot) {
            const { metadataLoaded, dataLoaded, suspended, seeked, screenShot, screenshotAtTime } = this.state;

            // check if all 3 required events fired
            if (metadataLoaded && dataLoaded && suspended) {
                if (!this.refs.videoEl.currentTime || this.refs.videoEl.currentTime < this.state.screenshotAtTime) {
                    this.refs.videoEl.currentTime = screenshotAtTime;
                }

                if (seeked && !screenShot) {
                    // attempt to generate thumbnail
                    this.getscreenShot();
                }
            }
        }
    }

    /**
     * Create a canvas and video element to "draw" the
     * image, then convert it to a data url
     */
    getscreenShot = () => {
        try {
            const { width, height } = this.props;
            const video = this.refs.videoEl;
            const canvas = this.refs.canvas;
            canvas.height = video.videoHeight;
            canvas.width = video.videoWidth;

            // resize thumbnail or no ?
            if (!width || !height) {
                canvas.getContext('2d').drawImage(video, 0, 0);
            } else {
                canvas.getContext('2d').drawImage(video, 0, 0, width, height);
            }

            const thumbnail = canvas.toDataURL('image/png');

            // Remove video & canvas elements (no longer needed)
            video.src = "";  // setting to empty string stops video from loading
            video.remove();
            canvas.remove();

            this.setState({
                screenShot: thumbnail
            })

            // pass the thumbnail url back to parent component's thumbnail handler (if any)
            if (this.state.thumbnailHandler) {
                this.state.thumbnailHandler(thumbnail);
            }

        } catch (e) {
            console.error(e);
        }
    }
}

/**
 * Property Types
 */
Thumbnail.propTypes = {
    cors: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    renderThumbnail: PropTypes.bool,
    screenshotAtTime: PropTypes.number,
    thumbnailHandler: PropTypes.func,
    videoUrl: PropTypes.string.isRequired,
}

/**
 * Default Properties
 */
Thumbnail.defaultProps = {
    cors: false,
    renderThumbnail: true,
    screenshotAtTime: 2,
}