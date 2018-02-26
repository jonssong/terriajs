'use strict';
const React = require('react');
const createReactClass = require('create-react-class');
const PropTypes = require('prop-types');
import ObserveModelMixin from '../../ObserveModelMixin';
import triggerResize from '../../../Core/triggerResize';
import Styles from './full_screen_button.scss';
import classNames from "classnames";
// import Icon from "../../Icon.jsx";

// The button to make the map full screen and hide the workbench.
const FullScreenButton = createReactClass({
    displayName: 'FullScreenButton',
    mixins: [ObserveModelMixin],

    propTypes: {
        terria: PropTypes.object,
        viewState: PropTypes.object.isRequired,
        animationDuration: PropTypes.number // Defaults to 1 millisecond.
    },

    getInitialState() {
        return {
            isActive: false
        };
    },

    toggleFullScreen() {
        this.props.viewState.isMapFullScreen = !this.props.viewState.isMapFullScreen;

        this.props.terria.currentViewer.notifyRepaintRequired();

        // Allow any animations to finish, then trigger a resize.
        setTimeout(function() {
            triggerResize();
        }, this.props.animationDuration || 1);
    },

    renderButtonText() {
        if (this.props.viewState.isMapFullScreen) {
            // return <span className={Styles.exit}>Layers</span>;
            return <img src='build/TerriaJS/images/layers.png'/>;
            
        } else {
            // return <Icon glyph={Icon.GLYPHS.expand}/>;
            return <img src='build/TerriaJS/images/collapse.png'/>;
        }
    },

    renderLayerText() {
        if (this.props.viewState.isMapFullScreen) {
            return <span className={Styles.layersTitleHidden}></span>;
        } else {
            return <span className={Styles.layersTitleShowing}>Layers</span>;
        }
    },

    render() {
        const btnClassName = classNames(Styles.btn, {[Styles.isActive]: this.props.viewState.isMapFullScreen});
        const btnTitle = this.props.viewState.isMapFullScreen? "Show Layer Control": "Hide Layer Control";
        return (
            <div className={[Styles.fullScreen, "layersDivGJO-class"].join(' ')}>
                <button type='button' onClick={this.toggleFullScreen} title={btnTitle}
                        className={btnClassName}><span>{this.renderButtonText()}</span></button>
                {this.renderLayerText()}
            </div>
        );
    },
});
module.exports = FullScreenButton;
