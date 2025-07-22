/*****************************************************************************
 * Open MCT, Copyright (c) 2014-2024, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/

import mount from 'utils/mount';

import ViewWrapExample from './ViewWrapExample.vue';

export default class ViewWrapExampleView {
  constructor(openmct, domainObject, objectPath) {
    this.openmct = openmct;
    this.domainObject = domainObject;
    this.objectPath = objectPath;
    this.component = null;
    this._destroy = null;
  }

  show(element, isEditing, viewOptions) {
    const { vNode, destroy } = mount(
      {
        el: element,
        components: {
          ViewWrapExample
        },
        provide: {
          openmct: this.openmct,
          isEditing,
          viewOptions
        },
        data: () => {
          return {
            domainObject: this.domainObject,
            objectPath: this.objectPath
          };
        },
        template:
          '<view-wrap-example :domain-object="domainObject" :object-path="objectPath"></view-wrap-example>'
      },
      {
        app: this.openmct.app,
        element
      }
    );

    this.component = vNode.componentInstance;
    this._destroy = destroy;
  }

  destroy() {
    if (this._destroy) {
      this._destroy();
    }
    this.component = null;
  }
}
