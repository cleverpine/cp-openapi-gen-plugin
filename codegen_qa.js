#!/usr/bin/env node


import {configure} from './main.js';
import {loadDefaultEnv, loadMultistageDotEnv} from './utils.js';


configure('qa', [loadDefaultEnv(), loadMultistageDotEnv()]);

