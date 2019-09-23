/*
 * Copyright 2019 FZI Forschungszentrum Informatik
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import {RdfId} from '../../../platform-services/tsonld/RdfId';
import {RdfProperty} from '../../../platform-services/tsonld/RdfsProperty';
import {RdfsClass} from '../../../platform-services/tsonld/RdfsClass';
import { EventProperty } from '../../schema-editor/model/EventProperty';
import { PropertyRenameRule } from './PropertyRenameRule';
import { OutputStrategy } from './OutputStrategy';

@RdfsClass('sp:AppendOutputStrategy')
export class AppendOutputStrategy extends OutputStrategy {

    @RdfProperty('sp:appendsProperty') //StreamPipes.APPENDS_PROPERTY in Java Klasse
    public eventProperties: EventProperty [];

    constructor(id: string) {
        super(id);
      }

}
