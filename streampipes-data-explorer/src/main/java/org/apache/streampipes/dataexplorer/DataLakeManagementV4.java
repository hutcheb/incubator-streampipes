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

package org.apache.streampipes.dataexplorer;

import org.apache.streampipes.dataexplorer.query.DeleteDataQuery;
import org.apache.streampipes.dataexplorer.utils.DataExplorerUtils;
import org.apache.streampipes.model.datalake.DataLakeMeasure;
import org.influxdb.dto.QueryResult;

import java.util.List;

public class DataLakeManagementV4 {

    public List<DataLakeMeasure> getAllMeasurements() {
        List<DataLakeMeasure> allMeasurements = DataExplorerUtils.getInfos();
        return allMeasurements;
    }

    public boolean removeAllMeasurements() {
        List<DataLakeMeasure> allMeasurements = getAllMeasurements();

        for (DataLakeMeasure measure : allMeasurements) {
            QueryResult queryResult = new DeleteDataQuery(measure).executeQuery();
            if (queryResult.hasError() || queryResult.getResults().get(0).getError() != null) {
                return false;
            }
        }
        return true;
    }
}
}