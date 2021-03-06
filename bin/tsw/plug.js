/* !
 * Tencent is pleased to support the open source community by making Tencent Server Web available.
 * Copyright (C) 2018 THL A29 Limited, a Tencent company. All rights reserved.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
 * http://opensource.org/licenses/MIT
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';


// 内置模块
function plug(id) {
    return require(id);
}

if (!global.plug) {
    global.plug = plug;

    const path = require('path');
    plug.__dirname = __dirname;
    plug.parent = path.join(__dirname, '..');
    plug.paths = [
        path.join(__dirname, '../deps'),
        path.join(__dirname, '../tencent'),
        path.join(__dirname, '../tsw')
    ];
    module.paths = plug.paths.concat(module.paths);

    // 支持seajs模块
    require('loader/seajs');
    require('loader/extentions.js');

    // 加固stringify
    JSON.stringify = (function(stringify) {
        return function(...args) {
            let str = stringify.apply(this, args);

            if (str && str.indexOf('<') > -1) {
                str = str.replace(/</g, '\\u003C');
            }
            return str;
        };
    })(JSON.stringify);
}

module.exports = global.plug;
