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

import * as angular from 'angular';

export class PipelineElementRecommendationService {

    RestApi: any;

    constructor(RestApi) {
        this.RestApi = RestApi;
    }

    getRecommendations(allElements, currentPipeline) {
        return new Promise((resolve, reject) => {
            this.RestApi.recommendPipelineElement(currentPipeline)
                .then(msg => {
                    let data = msg.data;
                    if (data.success) {
                        var result = {};
                        result["success"] = true;
                        result['recommendations'] = this.populateRecommendedList(allElements, data.recommendedElements);
                        result['possibleElements'] = this.collectPossibleElements(allElements, data.possibleElements);
                        resolve(result);
                    } else {
                        // TODO improve
                        var noresult = {success: false};
                        resolve(noresult);
                    }
                });
        });
    }

    collectPossibleElements(allElements, possibleElements) {
        var possibleElementConfigs = [];
        angular.forEach(possibleElements, pe => {
            possibleElementConfigs.push(this.getPipelineElementContents(allElements, pe.elementId));
        })
        return possibleElementConfigs;
    }

    populateRecommendedList(allElements, recs) {
        var elementRecommendations = [];
        recs.sort(function (a, b) {
            return (a.count > b.count) ? -1 : ((b.count > a.count) ? 1 : 0);
        });
        var maxRecs = recs.length > 7 ? 7 : recs.length;
        var el;
        for (var i = 0; i < maxRecs; i++) {
            el = recs[i];
            var element = this.getPipelineElementContents(allElements, el.elementId);
            element.weight = el.weight;
            elementRecommendations.push(element);
        }
        return elementRecommendations;

    }

    getPipelineElementContents(allElements, belongsTo) {
        var pipelineElement = undefined;
        angular.forEach(allElements, category => {
            angular.forEach(category, sepa => {
                if (sepa.type != 'stream') {
                    if (sepa.belongsTo == belongsTo) {
                        pipelineElement = sepa;
                    }
                } else {
                    if (sepa.elementId == belongsTo) {
                        pipelineElement = sepa;
                    }
                }
            });
        });
        return pipelineElement;
    }

}

PipelineElementRecommendationService.$inject=['RestApi']