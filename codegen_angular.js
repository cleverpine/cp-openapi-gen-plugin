#!/usr/bin/env node

import {configure} from './main.js';
import {loadDefaultEnv, loadConfigJson} from './utils.js';

configure('angular', [loadDefaultEnv(), loadConfigJson()]);