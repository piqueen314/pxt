/// <reference path="../../built/pxtlib.d.ts" />

import * as React from "react";
import * as data from "./data";

interface HintTooltipState {
    show?: boolean;
}

interface HintTooltipProps {
    text: string;
    onClick: any;
    pokeUser?: boolean;
    animationDuration?: number;
}

export class HintTooltip extends data.Component<HintTooltipProps, HintTooltipState> {
    constructor(props: HintTooltipProps) {
        super(props);
    }

    componentWillReceiveProps(nextProps: HintTooltipProps) {
        if (nextProps.pokeUser != this.state.show) {
            this.setState({ show: nextProps.pokeUser });
        }
    }

    renderCore() {
        // Animation should be attached to 'show' class
        return <div className={`tooltip ${this.state.show ? 'show' : ''}`}
                    role="tooltip"
                    onClick={this.props.onClick}>
                        {this.props.text}
                </div>;
    }
}

export class HintManager {
    private timer: number;
    private defaultDuration: number = 30000;
    private hints: { [key: string]: any } = {};

    public addHint(id: string, callback: any, duration?: number) {
        this.hints[id] = pxt.Util.debounce(() => {
            callback();
            this.stopPokeUserActivity();
        }, duration || this.defaultDuration);
    }

    // starts a timer, overwriting current timer
    public pokeUserActivity(id: string) {
        this.stopPokeUserActivity();
        this.timer = this.hints[id]();
    }

    // stops current user hint timer
    public stopPokeUserActivity() {
        clearTimeout(this.timer);
        this.timer = null;
    }
}