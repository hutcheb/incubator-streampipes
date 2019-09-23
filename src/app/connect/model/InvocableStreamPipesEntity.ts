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

import { RdfId } from '../../platform-services/tsonld/RdfId';
import { RdfProperty } from '../../platform-services/tsonld/RdfsProperty';
import { RdfsClass } from '../../platform-services/tsonld/RdfsClass';
import { NamedStreamPipesEntity } from "./NamedStreamPipesEntity";
import { URI } from "./URI";
import { StaticProperty } from "./StaticProperty";

@RdfsClass('sp:InvocableStreamPipesEntity')
export class InvocableStreamPipesEntity extends NamedStreamPipesEntity {

    //@RdfProperty('sp:receivesStream')
    //public inputStreams: Array<SpDataStream>;

    @RdfProperty('sp:hasStaticProperty')
    public staticProperties: Array<StaticProperty>;

    @RdfProperty('sp:belongsTo')
    public belongsTo: string;

    @RdfProperty('sp:correspondingPipeline')
    public correspondingPipeline: string;

    constructor(id: string) {
        super(id);
    }

}
