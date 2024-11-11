"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openssl = openssl;
exports.run = run;
exports.sudoAppend = sudoAppend;
exports.waitForUser = waitForUser;
exports.reportableError = reportableError;
exports.mktmp = mktmp;
exports.sudo = sudo;
const tslib_1 = require("tslib");
const child_process_1 = require("child_process");
const tmp_1 = tslib_1.__importDefault(require("tmp"));
const debug_1 = tslib_1.__importDefault(require("debug"));
const path_1 = tslib_1.__importDefault(require("path"));
const sudo_prompt_1 = tslib_1.__importDefault(require("sudo-prompt"));
const constants_1 = require("./constants");
const debug = (0, debug_1.default)('devcert:util');
function openssl(args) {
    return run('openssl', args, {
        stdio: 'pipe',
        env: Object.assign({
            RANDFILE: path_1.default.join((0, constants_1.configPath)('.rnd'))
        }, process.env)
    });
}
function run(cmd, args, options = {}) {
    debug(`execFileSync: \`${cmd} ${args.join(' ')}\``);
    return (0, child_process_1.execFileSync)(cmd, args, options);
}
function sudoAppend(file, input) {
    run('sudo', ['tee', '-a', file], {
        input
    });
}
function waitForUser() {
    return new Promise((resolve) => {
        process.stdin.resume();
        process.stdin.on('data', resolve);
    });
}
function reportableError(message) {
    return new Error(`${message} | This is a bug in devcert, please report the issue at https://github.com/davewasmer/devcert/issues`);
}
function mktmp() {
    // discardDescriptor because windows complains the file is in use if we create a tmp file
    // and then shell out to a process that tries to use it
    return tmp_1.default.fileSync({ discardDescriptor: true }).name;
}
function sudo(cmd) {
    return new Promise((resolve, reject) => {
        sudo_prompt_1.default.exec(cmd, { name: 'devcert' }, (err, stdout, stderr) => {
            let error = err || (typeof stderr === 'string' && stderr.trim().length > 0 && new Error(stderr));
            error ? reject(error) : resolve(stdout);
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBVUEsMEJBT0M7QUFFRCxrQkFHQztBQUVELGdDQUlDO0FBRUQsa0NBS0M7QUFFRCwwQ0FFQztBQUVELHNCQUlDO0FBRUQsb0JBT0M7O0FBdERELGlEQUFrRTtBQUNsRSxzREFBc0I7QUFDdEIsMERBQWdDO0FBQ2hDLHdEQUF3QjtBQUN4QixzRUFBcUM7QUFFckMsMkNBQXlDO0FBRXpDLE1BQU0sS0FBSyxHQUFHLElBQUEsZUFBVyxFQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRTFDLFNBQWdCLE9BQU8sQ0FBQyxJQUFjO0lBQ3BDLE9BQU8sR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUU7UUFDMUIsS0FBSyxFQUFFLE1BQU07UUFDYixHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNqQixRQUFRLEVBQUUsY0FBSSxDQUFDLElBQUksQ0FBQyxJQUFBLHNCQUFVLEVBQUMsTUFBTSxDQUFDLENBQUM7U0FDeEMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDO0tBQ2hCLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFnQixHQUFHLENBQUMsR0FBVyxFQUFFLElBQWMsRUFBRSxVQUErQixFQUFFO0lBQ2hGLEtBQUssQ0FBQyxtQkFBb0IsR0FBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RELE9BQU8sSUFBQSw0QkFBWSxFQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDMUMsQ0FBQztBQUVELFNBQWdCLFVBQVUsQ0FBQyxJQUFZLEVBQUUsS0FBbUM7SUFDMUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7UUFDL0IsS0FBSztLQUNOLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFnQixXQUFXO0lBQ3pCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFnQixlQUFlLENBQUMsT0FBZTtJQUM3QyxPQUFPLElBQUksS0FBSyxDQUFDLEdBQUcsT0FBTyxzR0FBc0csQ0FBQyxDQUFDO0FBQ3JJLENBQUM7QUFFRCxTQUFnQixLQUFLO0lBQ25CLHlGQUF5RjtJQUN6Rix1REFBdUQ7SUFDdkQsT0FBTyxhQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDeEQsQ0FBQztBQUVELFNBQWdCLElBQUksQ0FBQyxHQUFXO0lBQzlCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckMscUJBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsR0FBaUIsRUFBRSxNQUFxQixFQUFFLE1BQXFCLEVBQUUsRUFBRTtZQUM1RyxJQUFJLEtBQUssR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBRTtZQUNsRyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhlY0ZpbGVTeW5jLCBFeGVjRmlsZVN5bmNPcHRpb25zIH0gZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XG5pbXBvcnQgdG1wIGZyb20gJ3RtcCc7XG5pbXBvcnQgY3JlYXRlRGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgc3Vkb1Byb21wdCBmcm9tICdzdWRvLXByb21wdCc7XG5cbmltcG9ydCB7IGNvbmZpZ1BhdGggfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmNvbnN0IGRlYnVnID0gY3JlYXRlRGVidWcoJ2RldmNlcnQ6dXRpbCcpO1xuXG5leHBvcnQgZnVuY3Rpb24gb3BlbnNzbChhcmdzOiBzdHJpbmdbXSkge1xuICByZXR1cm4gcnVuKCdvcGVuc3NsJywgYXJncywge1xuICAgIHN0ZGlvOiAncGlwZScsXG4gICAgZW52OiBPYmplY3QuYXNzaWduKHtcbiAgICAgIFJBTkRGSUxFOiBwYXRoLmpvaW4oY29uZmlnUGF0aCgnLnJuZCcpKVxuICAgIH0sIHByb2Nlc3MuZW52KVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bihjbWQ6IHN0cmluZywgYXJnczogc3RyaW5nW10sIG9wdGlvbnM6IEV4ZWNGaWxlU3luY09wdGlvbnMgPSB7fSkge1xuICBkZWJ1ZyhgZXhlY0ZpbGVTeW5jOiBcXGAkeyBjbWQgfSAke2FyZ3Muam9pbignICcpfVxcYGApO1xuICByZXR1cm4gZXhlY0ZpbGVTeW5jKGNtZCwgYXJncywgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWRvQXBwZW5kKGZpbGU6IHN0cmluZywgaW5wdXQ6IEV4ZWNGaWxlU3luY09wdGlvbnNbXCJpbnB1dFwiXSkge1xuICBydW4oJ3N1ZG8nLCBbJ3RlZScsICctYScsIGZpbGVdLCB7XG4gICAgaW5wdXRcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3YWl0Rm9yVXNlcigpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgcHJvY2Vzcy5zdGRpbi5yZXN1bWUoKTtcbiAgICBwcm9jZXNzLnN0ZGluLm9uKCdkYXRhJywgcmVzb2x2ZSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwb3J0YWJsZUVycm9yKG1lc3NhZ2U6IHN0cmluZykge1xuICByZXR1cm4gbmV3IEVycm9yKGAke21lc3NhZ2V9IHwgVGhpcyBpcyBhIGJ1ZyBpbiBkZXZjZXJ0LCBwbGVhc2UgcmVwb3J0IHRoZSBpc3N1ZSBhdCBodHRwczovL2dpdGh1Yi5jb20vZGF2ZXdhc21lci9kZXZjZXJ0L2lzc3Vlc2ApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWt0bXAoKSB7XG4gIC8vIGRpc2NhcmREZXNjcmlwdG9yIGJlY2F1c2Ugd2luZG93cyBjb21wbGFpbnMgdGhlIGZpbGUgaXMgaW4gdXNlIGlmIHdlIGNyZWF0ZSBhIHRtcCBmaWxlXG4gIC8vIGFuZCB0aGVuIHNoZWxsIG91dCB0byBhIHByb2Nlc3MgdGhhdCB0cmllcyB0byB1c2UgaXRcbiAgcmV0dXJuIHRtcC5maWxlU3luYyh7IGRpc2NhcmREZXNjcmlwdG9yOiB0cnVlIH0pLm5hbWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWRvKGNtZDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgc3Vkb1Byb21wdC5leGVjKGNtZCwgeyBuYW1lOiAnZGV2Y2VydCcgfSwgKGVycjogRXJyb3IgfCBudWxsLCBzdGRvdXQ6IHN0cmluZyB8IG51bGwsIHN0ZGVycjogc3RyaW5nIHwgbnVsbCkgPT4ge1xuICAgICAgbGV0IGVycm9yID0gZXJyIHx8ICh0eXBlb2Ygc3RkZXJyID09PSAnc3RyaW5nJyAmJiBzdGRlcnIudHJpbSgpLmxlbmd0aCA+IDAgJiYgbmV3IEVycm9yKHN0ZGVycikpIDtcbiAgICAgIGVycm9yID8gcmVqZWN0KGVycm9yKSA6IHJlc29sdmUoc3Rkb3V0KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=