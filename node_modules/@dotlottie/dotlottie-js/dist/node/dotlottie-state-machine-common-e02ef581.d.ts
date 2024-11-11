import { ZipOptions } from 'fflate';
import { P as PlayMode } from './manifest-dec4ae91.js';
import * as valibot from 'valibot';
import { Output } from 'valibot';

declare const PlaybackOptionsSchema: valibot.ObjectSchema<Omit<{
    autoplay: valibot.OptionalSchema<valibot.BooleanSchema<boolean>, boolean | undefined>;
    defaultTheme: valibot.OptionalSchema<valibot.StringSchema<string>, string | undefined>;
    direction: valibot.OptionalSchema<valibot.UnionSchema<[valibot.LiteralSchema<1, 1>, valibot.LiteralSchema<-1, -1>], 1 | -1>, 1 | -1 | undefined>;
    hover: valibot.OptionalSchema<valibot.BooleanSchema<boolean>, boolean | undefined>;
    id: valibot.StringSchema<string>;
    intermission: valibot.OptionalSchema<valibot.NumberSchema<number>, number | undefined>;
    loop: valibot.OptionalSchema<valibot.UnionSchema<[valibot.BooleanSchema<boolean>, valibot.NumberSchema<number>], number | boolean>, number | boolean | undefined>;
    playMode: valibot.OptionalSchema<valibot.NativeEnumSchema<typeof PlayMode, PlayMode>, PlayMode | undefined>;
    speed: valibot.OptionalSchema<valibot.NumberSchema<number>, number | undefined>;
    themeColor: valibot.OptionalSchema<valibot.StringSchema<string>, string | undefined>;
}, "id">, {
    autoplay?: boolean | undefined;
    defaultTheme?: string | undefined;
    direction?: 1 | -1 | undefined;
    hover?: boolean | undefined;
    intermission?: number | undefined;
    loop?: number | boolean | undefined;
    playMode?: PlayMode | undefined;
    speed?: number | undefined;
    themeColor?: string | undefined;
}>;
declare type PlaybackOptions = Output<typeof PlaybackOptionsSchema>;
declare const TransitionableSchema: valibot.ObjectSchema<{
    state: valibot.StringSchema<string>;
}, {
    state: string;
}>;
declare type Transitionable = Output<typeof TransitionableSchema>;
declare const StateTransitionOnClickSchema: valibot.ObjectSchema<{
    state: valibot.StringSchema<string>;
}, {
    state: string;
}>;
declare type StateTransitionOnClick = Output<typeof StateTransitionOnClickSchema>;
declare const StateTransitionOnAfterSchema: valibot.ObjectSchema<{
    state: valibot.StringSchema<string>;
} & {
    ms: valibot.NumberSchema<number>;
}, {
    state: string;
    ms: number;
}>;
declare type StateTransitionOnAfter = Output<typeof StateTransitionOnAfterSchema>;
declare const StateTransitionOnEnterSchema: valibot.ObjectSchema<{
    state: valibot.StringSchema<string>;
} & {
    count: valibot.NumberSchema<number>;
}, {
    state: string;
    count: number;
}>;
declare type StateTransitionOnEnter = Output<typeof StateTransitionOnEnterSchema>;
declare const StateTransitionOnMouseEnterSchema: valibot.ObjectSchema<{
    state: valibot.StringSchema<string>;
}, {
    state: string;
}>;
declare type StateTransitionOnMouseEnter = Output<typeof StateTransitionOnMouseEnterSchema>;
declare const StateTransitionOnMouseLeaveSchema: valibot.ObjectSchema<{
    state: valibot.StringSchema<string>;
}, {
    state: string;
}>;
declare type StateTransitionOnMouseLeave = Output<typeof StateTransitionOnMouseLeaveSchema>;
declare const StateTransitionOnCompleteSchema: valibot.ObjectSchema<{
    state: valibot.StringSchema<string>;
}, {
    state: string;
}>;
declare type StateTransitionOnComplete = Output<typeof StateTransitionOnCompleteSchema>;
declare const StateTransitionOnShowSchema: valibot.ObjectSchema<{
    state: valibot.StringSchema<string>;
} & {
    threshold: valibot.OptionalSchema<valibot.ArraySchema<valibot.NumberSchema<number>, number[]>, number[] | undefined>;
}, {
    state: string;
    threshold?: number[] | undefined;
}>;
declare type StateTransitionOnShow = Output<typeof StateTransitionOnShowSchema>;
declare const DotLottieStateTransitionEventsSchema: valibot.ObjectSchema<{
    onAfter: valibot.OptionalSchema<valibot.ObjectSchema<{
        state: valibot.StringSchema<string>;
    } & {
        ms: valibot.NumberSchema<number>;
    }, {
        state: string;
        ms: number;
    }>, {
        state: string;
        ms: number;
    } | undefined>;
    onClick: valibot.OptionalSchema<valibot.ObjectSchema<{
        state: valibot.StringSchema<string>;
    }, {
        state: string;
    }>, {
        state: string;
    } | undefined>;
    onComplete: valibot.OptionalSchema<valibot.ObjectSchema<{
        state: valibot.StringSchema<string>;
    }, {
        state: string;
    }>, {
        state: string;
    } | undefined>;
    onEnter: valibot.OptionalSchema<valibot.ObjectSchema<{
        state: valibot.StringSchema<string>;
    } & {
        count: valibot.NumberSchema<number>;
    }, {
        state: string;
        count: number;
    }>, {
        state: string;
        count: number;
    } | undefined>;
    onMouseEnter: valibot.OptionalSchema<valibot.ObjectSchema<{
        state: valibot.StringSchema<string>;
    }, {
        state: string;
    }>, {
        state: string;
    } | undefined>;
    onMouseLeave: valibot.OptionalSchema<valibot.ObjectSchema<{
        state: valibot.StringSchema<string>;
    }, {
        state: string;
    }>, {
        state: string;
    } | undefined>;
    onShow: valibot.OptionalSchema<valibot.ObjectSchema<{
        state: valibot.StringSchema<string>;
    } & {
        threshold: valibot.OptionalSchema<valibot.ArraySchema<valibot.NumberSchema<number>, number[]>, number[] | undefined>;
    }, {
        state: string;
        threshold?: number[] | undefined;
    }>, {
        state: string;
        threshold?: number[] | undefined;
    } | undefined>;
}, {
    onAfter?: {
        state: string;
        ms: number;
    } | undefined;
    onClick?: {
        state: string;
    } | undefined;
    onComplete?: {
        state: string;
    } | undefined;
    onEnter?: {
        state: string;
        count: number;
    } | undefined;
    onMouseEnter?: {
        state: string;
    } | undefined;
    onMouseLeave?: {
        state: string;
    } | undefined;
    onShow?: {
        state: string;
        threshold?: number[] | undefined;
    } | undefined;
}>;
declare type DotLottieStateTransitionEvents = Output<typeof DotLottieStateTransitionEventsSchema>;
declare const DotLottieStatePlaybackSettingsSchema: valibot.ObjectSchema<{
    autoplay: valibot.OptionalSchema<valibot.BooleanSchema<boolean>, boolean | undefined>;
    defaultTheme: valibot.OptionalSchema<valibot.StringSchema<string>, string | undefined>;
    direction: valibot.OptionalSchema<valibot.UnionSchema<[valibot.LiteralSchema<1, 1>, valibot.LiteralSchema<-1, -1>], 1 | -1>, 1 | -1 | undefined>;
    hover: valibot.OptionalSchema<valibot.BooleanSchema<boolean>, boolean | undefined>;
    intermission: valibot.OptionalSchema<valibot.NumberSchema<number>, number | undefined>;
    loop: valibot.OptionalSchema<valibot.UnionSchema<[valibot.BooleanSchema<boolean>, valibot.NumberSchema<number>], number | boolean>, number | boolean | undefined>;
    playMode: valibot.OptionalSchema<valibot.NativeEnumSchema<typeof PlayMode, PlayMode>, PlayMode | undefined>;
    speed: valibot.OptionalSchema<valibot.NumberSchema<number>, number | undefined>;
    themeColor: valibot.OptionalSchema<valibot.StringSchema<string>, string | undefined>;
} & {
    playOnScroll: valibot.OptionalSchema<valibot.TupleSchema<[valibot.NumberSchema<number>, valibot.NumberSchema<number>], undefined, [number, number]>, [number, number] | undefined>;
    segments: valibot.OptionalSchema<valibot.UnionSchema<[valibot.TupleSchema<[valibot.NumberSchema<number>, valibot.NumberSchema<number>], undefined, [number, number]>, valibot.StringSchema<string>], string | [number, number]>, string | [number, number] | undefined>;
}, {
    autoplay?: boolean | undefined;
    defaultTheme?: string | undefined;
    direction?: 1 | -1 | undefined;
    hover?: boolean | undefined;
    intermission?: number | undefined;
    loop?: number | boolean | undefined;
    playMode?: PlayMode | undefined;
    speed?: number | undefined;
    themeColor?: string | undefined;
    playOnScroll?: [number, number] | undefined;
    segments?: string | [number, number] | undefined;
}>;
declare type DotLottieStatePlaybackSettings = Output<typeof DotLottieStatePlaybackSettingsSchema>;
declare const DotLottieStateSchema: valibot.ObjectSchema<{
    onAfter: valibot.OptionalSchema<valibot.ObjectSchema<{
        state: valibot.StringSchema<string>;
    } & {
        ms: valibot.NumberSchema<number>;
    }, {
        state: string;
        ms: number;
    }>, {
        state: string;
        ms: number;
    } | undefined>;
    onClick: valibot.OptionalSchema<valibot.ObjectSchema<{
        state: valibot.StringSchema<string>;
    }, {
        state: string;
    }>, {
        state: string;
    } | undefined>;
    onComplete: valibot.OptionalSchema<valibot.ObjectSchema<{
        state: valibot.StringSchema<string>;
    }, {
        state: string;
    }>, {
        state: string;
    } | undefined>;
    onEnter: valibot.OptionalSchema<valibot.ObjectSchema<{
        state: valibot.StringSchema<string>;
    } & {
        count: valibot.NumberSchema<number>;
    }, {
        state: string;
        count: number;
    }>, {
        state: string;
        count: number;
    } | undefined>;
    onMouseEnter: valibot.OptionalSchema<valibot.ObjectSchema<{
        state: valibot.StringSchema<string>;
    }, {
        state: string;
    }>, {
        state: string;
    } | undefined>;
    onMouseLeave: valibot.OptionalSchema<valibot.ObjectSchema<{
        state: valibot.StringSchema<string>;
    }, {
        state: string;
    }>, {
        state: string;
    } | undefined>;
    onShow: valibot.OptionalSchema<valibot.ObjectSchema<{
        state: valibot.StringSchema<string>;
    } & {
        threshold: valibot.OptionalSchema<valibot.ArraySchema<valibot.NumberSchema<number>, number[]>, number[] | undefined>;
    }, {
        state: string;
        threshold?: number[] | undefined;
    }>, {
        state: string;
        threshold?: number[] | undefined;
    } | undefined>;
} & {
    animationId: valibot.OptionalSchema<valibot.StringSchema<string>, string | undefined>;
    playbackSettings: valibot.ObjectSchema<{
        autoplay: valibot.OptionalSchema<valibot.BooleanSchema<boolean>, boolean | undefined>;
        defaultTheme: valibot.OptionalSchema<valibot.StringSchema<string>, string | undefined>;
        direction: valibot.OptionalSchema<valibot.UnionSchema<[valibot.LiteralSchema<1, 1>, valibot.LiteralSchema<-1, -1>], 1 | -1>, 1 | -1 | undefined>;
        hover: valibot.OptionalSchema<valibot.BooleanSchema<boolean>, boolean | undefined>;
        intermission: valibot.OptionalSchema<valibot.NumberSchema<number>, number | undefined>;
        loop: valibot.OptionalSchema<valibot.UnionSchema<[valibot.BooleanSchema<boolean>, valibot.NumberSchema<number>], number | boolean>, number | boolean | undefined>;
        playMode: valibot.OptionalSchema<valibot.NativeEnumSchema<typeof PlayMode, PlayMode>, PlayMode | undefined>;
        speed: valibot.OptionalSchema<valibot.NumberSchema<number>, number | undefined>;
        themeColor: valibot.OptionalSchema<valibot.StringSchema<string>, string | undefined>;
    } & {
        playOnScroll: valibot.OptionalSchema<valibot.TupleSchema<[valibot.NumberSchema<number>, valibot.NumberSchema<number>], undefined, [number, number]>, [number, number] | undefined>;
        segments: valibot.OptionalSchema<valibot.UnionSchema<[valibot.TupleSchema<[valibot.NumberSchema<number>, valibot.NumberSchema<number>], undefined, [number, number]>, valibot.StringSchema<string>], string | [number, number]>, string | [number, number] | undefined>;
    }, {
        autoplay?: boolean | undefined;
        defaultTheme?: string | undefined;
        direction?: 1 | -1 | undefined;
        hover?: boolean | undefined;
        intermission?: number | undefined;
        loop?: number | boolean | undefined;
        playMode?: PlayMode | undefined;
        speed?: number | undefined;
        themeColor?: string | undefined;
        playOnScroll?: [number, number] | undefined;
        segments?: string | [number, number] | undefined;
    }>;
}, {
    playbackSettings: {
        autoplay?: boolean | undefined;
        defaultTheme?: string | undefined;
        direction?: 1 | -1 | undefined;
        hover?: boolean | undefined;
        intermission?: number | undefined;
        loop?: number | boolean | undefined;
        playMode?: PlayMode | undefined;
        speed?: number | undefined;
        themeColor?: string | undefined;
        playOnScroll?: [number, number] | undefined;
        segments?: string | [number, number] | undefined;
    };
    animationId?: string | undefined;
    onAfter?: {
        state: string;
        ms: number;
    } | undefined;
    onClick?: {
        state: string;
    } | undefined;
    onComplete?: {
        state: string;
    } | undefined;
    onEnter?: {
        state: string;
        count: number;
    } | undefined;
    onMouseEnter?: {
        state: string;
    } | undefined;
    onMouseLeave?: {
        state: string;
    } | undefined;
    onShow?: {
        state: string;
        threshold?: number[] | undefined;
    } | undefined;
}>;
declare type DotLottieState = Output<typeof DotLottieStateSchema>;
declare const DotLottieStatesSchema: valibot.RecordSchema<valibot.ObjectSchema<{
    onAfter: valibot.OptionalSchema<valibot.ObjectSchema<{
        state: valibot.StringSchema<string>;
    } & {
        ms: valibot.NumberSchema<number>;
    }, {
        state: string;
        ms: number;
    }>, {
        state: string;
        ms: number;
    } | undefined>;
    onClick: valibot.OptionalSchema<valibot.ObjectSchema<{
        state: valibot.StringSchema<string>;
    }, {
        state: string;
    }>, {
        state: string;
    } | undefined>;
    onComplete: valibot.OptionalSchema<valibot.ObjectSchema<{
        state: valibot.StringSchema<string>;
    }, {
        state: string;
    }>, {
        state: string;
    } | undefined>;
    onEnter: valibot.OptionalSchema<valibot.ObjectSchema<{
        state: valibot.StringSchema<string>;
    } & {
        count: valibot.NumberSchema<number>;
    }, {
        state: string;
        count: number;
    }>, {
        state: string;
        count: number;
    } | undefined>;
    onMouseEnter: valibot.OptionalSchema<valibot.ObjectSchema<{
        state: valibot.StringSchema<string>;
    }, {
        state: string;
    }>, {
        state: string;
    } | undefined>;
    onMouseLeave: valibot.OptionalSchema<valibot.ObjectSchema<{
        state: valibot.StringSchema<string>;
    }, {
        state: string;
    }>, {
        state: string;
    } | undefined>;
    onShow: valibot.OptionalSchema<valibot.ObjectSchema<{
        state: valibot.StringSchema<string>;
    } & {
        threshold: valibot.OptionalSchema<valibot.ArraySchema<valibot.NumberSchema<number>, number[]>, number[] | undefined>;
    }, {
        state: string;
        threshold?: number[] | undefined;
    }>, {
        state: string;
        threshold?: number[] | undefined;
    } | undefined>;
} & {
    animationId: valibot.OptionalSchema<valibot.StringSchema<string>, string | undefined>;
    playbackSettings: valibot.ObjectSchema<{
        autoplay: valibot.OptionalSchema<valibot.BooleanSchema<boolean>, boolean | undefined>;
        defaultTheme: valibot.OptionalSchema<valibot.StringSchema<string>, string | undefined>;
        direction: valibot.OptionalSchema<valibot.UnionSchema<[valibot.LiteralSchema<1, 1>, valibot.LiteralSchema<-1, -1>], 1 | -1>, 1 | -1 | undefined>;
        hover: valibot.OptionalSchema<valibot.BooleanSchema<boolean>, boolean | undefined>;
        intermission: valibot.OptionalSchema<valibot.NumberSchema<number>, number | undefined>;
        loop: valibot.OptionalSchema<valibot.UnionSchema<[valibot.BooleanSchema<boolean>, valibot.NumberSchema<number>], number | boolean>, number | boolean | undefined>;
        playMode: valibot.OptionalSchema<valibot.NativeEnumSchema<typeof PlayMode, PlayMode>, PlayMode | undefined>;
        speed: valibot.OptionalSchema<valibot.NumberSchema<number>, number | undefined>;
        themeColor: valibot.OptionalSchema<valibot.StringSchema<string>, string | undefined>;
    } & {
        playOnScroll: valibot.OptionalSchema<valibot.TupleSchema<[valibot.NumberSchema<number>, valibot.NumberSchema<number>], undefined, [number, number]>, [number, number] | undefined>;
        segments: valibot.OptionalSchema<valibot.UnionSchema<[valibot.TupleSchema<[valibot.NumberSchema<number>, valibot.NumberSchema<number>], undefined, [number, number]>, valibot.StringSchema<string>], string | [number, number]>, string | [number, number] | undefined>;
    }, {
        autoplay?: boolean | undefined;
        defaultTheme?: string | undefined;
        direction?: 1 | -1 | undefined;
        hover?: boolean | undefined;
        intermission?: number | undefined;
        loop?: number | boolean | undefined;
        playMode?: PlayMode | undefined;
        speed?: number | undefined;
        themeColor?: string | undefined;
        playOnScroll?: [number, number] | undefined;
        segments?: string | [number, number] | undefined;
    }>;
}, {
    playbackSettings: {
        autoplay?: boolean | undefined;
        defaultTheme?: string | undefined;
        direction?: 1 | -1 | undefined;
        hover?: boolean | undefined;
        intermission?: number | undefined;
        loop?: number | boolean | undefined;
        playMode?: PlayMode | undefined;
        speed?: number | undefined;
        themeColor?: string | undefined;
        playOnScroll?: [number, number] | undefined;
        segments?: string | [number, number] | undefined;
    };
    animationId?: string | undefined;
    onAfter?: {
        state: string;
        ms: number;
    } | undefined;
    onClick?: {
        state: string;
    } | undefined;
    onComplete?: {
        state: string;
    } | undefined;
    onEnter?: {
        state: string;
        count: number;
    } | undefined;
    onMouseEnter?: {
        state: string;
    } | undefined;
    onMouseLeave?: {
        state: string;
    } | undefined;
    onShow?: {
        state: string;
        threshold?: number[] | undefined;
    } | undefined;
}>, valibot.StringSchema<string>, {
    [x: string]: {
        playbackSettings: {
            autoplay?: boolean | undefined;
            defaultTheme?: string | undefined;
            direction?: 1 | -1 | undefined;
            hover?: boolean | undefined;
            intermission?: number | undefined;
            loop?: number | boolean | undefined;
            playMode?: PlayMode | undefined;
            speed?: number | undefined;
            themeColor?: string | undefined;
            playOnScroll?: [number, number] | undefined;
            segments?: string | [number, number] | undefined;
        };
        animationId?: string | undefined;
        onAfter?: {
            state: string;
            ms: number;
        } | undefined;
        onClick?: {
            state: string;
        } | undefined;
        onComplete?: {
            state: string;
        } | undefined;
        onEnter?: {
            state: string;
            count: number;
        } | undefined;
        onMouseEnter?: {
            state: string;
        } | undefined;
        onMouseLeave?: {
            state: string;
        } | undefined;
        onShow?: {
            state: string;
            threshold?: number[] | undefined;
        } | undefined;
    };
}>;
declare type DotLottieStates = Output<typeof DotLottieStatesSchema>;
declare const DotLottieStateMachineDescriptorSchema: valibot.ObjectSchema<{
    id: valibot.StringSchema<string>;
    initial: valibot.StringSchema<string>;
}, {
    id: string;
    initial: string;
}>;
declare type DotLottieStateMachineDescriptor = Output<typeof DotLottieStateMachineDescriptorSchema>;
declare const DotLottieStateMachineSchema: valibot.ObjectSchema<{
    descriptor: valibot.ObjectSchema<{
        id: valibot.StringSchema<string>;
        initial: valibot.StringSchema<string>;
    }, {
        id: string;
        initial: string;
    }>;
    states: valibot.RecordSchema<valibot.ObjectSchema<{
        onAfter: valibot.OptionalSchema<valibot.ObjectSchema<{
            state: valibot.StringSchema<string>;
        } & {
            ms: valibot.NumberSchema<number>;
        }, {
            state: string;
            ms: number;
        }>, {
            state: string;
            ms: number;
        } | undefined>;
        onClick: valibot.OptionalSchema<valibot.ObjectSchema<{
            state: valibot.StringSchema<string>;
        }, {
            state: string;
        }>, {
            state: string;
        } | undefined>;
        onComplete: valibot.OptionalSchema<valibot.ObjectSchema<{
            state: valibot.StringSchema<string>;
        }, {
            state: string;
        }>, {
            state: string;
        } | undefined>;
        onEnter: valibot.OptionalSchema<valibot.ObjectSchema<{
            state: valibot.StringSchema<string>;
        } & {
            count: valibot.NumberSchema<number>;
        }, {
            state: string;
            count: number;
        }>, {
            state: string;
            count: number;
        } | undefined>;
        onMouseEnter: valibot.OptionalSchema<valibot.ObjectSchema<{
            state: valibot.StringSchema<string>;
        }, {
            state: string;
        }>, {
            state: string;
        } | undefined>;
        onMouseLeave: valibot.OptionalSchema<valibot.ObjectSchema<{
            state: valibot.StringSchema<string>;
        }, {
            state: string;
        }>, {
            state: string;
        } | undefined>;
        onShow: valibot.OptionalSchema<valibot.ObjectSchema<{
            state: valibot.StringSchema<string>;
        } & {
            threshold: valibot.OptionalSchema<valibot.ArraySchema<valibot.NumberSchema<number>, number[]>, number[] | undefined>;
        }, {
            state: string;
            threshold?: number[] | undefined;
        }>, {
            state: string;
            threshold?: number[] | undefined;
        } | undefined>;
    } & {
        animationId: valibot.OptionalSchema<valibot.StringSchema<string>, string | undefined>;
        playbackSettings: valibot.ObjectSchema<{
            autoplay: valibot.OptionalSchema<valibot.BooleanSchema<boolean>, boolean | undefined>;
            defaultTheme: valibot.OptionalSchema<valibot.StringSchema<string>, string | undefined>;
            direction: valibot.OptionalSchema<valibot.UnionSchema<[valibot.LiteralSchema<1, 1>, valibot.LiteralSchema<-1, -1>], 1 | -1>, 1 | -1 | undefined>;
            hover: valibot.OptionalSchema<valibot.BooleanSchema<boolean>, boolean | undefined>;
            intermission: valibot.OptionalSchema<valibot.NumberSchema<number>, number | undefined>;
            loop: valibot.OptionalSchema<valibot.UnionSchema<[valibot.BooleanSchema<boolean>, valibot.NumberSchema<number>], number | boolean>, number | boolean | undefined>;
            playMode: valibot.OptionalSchema<valibot.NativeEnumSchema<typeof PlayMode, PlayMode>, PlayMode | undefined>;
            speed: valibot.OptionalSchema<valibot.NumberSchema<number>, number | undefined>;
            themeColor: valibot.OptionalSchema<valibot.StringSchema<string>, string | undefined>;
        } & {
            playOnScroll: valibot.OptionalSchema<valibot.TupleSchema<[valibot.NumberSchema<number>, valibot.NumberSchema<number>], undefined, [number, number]>, [number, number] | undefined>;
            segments: valibot.OptionalSchema<valibot.UnionSchema<[valibot.TupleSchema<[valibot.NumberSchema<number>, valibot.NumberSchema<number>], undefined, [number, number]>, valibot.StringSchema<string>], string | [number, number]>, string | [number, number] | undefined>;
        }, {
            autoplay?: boolean | undefined;
            defaultTheme?: string | undefined;
            direction?: 1 | -1 | undefined;
            hover?: boolean | undefined;
            intermission?: number | undefined;
            loop?: number | boolean | undefined;
            playMode?: PlayMode | undefined;
            speed?: number | undefined;
            themeColor?: string | undefined;
            playOnScroll?: [number, number] | undefined;
            segments?: string | [number, number] | undefined;
        }>;
    }, {
        playbackSettings: {
            autoplay?: boolean | undefined;
            defaultTheme?: string | undefined;
            direction?: 1 | -1 | undefined;
            hover?: boolean | undefined;
            intermission?: number | undefined;
            loop?: number | boolean | undefined;
            playMode?: PlayMode | undefined;
            speed?: number | undefined;
            themeColor?: string | undefined;
            playOnScroll?: [number, number] | undefined;
            segments?: string | [number, number] | undefined;
        };
        animationId?: string | undefined;
        onAfter?: {
            state: string;
            ms: number;
        } | undefined;
        onClick?: {
            state: string;
        } | undefined;
        onComplete?: {
            state: string;
        } | undefined;
        onEnter?: {
            state: string;
            count: number;
        } | undefined;
        onMouseEnter?: {
            state: string;
        } | undefined;
        onMouseLeave?: {
            state: string;
        } | undefined;
        onShow?: {
            state: string;
            threshold?: number[] | undefined;
        } | undefined;
    }>, valibot.StringSchema<string>, {
        [x: string]: {
            playbackSettings: {
                autoplay?: boolean | undefined;
                defaultTheme?: string | undefined;
                direction?: 1 | -1 | undefined;
                hover?: boolean | undefined;
                intermission?: number | undefined;
                loop?: number | boolean | undefined;
                playMode?: PlayMode | undefined;
                speed?: number | undefined;
                themeColor?: string | undefined;
                playOnScroll?: [number, number] | undefined;
                segments?: string | [number, number] | undefined;
            };
            animationId?: string | undefined;
            onAfter?: {
                state: string;
                ms: number;
            } | undefined;
            onClick?: {
                state: string;
            } | undefined;
            onComplete?: {
                state: string;
            } | undefined;
            onEnter?: {
                state: string;
                count: number;
            } | undefined;
            onMouseEnter?: {
                state: string;
            } | undefined;
            onMouseLeave?: {
                state: string;
            } | undefined;
            onShow?: {
                state: string;
                threshold?: number[] | undefined;
            } | undefined;
        };
    }>;
}, {
    states: {
        [x: string]: {
            playbackSettings: {
                autoplay?: boolean | undefined;
                defaultTheme?: string | undefined;
                direction?: 1 | -1 | undefined;
                hover?: boolean | undefined;
                intermission?: number | undefined;
                loop?: number | boolean | undefined;
                playMode?: PlayMode | undefined;
                speed?: number | undefined;
                themeColor?: string | undefined;
                playOnScroll?: [number, number] | undefined;
                segments?: string | [number, number] | undefined;
            };
            animationId?: string | undefined;
            onAfter?: {
                state: string;
                ms: number;
            } | undefined;
            onClick?: {
                state: string;
            } | undefined;
            onComplete?: {
                state: string;
            } | undefined;
            onEnter?: {
                state: string;
                count: number;
            } | undefined;
            onMouseEnter?: {
                state: string;
            } | undefined;
            onMouseLeave?: {
                state: string;
            } | undefined;
            onShow?: {
                state: string;
                threshold?: number[] | undefined;
            } | undefined;
        };
    };
    descriptor: {
        id: string;
        initial: string;
    };
}>;
declare type DotLottieStateMachine = Output<typeof DotLottieStateMachineSchema>;

/**
 * Copyright 2023 Design Barn Inc.
 */

interface DotLottieStateMachineCommonOptions {
    descriptor: DotLottieStateMachineDescriptor;
    states: DotLottieStates;
    zipOptions?: ZipOptions;
}
declare class DotLottieStateMachineCommon {
    protected _descriptor: DotLottieStateMachineDescriptor;
    protected _zipOptions: ZipOptions;
    protected _states: DotLottieStates;
    constructor(options: DotLottieStateMachineCommonOptions);
    get zipOptions(): ZipOptions;
    set zipOptions(zipOptions: ZipOptions);
    get id(): string;
    set id(id: string);
    get states(): DotLottieStates;
    set states(states: DotLottieStates);
    get initial(): string;
    set initial(initial: string);
    get descriptor(): DotLottieStateMachineDescriptor;
    set descriptor(descriptor: DotLottieStateMachineDescriptor);
    toString(): string;
    protected _requireValidId(id: string | undefined): void;
    protected _requireValidDescriptor(descriptor: DotLottieStateMachineDescriptor): void;
    protected _requireValidStates(states: DotLottieStates): void;
}

export { DotLottieStateMachineSchema as A, DotLottieStateMachine as B, DotLottieStateMachineCommon as D, PlaybackOptionsSchema as P, StateTransitionOnClickSchema as S, TransitionableSchema as T, DotLottieStateMachineCommonOptions as a, PlaybackOptions as b, Transitionable as c, StateTransitionOnClick as d, StateTransitionOnAfterSchema as e, StateTransitionOnAfter as f, StateTransitionOnEnterSchema as g, StateTransitionOnEnter as h, StateTransitionOnMouseEnterSchema as i, StateTransitionOnMouseEnter as j, StateTransitionOnMouseLeaveSchema as k, StateTransitionOnMouseLeave as l, StateTransitionOnCompleteSchema as m, StateTransitionOnComplete as n, StateTransitionOnShowSchema as o, StateTransitionOnShow as p, DotLottieStateTransitionEventsSchema as q, DotLottieStateTransitionEvents as r, DotLottieStatePlaybackSettingsSchema as s, DotLottieStatePlaybackSettings as t, DotLottieStateSchema as u, DotLottieState as v, DotLottieStatesSchema as w, DotLottieStates as x, DotLottieStateMachineDescriptorSchema as y, DotLottieStateMachineDescriptor as z };
