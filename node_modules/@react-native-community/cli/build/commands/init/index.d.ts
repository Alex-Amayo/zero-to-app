declare const _default: {
    func: ([projectName]: string[], options: {
        template?: string | undefined;
        npm?: boolean | undefined;
        pm?: "yarn" | "npm" | "bun" | undefined;
        directory?: string | undefined;
        displayName?: string | undefined;
        title?: string | undefined;
        skipInstall?: boolean | undefined;
        version?: string | undefined;
        packageName?: string | undefined;
        installPods?: string | boolean | undefined;
        platformName?: string | undefined;
        skipGitInit?: boolean | undefined;
        replaceDirectory?: string | boolean | undefined;
        yarnConfigOptions?: Record<string, string> | undefined;
    }) => Promise<void>;
    detached: boolean;
    name: string;
    description: string;
    options: ({
        name: string;
        description: string;
        parse?: undefined;
    } | {
        name: string;
        description: string;
        parse: (val: string) => Record<string, string>;
    })[];
};
export default _default;
//# sourceMappingURL=index.d.ts.map