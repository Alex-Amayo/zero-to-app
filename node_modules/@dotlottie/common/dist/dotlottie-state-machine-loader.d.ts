import { LottieStateMachine } from '@dotlottie/dotlottie-js';
import { g as DotLottieCommonPlayer, h as DotLottieStateMachineManager } from './dotlottie-player-c67bc7de.js';
import '@lottiefiles/lottie-types';
import 'lottie-web';
import './dotlottie-audio.js';
import 'howler';
import './store.js';
import '@preact/signals-core';

/**
 * Copyright 2023 Design Barn Inc.
 */

/**
 * Load all the state machines in to XState.
 *
 * @param stateMachines - The state machines to load.
 * @param player - The dotLottie player object.
 * @returns A promise that resolves DotLottie state machine manager.
 */
declare function loadStateMachines(stateMachines: LottieStateMachine[], player: DotLottieCommonPlayer): Promise<DotLottieStateMachineManager>;

export { loadStateMachines };
