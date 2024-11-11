import * as valibot from 'valibot';
import { Output } from 'valibot';

declare enum PlayMode {
    Bounce = "bounce",
    Normal = "normal"
}
declare const PlayModeSchema: valibot.NativeEnumSchema<typeof PlayMode, PlayMode>;
declare const ManifestAnimationSchema: valibot.ObjectSchema<{
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
}, {
    id: string;
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
declare type ManifestAnimation = Output<typeof ManifestAnimationSchema>;
declare const ManifestThemeSchema: valibot.ObjectSchema<{
    animations: valibot.ArraySchema<valibot.StringSchema<string>, string[]>;
    id: valibot.StringSchema<string>;
}, {
    id: string;
    animations: string[];
}>;
declare type ManifestTheme = Output<typeof ManifestThemeSchema>;
declare const ManifestSchema: valibot.ObjectSchema<{
    activeAnimationId: valibot.OptionalSchema<valibot.StringSchema<string>, string | undefined>;
    animations: valibot.ArraySchema<valibot.ObjectSchema<{
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
    }, {
        id: string;
        autoplay?: boolean | undefined;
        defaultTheme?: string | undefined;
        direction?: 1 | -1 | undefined;
        hover?: boolean | undefined;
        intermission?: number | undefined;
        loop?: number | boolean | undefined;
        playMode?: PlayMode | undefined;
        speed?: number | undefined;
        themeColor?: string | undefined;
    }>, {
        id: string;
        autoplay?: boolean | undefined;
        defaultTheme?: string | undefined;
        direction?: 1 | -1 | undefined;
        hover?: boolean | undefined;
        intermission?: number | undefined;
        loop?: number | boolean | undefined;
        playMode?: PlayMode | undefined;
        speed?: number | undefined;
        themeColor?: string | undefined;
    }[]>;
    author: valibot.OptionalSchema<valibot.StringSchema<string>, string | undefined>;
    custom: valibot.OptionalSchema<valibot.RecordSchema<valibot.AnySchema<any>, valibot.StringSchema<string>, {
        [x: string]: any;
    }>, {
        [x: string]: any;
    } | undefined>;
    description: valibot.OptionalSchema<valibot.StringSchema<string>, string | undefined>;
    generator: valibot.OptionalSchema<valibot.StringSchema<string>, string | undefined>;
    keywords: valibot.OptionalSchema<valibot.StringSchema<string>, string | undefined>;
    revision: valibot.OptionalSchema<valibot.NumberSchema<number>, number | undefined>;
    themes: valibot.OptionalSchema<valibot.ArraySchema<valibot.ObjectSchema<{
        animations: valibot.ArraySchema<valibot.StringSchema<string>, string[]>;
        id: valibot.StringSchema<string>;
    }, {
        id: string;
        animations: string[];
    }>, {
        id: string;
        animations: string[];
    }[]>, {
        id: string;
        animations: string[];
    }[] | undefined>;
    states: valibot.OptionalSchema<valibot.ArraySchema<valibot.StringSchema<string>, string[]>, string[] | undefined>;
    version: valibot.OptionalSchema<valibot.StringSchema<string>, string | undefined>;
}, {
    animations: {
        id: string;
        autoplay?: boolean | undefined;
        defaultTheme?: string | undefined;
        direction?: 1 | -1 | undefined;
        hover?: boolean | undefined;
        intermission?: number | undefined;
        loop?: number | boolean | undefined;
        playMode?: PlayMode | undefined;
        speed?: number | undefined;
        themeColor?: string | undefined;
    }[];
    generator?: string | undefined;
    activeAnimationId?: string | undefined;
    author?: string | undefined;
    custom?: {
        [x: string]: any;
    } | undefined;
    description?: string | undefined;
    keywords?: string | undefined;
    revision?: number | undefined;
    themes?: {
        id: string;
        animations: string[];
    }[] | undefined;
    states?: string[] | undefined;
    version?: string | undefined;
}>;
declare type Manifest = Output<typeof ManifestSchema>;

export { Manifest as M, PlayMode as P, ManifestAnimation as a, PlayModeSchema as b, ManifestAnimationSchema as c, ManifestThemeSchema as d, ManifestTheme as e, ManifestSchema as f };
