/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractStaticPropertyRenderer } from '../base/abstract-static-property';
import { StaticPropertyAlternatives } from '../../../core-model/gen/streampipes-model';

@Component({
    selector: 'app-static-alternatives',
    templateUrl: './static-alternatives.component.html',
    styleUrls: ['./static-alternatives.component.css']
})
export class StaticAlternativesComponent
    extends AbstractStaticPropertyRenderer<StaticPropertyAlternatives> implements OnInit {


    @Output() inputEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

    private errorMessage = 'Please select a option';

    constructor(private changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    ngOnInit(): void {
    }

    radioSelectionChange(event) {
        this.staticProperty.alternatives.forEach(alternative => {
            alternative.selected = alternative.elementId === event.value.elementId;
        });
        this.changeDetectorRef.detectChanges();
    }

}
